const tenderModel = require('../models/tenderModel')
const userModel = require('../models/userModel')
const authorityModel = require('../models/authorityModel')
const suspendModel = require('../models/suspendModel')
const contractModel = require('../models/contractorModel')



module.exports.allUsers = async (req, res) => {
    const allUsers = await userModel.find()
    res.status(200).json(allUsers)
}

module.exports.getAllTenders = async (req, res) => {
    const allTender = await tenderModel.find()
    res.status(200).json(allTender)
}

module.exports.getOneTender = async (req, res) => {
    const tenderId = req.params.id
    const tender = await tenderModel.findById(tenderId)
    res.status(200).json(tender)
}

module.exports.addAuthority = async (req, res) => {
    const authorityDetails = {
        name: req.body.name,
        contactPerson: {
            fullName: `${req.body.firstName} ${req.body.lastName}`,
            position: req.body.position,
            DOB: req.body.DOB,
            phoneNumber: req.body.phoneNumber,
            gender: req.body.gender
        },
        contactDetails: {
            phone: req.body.phone,
            address: {
                street: req.body.street,
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
                pincode: req.body.pincode
            }
        },
        email: req.body.email,
        department: req.body.department,
        password: req.body.password
    }

    await authorityModel.create(authorityDetails).then(() => {
        res.status(200).json({ message: 'Authority created successfully' })
    })

}

module.exports.getAuthorities = async (req, res) => {
    const authorities = await authorityModel.find()
    res.status(200).json(authorities)
}

module.exports.getAuthority = async (req, res) => {
    const { id } = req.params
    const authority = await authorityModel.findById(id)
    res.status(200).json(authority)
}

module.exports.changeStatus = async (req, res) => {
    const { id } = req.params
    await tenderModel.findByIdAndUpdate(id, req.body).then(() => {
        res.status(200).json({ message: 'Status Changed' })
    })
}

module.exports.getUser = async (req, res) => {
    const { id } = req.params
    const user = await userModel.findById(id)
    res.status(200).json(user)
}

module.exports.SuspendUser = async (req, res) => {
    const userId = req.params.userId
    const suspendUser = {
        suspendReason: req.body.suspendReason,
        user: userId
    }
    await userModel.findByIdAndUpdate(userId, { accountStatus: 'Suspended' }).then(async () => {
        await suspendModel.create(suspendUser).then(() => {
            res.status(200).json({ message: 'User Suspended' })
        })
    })
}

module.exports.getAllSuspendAccounts = async (req, res) => {
    const accounts = await suspendModel.find().populate('user')
    res.status(200).json(accounts)
}

module.exports.getSusAccDetails = async (req, res) => {
    const { id } = req.params
    const user = await suspendModel.findById(id).populate('user')
    res.status(200).json(user)
}

module.exports.activeAccount = async (req, res) => {

    const { id } = req.params
    const { sId } = req.params

    await userModel.findByIdAndUpdate(id, { accountStatus: "Active" }).then(async () => {
        await suspendModel.findByIdAndDelete(sId).then(() => {
            res.status(200).json({ message: 'account activated' })
        })
    })
}

module.exports.getAllContracts = async (req, res) => {
    const contracters = await contractModel.find().populate('tenderId').populate('authorityId').populate('userId')
    res.status(200).json(contracters)
}


module.exports.getAboutContract = async (req, res) => {
    const { id } = req.params
    const contract = await contractModel.findById(id).populate('tenderId').populate('authorityId').populate('userId').populate('bidderId')
    res.status(200).json(contract)
}

