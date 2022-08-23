const Products = require('../models/product.model.js');
const mongoose = require('mongoose')

const DB_URL = "mongodb://mustafahashim:1234@ac-95nllrh-shard-00-00.66cxeyk.mongodb.net:27017,ac-95nllrh-shard-00-01.66cxeyk.mongodb.net:27017,ac-95nllrh-shard-00-02.66cxeyk.mongodb.net:27017/?ssl=true&replicaSet=atlas-qfsqyn-shard-0&authSource=admin&retryWrites=true&w=majority"

exports.postProductByThereId = async (req, res) => {
      await mongoose.connect(DB_URL)

      userId = req.session.userId
      let newProductIdField = req.body.productIdField
      console.log(newProductIdField)

      if (newProductIdField !== "") {
            product = await Products.findOne({ productId: newProductIdField })

            if (product) {

                  if (product.status == false) {

                        console.log('Code is already redeemed')
                        res.status(500).render('alert', {
                              pageTitle: 'Code is already redeemed',
                              cssFile: '/css/verifyEmail.css',
                              isUser: false,
                              isAdmin: req.session.isAdmin,
                              alert: "Code is already redeemed"
                        });

                  }

                  else if (product.productId !== newProductIdField) {
                        console.log('Code is invalid')
                        res.status(500).render('alert', {
                              pageTitle: 'Invalid code',
                              cssFile: '/css/verifyEmail.css',
                              isUser: false,
                              isAdmin: req.session.isAdmin,
                              alert: "Invalid code"
                        });
                        mongoose.disconnect()

                  }

                  else if (product.status == true) {

                        await Products.findByIdAndUpdate(product._id, {
                              recieverId: userId,
                              status: false
                        })


                        success = console.log('Code redeemed successfully')
                        res.status(500).render('alert', {
                              pageTitle: 'Code redeemed',
                              cssFile: '/css/verifyEmail.css',
                              isUser: false,
                              isAdmin: req.session.isAdmin,
                              alert: "Code redeemed success"
                        });
                  }

            } else {
                  res.status(500).render('alert', {
                        pageTitle: 'Invalid code',
                        cssFile: '/css/verifyEmail.css',
                        isUser: false,
                        isAdmin: req.session.isAdmin,
                        alert: "Invalid code"
                  });
                  mongoose.disconnect()
            }
      }
}

exports.getProductByThereId = (req, res, next) => {
      res.render('search-product', {
            isAdmin: req.session.isAdmin,
            cssFile: '/css/search-product.css',
            pageTitle: 'Search Product',
            isUser: true
      })
}