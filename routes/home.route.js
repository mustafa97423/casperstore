const express = require('express')
const router = express.Router();

const homeController = require('../controllers/home.controller.js')
const authGuard = require('../routes/guards/auth.guard.js')

router.get('/', homeController.getHome);

exports.router = router;