const express = require ('express')
const userControll = require('../controllers/userController')
const tenderControll = require ('../controllers/tenderController')
const verifyToken = require('../middleware/verifyToken')


const router = express.Router()
router.use(express.json())


router.post('/register',userControll.register)
router.post('/login',userControll.login)
router.get('/logout',userControll.logout)
router.get('/all-tenders',userControll.getTenders)
router.get('/tender/:tenderId',userControll.getOneTender)
router.post('/savedTender',verifyToken,userControll.saveTender)
router.get('/saved-tenders',verifyToken,userControll.getSavedTenders)
router.delete('/delete-saved-tender/:tenderId',verifyToken,userControll.deleteSavedTender)
router.post('/tender/bidder',verifyToken,tenderControll.applyBidder)
router.get('/bids',verifyToken,tenderControll.getBids)
router.get('/bid-detail/:id',verifyToken,tenderControll.getBidDetail)
router.get('/upcoming',tenderControll.getUpcoming)
router.get('/latest-tenders',tenderControll.getLatestTenders)
router.get('/my-profile',verifyToken,userControll.getProfile)
router.get('/my-contracts',verifyToken,tenderControll.getMyContracts)
router.get('/my-contract/:id',verifyToken,tenderControll.getOneContract)
router.post('/contract/progress',tenderControll.addProgressData)
router.get('/my-projects',verifyToken,tenderControll.getProjects)



module.exports=router