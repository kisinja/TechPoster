const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    industry: {
        type: String
    },
    location: {
        type: String
    },
    website: {
        type: String
    },
    jobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }]
}, { timestamps: true });

const Company = mongoose.model('Company', companySchema);

module.exports = Company;