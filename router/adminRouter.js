const express = require ('express')
const adminControll= require('../controllers/adminController')

const router = express.Router()
router.use(express.json())


router.get('/all-users',adminControll.allUsers)
router.post('/suspend-user/:userId',adminControll.SuspendUser)
router.get('/all-tenders',adminControll.getAllTenders)
router.get('/tender/:id',adminControll.getOneTender)
router.get('/authority',adminControll.getAuthorities)
router.post('/add-authority',adminControll.addAuthority)
router.get('/authority/:id',adminControll.getAuthority)
router.put('/status/:id',adminControll.changeStatus)
router.get('/user-detail/:id',adminControll.getUser)
router.get('/suspend-acc',adminControll.getAllSuspendAccounts)
router.get('/suspend/:id',adminControll.getSusAccDetails)
router.put('/active-account/:id/:sId',adminControll.activeAccount)
router.get('/all-contracts',adminControll.getAllContracts)
router.get('/contract/:id',adminControll.getAboutContract)


module.exports= router