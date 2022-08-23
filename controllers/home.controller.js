const express = require('express')
const router = express.Router()

exports.getHome = (req, res) => {
      res.render('index', {
            cssFile: '/css/index.css',
            pageTitle: 'Casper Store',
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin,
      })
}