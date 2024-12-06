const mongoose = require('mongoose')


const bidderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    tender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tenders"
    },
    bidProposal: {
        proposedBudget: {
            type: String,
            required: true
        },
        projectPlan: {
            type: String,
            required: false
        },
        timeline: {
            type: String,
            required: true
        }
    },
    legalDocuments: {
        registrationCertificates: {
            type: String,
            required:false
        },
        taxComplianceCertificates: {
            type: String,
            required:false
        },
        licenses: {
            type: String,
            required:false
        }
    },
    experienceAndQualifications: {
        pastProjects: {
            type: String,
            required: false,
            default:'None'
        },
        experience:{
            type: String,
            required: false,
            default:'None'
        },
        teamQualifications: {
            type: String,
            required: false
        }
    },
    financialDocuments: {
        bankAccountNumber: {
            type: String,
            required: true
        },
        IFCE: {
            type: String,
            required: true
        }
    },
    bidStatus: {
        type: String,
        enum: ['On Process', 'Rejected', 'Approved'],
        default: 'On Process',
    },
    submittedDate:{
        type:Date,
        default:new Date()
    }
})

const bidderModel = mongoose.model('bidders', bidderSchema)
module.exports = bidderModel