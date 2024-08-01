const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    requirements: {
        type: String
    },
    company: {
        type: String,
        required: true
    },
    salary: {
        type: Number
    },
    location: {
        type: String
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    applicants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;