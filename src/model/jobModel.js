import Mongoose, { Types } from "mongoose";

const jobSchema = Mongoose.Schema({
    company: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
        maxlength: 100
    },
    status: {
        type: String,
        enum: ['pending', 'reject', 'interview'],
        default: 'pending',
    },
    workType: {
        type: String,
        enum: ['full-time', 'part-time', 'internship', 'contaract'],
        default: 'full-time',
    },
    workLocation: {
        type: String,
        required: true,
        default: "Mumbai"
    },
    createdBy: {
        type: Mongoose.Types.ObjectId,
        ref: "User",
    }
}, { timestamps: true });

const Job = Mongoose.model("Job", jobSchema);
export default Job;