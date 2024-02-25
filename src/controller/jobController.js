import mongoose from 'mongoose';
import Job from '../model/jobModel.js'
const createJob = async (req, res, next) => {
    try {
        const { company, position } = req.body;
        if (!company || !position) {
            next("please enter all fields");
        }
        req.body.createdBy = req.user.id;
        const job = await Job.create(req.body);
        res.status(201).send({ job });
    } catch (error) {

    }
}

const getjobs = async (req, res, next) => {
    try {
        //   const jobs = await Job.find({ createdBy: req.user.id });
        const { status, workType, search, sort } = req.query;
        const queryObject = {
            createdBy: req.user.id
        }

        if (status && status != 'all') {
            queryObject.status = status;
        }
        if (workType && workType != 'all') {
            queryObject.workType = workType;
        }
        if (search) {
            queryObject.position = {
                $regex: search, $options: 'i'
            }
        }

        let queryresult = Job.find(queryObject);
        if (sort === 'latest') {
            queryresult = queryresult.sort('-ceartedAt')
        }
        const jobs = await queryresult;
        const totalJobs = jobs.length;
        res.status(200).send({ totalJobs, jobs });
    } catch (error) {
        next(error);
    }
}
const updateJobs = async (req, res, next) => {
    const id = req.params.id; // Use req.params.id to get the job ID
    const { company, position } = req.body;

    if (!company || !position) {
        return next("Please provide all fields");
    }

    try {
        const job = await Job.findOne({ _id: id });

        if (!job) {
            return next("No job found");
        }

        if (req.user.id !== job.createdBy.toString()) {
            return next("You are not authorized to update this job. Please authorize first.");
        }

        const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ updatedJob });
    } catch (error) {
        console.error(error);
        next(error);
    }
};
const deleteJobController = async (req, res, next) => {
    const id = req.params.id;
    try {
        const job = await Job.findOne({ _id: id });
        if (!job) {
            next("no job found");
        }
        if (!req.user.id === job.createdBy.toString()) {
            next("not authorized");
        }
        await job.deleteOne();
        res.status(200).send({
            message: "job deleted",
        })
    } catch (error) {
        console.log(error);
    }
}
const filterController = async (req, res, next) => {
    const stats = await Job.aggregate([
        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user.id)
            },

        },
        {
            $group: {
                _id: '$workType', count: { $sum: 1 }
            }
        },

    ]);
    const defaultStats = {
        pending: stats.pending || 0,
        reject: stats.reject || 0,
        interview: stats.interview || 0,

    }
    let monthlyApplication = await Job.aggregate([
        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user.id)
            }
        }, {
            $group: {
                _id: {
                    year: {
                        $year: '$createdAt',
                    },
                    month: {
                        $month: '$createdAt'
                    }

                },
                count: { $sum: 1 }
            }
        }
    ])
    res.status(200).send({ totalJobs: stats.length, defaultStats, monthlyApplication })
}
export { createJob, getjobs, updateJobs, deleteJobController, filterController };