const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['submitted', 'under-review', 'accepted', 'rejected'],
        default: 'submitted'
    }
}, { timestamps: true });

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;