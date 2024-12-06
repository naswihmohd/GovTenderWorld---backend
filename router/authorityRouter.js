const express = require('express')
const authorityControll = require ('../controllers/authorityController')
const verifyAuthorityToken = require('../middleware/verifyAuthorityToken')


const router = express.Router()
router.use(express.json())


router.post('/addTender',verifyAuthorityToken,authorityControll.addTender)
router.get('/myTenders',verifyAuthorityToken,authorityControll.getMyTenders)
router.post('/login',authorityControll.login)
router.get('/my-tenders/:tenderId',authorityControll.getOneTender)
router.get('/approvedTenders',verifyAuthorityToken,authorityControll.getApprovedTenders)
router.put('/publish/:tenderId',authorityControll.publishTender)
router.get('/bidTenders',verifyAuthorityToken ,authorityControll.getTenders)
router.get('/bidders/:tenderId',authorityControll.getBidders)
router.get('/bidder/:id',authorityControll.getBidder)
router.put('/bid-rejection/:bidId',authorityControll.bidRejection)
router.put('/bid-approval/:bidId/:tenderId',verifyAuthorityToken,authorityControll.bidApproval)
router.get('/contractors',verifyAuthorityToken,authorityControll.getContractors)
router.get('/contract-details/:contractId',authorityControll.getContractDetail)
router.put('/terminate/:contractId',authorityControll.terminateContract)
router.put('/activate/:contractId',authorityControll.activateContract)
router.post('/final-report/:contractId',authorityControll.createFinalReport)
router.put('/updateStatus/:proId',authorityControll.updateStatus)


module.exports = router