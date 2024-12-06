const mongoose = require('mongoose')


const suspendSchema = mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    suspendReason: {
        type: String,
        required: true
    },
    suspendTime:{
        type:Date,
        default:Date.now()
    }
})

const suspendModel = mongoose.model('suspendedAccounts',suspendSchema)

module.exports = suspendModel