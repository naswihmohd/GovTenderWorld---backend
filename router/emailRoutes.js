// server/routes/emailRoutes.js
const express = require('express');
const emailController = require('../controllers/emailController')
const router = express.Router();

router.use(express.json())

router.post('/send-email', emailController.authorityConfirm);

module.exports = router;
