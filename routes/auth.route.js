const bodyParser = require('body-parser');
const express = require('express')
const check = require('express-validator').check
const router = express.Router();

const authGuard = require('./guards/auth.guard.js')

const authController = require('../controllers/auth.controller.js')

router.get('/register', authGuard.notAuth, authController.getRegister)


router.post('/register', authGuard.notAuth, bodyParser.urlencoded({ extended: false }),
check('userName').not().isEmpty().withMessage('Account name must not be empty'),
check('email').not().isEmpty().withMessage('Email must not be empty').isEmail().withMessage('Invalid email format'),
check('password').isLength({min: 6}).withMessage('Password lenght must be at least 6 characteristics')
, authController.postRegister)


router.all('/verify/:email/:token', bodyParser.urlencoded({ extended: false }), authController.confirmEmail)


router.get('/login', authController.getLogin)

router.post('/login', bodyParser.urlencoded({ extended: false }), authController.postLogin)

router.post('/logout', authGuard.isAuth,authController.postLogout)

exports.router = router;
