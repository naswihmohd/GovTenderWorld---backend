const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const userSchema = mongoose.Schema({
    ownerName: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Admin', 'Company'],
        default: 'Company',
    },
    contactNumber: {
        type: Number,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    companyRegNumber:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    accountStatus:{
        type: String,
        enum: ['Active', 'Suspended'],
        default: 'Active',
    },
    savedTenders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"tenders",
        default:[]

    }]
})


userSchema.pre('save',async function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel