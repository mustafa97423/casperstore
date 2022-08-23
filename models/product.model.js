const e = require('connect-flash');
const mongoose = require('mongoose');

const User = require('./auth.model')



const DB_URL = "mongodb://mustafahashim:1234@ac-95nllrh-shard-00-00.66cxeyk.mongodb.net:27017,ac-95nllrh-shard-00-01.66cxeyk.mongodb.net:27017,ac-95nllrh-shard-00-02.66cxeyk.mongodb.net:27017/?ssl=true&replicaSet=atlas-qfsqyn-shard-0&authSource=admin&retryWrites=true&w=majority";

const productSchema = mongoose.Schema({
      recieverId: String,
      productId: String,
      productEmail: String,
      productPassword: String,
      platformCode: String,
      warrantyPeriod: String,
      timeStamp: String,
      status: Boolean
});

const Products = (mongoose.model('products', productSchema));
var exports = module.exports = Products;

exports.getItemByUser = userId => {
      return new Promise(async (resolve, reject) => {
            await mongoose
                  .connect(DB_URL)
                  .then(() => {
                        Products.find({ recieverId: userId })
                              .then(items => {
                                    mongoose.disconnect()
                                    resolve(items)
                              
                                    }).catch(err => {

                                    reject(err)

                              })
                                    
                              })
      })
}

exports.getUserData = async userId => {
     await mongoose.connect(DB_URL)

     user = await User.findOne({ _id : userId })

     console.log(user)
}

exports.getPostedProductByProductId = async (productId) => {
     await mongoose.connect(DB_URL)

     postedProduct = await Products.findOne({ productId: product.productId }).then(foundedProduct => {
      let passProduct = foundedProduct
      console.log(foundedProduct.productId)
      
     })
      
}