const authorityModel = require('../models/authorityModel')
const tenderModel = require('../models/tenderModel')
const bidderModel = require('../models/bidderModel')
const contractModel = require('../models/contractorModel')
const projectModel = require('../models/projectModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.addTender = async (req, res) => {
    req.body.publishingDate = new Date()
    req.body.authorityId = req.user.id
    await tenderModel.create(req.body).then(async (response) => {
        const authority = await authorityModel.findById(req.user.id)
        authority.tenderHistory.push(response._id)
        authority.save()
        res.status(200).json({ message: "Tender Created", authorityDetails: authority })
    })
}

module.exports.getMyTenders = async (req, res) => {
    const myTenders = await authorityModel.findById(req.user.id).populate('tenderHistory')
    res.status(200).json(myTenders)
}

module.exports.login = async (req, res) => {
    const isExist = await authorityModel.findOne({ email: req.body.email })

    if (isExist) {
        const isMatch = await bcrypt.compare(req.body.password, isExist.password)
        if (isMatch) {
            const token = jwt.sign({ id: isExist._id, email: isExist.email }, process.env.SECRET_KEY, { expiresIn: '1hr' })
            res.cookie('authorityToken', token, { httpOnly: true, maxAge: 60 * 60 * 1000 })
            jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
                if (!err) {
                    req.user = user
                    res.status(200).json({ token, userId: user.id })
                }
            })
        } else {
            res.status(401).json({ message: "Incorrect Password" })
        }

    } else {
        res.status(401).json({ message: 'Cannot Find email', type: 'email' })
    }
}

module.exports.getOneTender = async (req, res) => {
    const { tenderId } = req.params
    const tender = await tenderModel.findById(tenderId)
    res.status(200).json(tender)
}

module.exports.getApprovedTenders = async (req, res) => {
    const tenders = await tenderModel.find({ authorityId: req.user.id, status: "Approved" })
    res.status(200).json(tenders)
}

module.exports.publishTender = async (req, res) => {
    const { tenderId } = req.params
    await tenderModel.findByIdAndUpdate(tenderId, req.body).then(() => {
        res.status(200).json({ message: "Tender bid stataus changed successfully" })
    })
}

module.exports.getTenders = async (req, res) => {
    const id = req.user.id
    const tenders = await tenderModel.find({ authorityId: id, bidStatus: "Closed" })
    res.status(200).json(tenders)
}

module.exports.getBidders = async (req, res) => {
    const { tenderId } = req.params
    const bidders = await bidderModel.find({ tender: tenderId }).populate('user')
    res.status(200).json(bidders)
}

module.exports.getBidder = async (req, res) => {
    const { id } = req.params
    const bidder = await bidderModel.findById(id).populate('tender').populate('user')
    res.status(200).json(bidder)
}

module.exports.bidRejection = async (req, res) => {
    const { bidId } = req.params
    await bidderModel.findByIdAndUpdate(bidId, { bidStatus: "Rejected" }).then(() => {
        res.status(200).json({ message: "Bid has been Rejected Successfully" })
    })
}

module.exports.bidApproval = async (req, res) => {
    const { bidId, tenderId } = req.params
    await bidderModel.updateMany({ tender: tenderId }, { $set: { bidStatus: "Rejected" } }).then(async () => {
        await bidderModel.findByIdAndUpdate(bidId, { bidStatus: "Approved" }).then(async (response) => {
            const contractor = {
                tenderId: response.tender._id,
                bidderId: response._id,
                userId: response.user._id,
                authorityId: req.user.id
            }
            await contractModel.create(contractor).then(() => {
                res.status(200).json({ message: "contractor created" })
            })
        })
    })
}


module.exports.getContractors = async (req, res) => {
    const contractors = await contractModel.find({ authorityId: req.user.id }).populate('tenderId').populate('userId')
    res.status(200).json(contractors)
}

module.exports.getContractDetail = async (req, res) => {
    const { contractId } = req.params
    let project = {}
    const contractor = await contractModel.findById(contractId).populate('tenderId').populate('userId')
    if (contractor.status === "Finished") {
        project = await projectModel.findOne({ contractId: contractor._id })
    }

    res.status(200).json({ contract: contractor, project: project })
}

module.exports.terminateContract = async (req, res) => {
    const { contractId } = req.params
    await contractModel.findByIdAndUpdate(contractId, { contractStatus: "Terminated" }).then(() => {
        res.status(200).json({ message: "contract Terminated" })
    })
}

module.exports.activateContract = async (req, res) => {
    const { contractId } = req.params
    await contractModel.findByIdAndUpdate(contractId, { contractStatus: "Active" }).then(() => {
        res.status(200).json({ message: "contract Activated" })
    })
}

module.exports.createFinalReport = async (req, res) => {
    const { contractId } = req.params

    await contractModel.findByIdAndUpdate(contractId, { status: "Finished" }).then(async (contract) => {
        const project = {
            contractId: contract._id,
            contractorId: contract.userId,
            tenderId: contract.tenderId,
            authorityId: contract.authorityId,
            completionDate: req.body.completionDate,
            totalBudgetUsed: req.body.totalBudgetUsed,
        }
        await projectModel.create(project).then(() => {
            res.status(200).json({ message: "project created", })
        })
    })
}

module.exports.updateStatus = async (req,res)=>{
    const {proId} = req.params
    
    await projectModel.findByIdAndUpdate(proId,req.body).then(()=>{
        res.status(200).json({message:"status updated"})
    })

    console.log(req.body)
}