const { default: mongoose, mongo } = require('mongoose');
const User = require('../models/auth.model.js')
const adminModel = require('../models/admin.model.js')
const DB_URL = "mongodb://mustafahashim:1234@ac-95nllrh-shard-00-00.66cxeyk.mongodb.net:27017,ac-95nllrh-shard-00-01.66cxeyk.mongodb.net:27017,ac-95nllrh-shard-00-02.66cxeyk.mongodb.net:27017/?ssl=true&replicaSet=atlas-qfsqyn-shard-0&authSource=admin&retryWrites=true&w=majority";


exports.PostfindUserByEmail = async (req, res, next) => {

      await mongoose.connect(DB_URL)

      email = req.body.email

      email = email

      if (email !== "") {
            user = await User.findOne({ email: email })

            if (user) {
                  res.redirect(`/admin/mangeUser/${user.email}`)

            } else {
                  await res.render('unableToFindUser', {
                        cssFile: '/css/unableToFindUser.css',
                        pageTitle: 'Unable to find user!',
                        postStatus: true,
                        isUser: true,
                        isAdmin: req.session.isAdmin
                  })
                  mongoose.disconnect()


            }
      } else {
            res.render('alert', {
                  cssFile: '/css/alert.css',
                  pageTitle: 'Invalid user!',
                  postStatus: true,
                  isUser: true,
                  isAdmin: req.session.isAdmin
            })
            mongoose.disconnect()
      }

}

exports.GetfindUserByEmail = async (req, res, next) => {
      res.render('mangeUser', {
            isAdmin: req.session.isAdmin,
            cssFile: '/css/mangeUser.css',
            pageTitle: 'Find users',
            isUser: true
      })
}

exports.mangeUser = async (req, res, next) => {
      await mongoose.connect(DB_URL)
      user = await User.findOne({ email: req.params.email })
      if (user) {
            res.render('user', {
                  isAdmin: req.session.isAdmin,
                  cssFile: '/css/user.css',
                  pageTitle: 'Find users',
                  isUser: true,
                  user: user,
                  isAdmin: req.session.isAdmin
            })
      } else {
            res.render('unableToFindUser', {
                  isAdmin: req.session.isAdmin,
                  cssFile: '/css/unableToFindUser.css',
                  pageTitle: 'Unable to find the user',
                  isUser: true,
                  user: user,
            })
      }


}