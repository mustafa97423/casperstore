const express = require('express')
const router = express.Router();

const profileController = require('../controllers/profile.controller.js')
const authGuard = require('../routes/guards/auth.guard.js')

router.get('/profile', profileController.getProductsForProfile, profileController.getUserData);

exports.router = router;