import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { createJob, getjobs, updateJobs, deleteJobController, filterController } from '../controller/jobController.js';
const router = express.Router();
router.post("/create-job", authMiddleware, createJob);
router.get("/get-jobs", authMiddleware, getjobs);
router.patch("/update-jobs/:id", authMiddleware, updateJobs);
router.delete("/delete-job/:id", authMiddleware, deleteJobController);
router.get('/filter-job', authMiddleware, filterController)
export default router;