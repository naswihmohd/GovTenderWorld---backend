const bidderModel = require('../models/bidderModel')
const tenderModel = require('../models/tenderModel')
const contractModel = require('../models/contractorModel')
const projectModel = require('../models/projectModel')

module.exports.applyBidder = async (req, res) => {

    const isApply = await bidderModel.findOne({ user: req.user.id, tender: req.body.tender })
    console.log(isApply)

    if (!isApply) {
        const bidDetails = {
            user: req.user.id,
            tender: req.body.tender,
            bidProposal: {
                proposedBudget: req.body.proposedBudget,
                timeline: `${req.body.timeLineStartDate} to ${req.body.timeLineEndDate}`
            },
            experienceAndQualifications: {
                pastProjects: req.body.pastProjects,
                experience: req.body.experience,
                teamQualifications: req.body.Qualification
            },
            financialDocuments: {
                bankAccountNumber: req.body.accountNumber,
                IFCE: req.body.IFCE
            }
        }

        await bidderModel.create(bidDetails).then(async (response) => {
            const tender = await tenderModel.findById(req.body.tender)
            tender.bidders.push(response._id)
            tender.save()
            res.status(200).json({ message: 'submitted' })
        })
    } else {
        res.status(400).json({ message: "You have already applied this tender" })
    }

}

module.exports.getBids = async (req, res) => {
    const bids = await bidderModel.find({ user: req.user.id }).populate('tender')
    res.status(200).json(bids)
}

module.exports.getBidDetail = async (req, res) => {
    const id = req.params.id
    const bid = await bidderModel.findById(id).populate('tender')
    res.status(200).json(bid)
}

module.exports.getUpcoming = async (req, res) => {
    const tenders = await tenderModel.find({ bidStatus: 'Pending', status: "Approved" }).limit(10)
    res.status(200).json(tenders)
}

module.exports.getLatestTenders = async (req, res) => {
    const tenders = await tenderModel.find({ bidStatus: "Open" }).limit(10)
    res.status(200).json(tenders)
}

module.exports.getMyContracts = async (req, res) => {
    const contracts = await contractModel.find({ userId: req.user.id ,status:"On Process" }).populate('tenderId').populate('bidderId')
    res.status(200).json(contracts)
}

module.exports.getOneContract = async (req, res) => {
    const { id } = req.params
    let project = {}
    const contract = await contractModel.findById(id).populate('tenderId').populate('bidderId')
    if (contract.status === "Finished") {
        project = await projectModel.findOne({ contractId: id })
    }
    res.status(200).json({contract:contract,project:project})
}

module.exports.addProgressData = async (req, res) => {
    const progress = {
        date: req.body.date,
        stage: req.body.stage,
        description: req.body.description,
        completion: req.body.completion
    }

    const contract = await contractModel.findById(req.body.contractId)

    contract.progressData.push(progress)
    contract.save()
    res.status(200).json({ message: 'data saved' })
}

module.exports.getProjects = async (req,res)=>{
    const projects = await projectModel.find({ contractorId: req.user.id }).populate('tenderId')
    res.status(200).json(projects)
}