const mongoose = require('mongoose')


const contractorSchema =  mongoose.Schema({
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
    bidderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "bidders", 
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users", 
        required: true,
    },
    contractDate: {
        type: Date,
        default: Date.now, 
    },
    progressData:[{
        date:String,
        stage:String,
        description:String,
        completion:String
    }],
    status:{
        type: String,
        enum: ["On Process", "Finished"], 
        default: "On Process",
    },
    contractStatus: {
        type: String,
        enum: ["Active", "Completed", "Terminated"], 
        default: "Active",
    },
});

const contractorModel = mongoose.model('contractors',contractorSchema)

module.exports = contractorModel