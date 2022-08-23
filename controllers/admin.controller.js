const productModel = require('../models/product.model.js');
const adminModel = require('../models/admin.model.js');
const { default: mongoose } = require('mongoose');
const User = require('../models/auth.model.js');
const DB_URL = "mongodb://mustafahashim:1234@ac-95nllrh-shard-00-00.66cxeyk.mongodb.net:27017,ac-95nllrh-shard-00-01.66cxeyk.mongodb.net:27017,ac-95nllrh-shard-00-02.66cxeyk.mongodb.net:27017/?ssl=true&replicaSet=atlas-qfsqyn-shard-0&authSource=admin&retryWrites=true&w=majority";


exports.getProducts = (req, res) => {
      productModel.getProducts(req.session.userId).then(items => {
            res.render('profile', {
                  items: items,
                  isUser: true,
                  cssFile: '/css/profile.css',
                  pageTitle: user.userName,
                  isAdmin: req.session.isAdmin
            })
      }).catch(err => {
            console.log(err);
      })
}


exports.getAdmin = (req, res) => {
      res.render('admin', {
            isUser: true,
            cssFile: '/css/admin.css',
            pageTitle: 'Admin Panel',
            postStatus: false,
            isAdmin: req.session.isAdmin
      })
}


exports.postProducts = (req, res) => {
      adminModel.sendProduct(req.body.recieverId, req.body.productId, req.body.productEmail, req.body.productPassword, req.body.platformCode, req.body.warrantyPeriod, req.body.timeStamp, req.body.sucess)
            .then(() => {
                  res.render('product', {
                        product: product,
                        cssFile: '/css/product.css',
                        pageTitle: 'Posted!',
                        postStatus: true,
                        isUser: true,
                        isAdmin: req.session.isAdmin
                  })
            }).catch(err => {
                  console.log(err)
            })
}


exports.userToAdmin = async (req, res, next) => {
      await mongoose.connect(DB_URL)
      
      email = req.params.email
      user = await User.findOne({ email: email })

            if(!user) {
                  await  res.render('unableToFindUser', {
                        cssFile: '/css/unableToFindUser.css',
                        pageTitle: 'Posted!',
                        postStatus: true,
                        isUser: true,
                        isAdmin: req.session.isAdmin
                  })
                  console.log('user not found')
            } else {
                  user.isAdmin = true
                  await user.save()
                  console.log('user has admin permissions now!')
                  res.redirect('back')
            }
      
}

exports.adminToUser = async (req, res) => {
      await mongoose.connect(DB_URL)
      
      email = req.params.email
      user = await User.findOne({ email: email })

            if(!user) {
                  await  res.render('unableToFindUser', {
                        cssFile: '/css/unableToFindUser.css',
                        pageTitle: 'Posted!',
                        postStatus: true,
                        isUser: true,
                        isAdmin: req.session.isAdmin
                  })
                  console.log('user not found')
            } else {
                  user.isAdmin = false
                  await user.save()
                  console.log('user is not admin now!')
                  res.redirect('back')
            }
}

exports.deleteUser = async (req, res) => {
      await mongoose.connect(DB_URL)
      
      email = req.params.email
      user = await User.findOne({ email: email })

            if(!user) {
                await  res.render('unableToFindUser', {
                        cssFile: '/css/unableToFindUser.css',
                        pageTitle: 'Posted!',
                        postStatus: true,
                        isUser: true,
                        isAdmin: req.session.isAdmin
                  })
                  console.log('user not found')
            } else {
                  
                  await user.delete()
                  console.log('User deleted')
                  res.redirect('/admin/mange-user')
            }
}