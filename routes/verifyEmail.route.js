const bodyParser = require('body-parser');
const express = require('express')
const router = express.Router();

const authController = require('../controllers/auth.controller.js')
const authGuards = require('./guards/auth.guard.js')

router.get('/verify-email', authGuards.notAuth, authController.verifyEmail)

exports.router = router;