const userModel = require('../models/userModel')
const tenderModel = require('../models/tenderModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


module.exports.register = async (req, res) => {
    companyDetails = {
        ownerName: `${req.body.fName} ${req.body.lName}`,
        companyName: req.body.companyName,
        contactNumber: req.body.contactNumber,
        email: req.body.email,
        address: `${req.body.lineAddress}, city: ${req.body.city}, state: ${req.body.state}, zip: ${req.body.zipCode}`,
        companyRegNumber: req.body.companyRegNumber,
        password: req.body.password
    }

    const isExist = await userModel.findOne({ email: companyDetails.email })
    const isExistCompany = await userModel.findOne({ companyRegNumber: companyDetails.companyRegNumber })

    if (!isExist) {
        if (!isExistCompany) {
            await userModel.create(companyDetails).then(() => {
                res.status(200).json({ message: "registration completed" })
            })
        } else {
            res.status(401).json({ message: "This company already registerd" })
        }
    } else {
        res.status(401).json({ message: "This email already registerd", type: 'email' })
    }
}

module.exports.login = async (req, res) => {
    const isExist = await userModel.findOne({ email: req.body.email })
    if (isExist) {
        if (isExist.accountStatus === "Active") {
            const isMatch = await bcrypt.compare(req.body.password, isExist.password)
            if (isMatch) {
                const token = jwt.sign({ id: isExist._id, username: isExist.username, email: isExist.email, role: isExist.role }, process.env.SECRET_KEY, { expiresIn: "1hr" })
                res.cookie('accessToken', token, { httpOnly: true, maxAge: 60 * 60 * 1000 })
                jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
                    if (!err) {
                        res.status(200).json({ message: 'login successfull', token: token, userId: user.id })
                    }
                })

            } else {
                res.status(401).json({ message: 'incorrect Password' })
            }
        } else {
            res.status(401).json({ message: 'This email Has been Suspended', type: 'email' })
        }

    } else {
        res.status(401).json({ message: 'cannot find email', type: 'email' })
    }
}

module.exports.logout = (req, res) => {
    res.clearCookie('accessToken')
    res.status(200).json({ message: "success" })
}


module.exports.getTenders = async (req, res) => {
    const tenders = await tenderModel.find()
    res.status(200).json(tenders)
}

module.exports.getOneTender = async (req, res) => {
    const tenderId = req.params.tenderId
    const tender = await tenderModel.findById(tenderId)
    res.json(tender)
}

module.exports.saveTender = async (req, res) => {

    const user = await userModel.findById(req.user.id)
    if (user) {
        if (!user.savedTenders.includes(req.body.tenderId)) {
            user.savedTenders.push(req.body.tenderId)
            await user.save()
            res.status(200).json({ message: 'Tender saved to saved List' })
        } else {
            res.status(400).json({ message: "This tender already saved" })
        }

    }
}

module.exports.getSavedTenders = async (req, res) => {
    const userId = req.user.id
    const tenders = await userModel.findById(userId).populate('savedTenders')
    res.status(200).json(tenders)
}

module.exports.deleteSavedTender = async (req, res) => {
    const tenderId = req.params.tenderId
    const user = await userModel.findById(req.user.id)
    user.savedTenders = user.savedTenders.filter((tender) => !tender.equals(tenderId))
    user.save()
    res.status(200).json({ message: 'Tender Removed from saveList' })
}

module.exports.getProfile = async (req, res) => {
    const id = req.user.id
    const user = await userModel.findById(id)
    res.status(200).json(user)
}
