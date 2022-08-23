const bodyParser = require('body-parser');
const express = require('express')
const router = express.Router();

const manageUserController = require('../controllers/manageUser.controller.js')
const adminController = require('../controllers/admin.controller.js')
const authGuard = require('./guards/auth.guard.js')
const adminGuard = require('./guards/admin.guard.js')

router.post('/admin/mange-user', authGuard.isAuth, adminGuard, bodyParser.urlencoded({ extended: false }), manageUserController.PostfindUserByEmail);
router.get('/admin/mange-user', authGuard.isAuth, adminGuard, bodyParser.urlencoded({ extended: false }), manageUserController.GetfindUserByEmail);

router.get('/admin/mangeUser/:email', authGuard.isAuth, adminGuard,  manageUserController.mangeUser)


exports.router = router;