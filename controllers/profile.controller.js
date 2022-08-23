const productModel = require('../models/product.model.js')
const authModel = require('../models/auth.model.js')

exports.getProductsForProfile = (req, res) => {
      productModel.getItemByUser(req.session.userId).then((items, user) => {
            res.render('profile', {
                  items: items,
                  user: user,
                  isUser: true,
                  cssFile: "/css/profile.css",
                  pageTitle: "Profile",
                  isAdmin: req.session.isAdmin
            })
      }).catch(err => {
            console.log(err)
      })
}

exports.getUserData = (req, res) => {
      productModel.getUserData(req.session.userId).then(user => {
            res.render('profile', {
                  user: user
            })
      })
}