const Job = require('../models/job');

// Create Job
const createJob = async (req, res) => {
    try {
        const job = new Job(req.body);
        await job.save();

        if (!job) {
            return res.status(400).json({ message: 'Job not created' });
        }

        res.status(201).json({ message: 'Job created successfully', job });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error.message);
    }
};

// Get all Jobs
const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate('postedBy', 'username email', 'User').limit(3);
        if (!jobs) {
            return res.status(400).json({ message: 'No jobs found' });
        }

        res.status(200).json({ jobs });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error.message);
    }
};

// Get Job by ID
const getJobById = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await Job.findById(id).populate('postedBy', 'username email', 'User');
        if (!job) {
            return res.status(400).json({ message: 'Job not found' });
        }

        res.status(200).json({ job });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error.message);
    }
};

// Update Job
const updateJob = async (req, res) => {
    const { id } = req.params;
    try {
        const job = await Job.findByIdAndUpdate(id, req.body, { new: true });
        if (!job) {
            return res.status(400).json({ message: 'Job not found' });
        }

        res.status(200).json({ message: 'Job updated successfully', job });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error.message);
    }
};

// Delete Job
const deleteJob = async (req, res) => {
    const { id } = req.params;
    try {
        const job = await Job.findByIdAndDelete(id);
        if (!job) {
            return res.status(400).json({ message: 'Job not found' });
        }

        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error.message);
    }
};

module.exports = {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob
};