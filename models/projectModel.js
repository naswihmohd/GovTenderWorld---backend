const mongoose = require('mongoose')


const projectSchema = mongoose.Schema({
    contractId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "contractors",
        required: true,
    },
    contractorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    tenderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tenders",
        required: true,
    },
    authorityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "authorities",
        required: true,
    },
    completionDate: {
        type: String,
        required: true
    },
    totalBudgetUsed: {
        type: Number,
        required: true
    },
    approvalStatus: {
        type: String,
        enum: ['Pending', 'Rejected', 'Approved'],
        default: 'Pending'
    },
    paymentStatus: {
        type: String,
        enum: ['Unpaid', 'paid'],
        default: 'Unpaid'
    }
})

const projectModel = mongoose.model('projects', projectSchema)

module.exports = projectModel