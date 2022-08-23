const bodyParser = require('body-parser');
const express = require('express')
const router = express.Router();

const searchController = require('../controllers/searchProduct.controller.js')
const authGuard = require('./guards/auth.guard.js')

router.get('/search-product', authGuard.isAuth, bodyParser.urlencoded({ extended: false }), searchController.getProductByThereId);
router.post('/search-product', authGuard.isAuth, bodyParser.urlencoded({ extended: false }), searchController.postProductByThereId);

exports.router = router;