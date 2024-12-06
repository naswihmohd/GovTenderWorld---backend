const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const authoritySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contactPerson: {
        fullName: {
            type: String,
            required: true
        },
        position: {
            type: String,
            required: true
        },
        DOB:{
            type: String,
            required: true
        },
        phoneNumber:{
            type: String,
            required: true
        },
        gender:{
            type: String,
            required: true
        }
    },
    contactDetails: {
        phone: {
            type: String,
            required: true
        },
        address: {
            street: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            country:{
                type: String,
                required: true
            },
            pincode: {
                type: String,
                required: true
            },
        }
    },
    email: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tenderHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tenders',
        default: []
    }]
})

authoritySchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

const authorityModel = mongoose.model('authorities', authoritySchema)
module.exports = authorityModel