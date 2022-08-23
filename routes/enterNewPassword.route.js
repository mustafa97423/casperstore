const bodyParser = require('body-parser');
const express = require('express')
const router = express.Router();

const authController = require('../controllers/auth.controller.js')
const authGuard = require('../routes/guards/auth.guard.js')

router.post('/reset-password/:email/:token',authGuard.notAuth, bodyParser.urlencoded({ extended: false }), authController.PostResetPassword);
router.get('/reset-password/:email/:token', authController.GetResetPassword);

exports.router = router;