const bodyParser = require('body-parser');
const express = require('express')
const router = express.Router();

const adminContoller = require('../controllers/admin.controller.js')
const authGuard = require('../routes/guards/auth.guard.js')
const adminGuard = require('../routes/guards/admin.guard.js')

router.get('/admin/add-product', authGuard.isAuth, adminGuard, adminContoller.getAdmin);

router.all('/admin/add-product/product', authGuard.isAuth, adminGuard, bodyParser.urlencoded({ extended: false }), adminContoller.postProducts);

router.post('/admin/mangeUser/toAdmin/:email',authGuard.isAuth, adminGuard, bodyParser.urlencoded({ extended: false }), adminContoller.userToAdmin)
router.post('/admin/mangeUser/toUser/:email',authGuard.isAuth, adminGuard, bodyParser.urlencoded({ extended: false }), adminContoller.adminToUser)
router.post('/admin/mangeUser/delete/:email',authGuard.isAuth, adminGuard, bodyParser.urlencoded({ extended: false }), adminContoller.deleteUser)

exports.router = router;