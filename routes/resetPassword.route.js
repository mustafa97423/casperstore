const bodyParser = require('body-parser');
const express = require('express')
const router = express.Router();

const authController = require('../controllers/auth.controller.js')
const authGuard = require('./guards/auth.guard.js')

router.get('/reset-password', authGuard.notAuth, authController.GetSendPasswordEmail);
router.post('/reset-password', bodyParser.urlencoded({ extended: false }), authGuard.notAuth, authController.PostSendPasswordEmail);

exports.router = router;