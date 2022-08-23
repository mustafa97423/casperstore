const mongoose = require('mongoose')
const User = require('./auth.model')
const Products = require('./product.model')



const DB_URL = "mongodb://mustafahashim:1234@ac-95nllrh-shard-00-00.66cxeyk.mongodb.net:27017,ac-95nllrh-shard-00-01.66cxeyk.mongodb.net:27017,ac-95nllrh-shard-00-02.66cxeyk.mongodb.net:27017/?ssl=true&replicaSet=atlas-qfsqyn-shard-0&authSource=admin&retryWrites=true&w=majority";


exports.sendProduct = async (recieverId, productId, productEmail, productPassword, platformCode, warrantyPeriod, timeStamp, status) => {
      await mongoose.connect(DB_URL)

           
                  recieverId = null
                  let date = new Date().toISOString().slice(0, 10);
                  let generator = Math.floor(Math.random() * 900000000000) + 100000000000;
                  

                        product = new Products({
                        recieverId: recieverId,
                        productId: generator,
                        productEmail: productEmail,
                        productPassword: productPassword,
                        platformCode: platformCode,
                        warrantyPeriod: warrantyPeriod,
                        timeStamp: date,
                        status: true
                  })

                  await product.save()
                  
            
                  mongoose.disconnect()
            
                  
            }
      

exports.findUserByEmail = async (email) => {
      
      await mongoose.connect(DB_URL)

      email = email?.split(" ").join("")

      if(email !== "") {
            user = await User.findOne({ email: email })

            if (user) {
            
                         console.log(user)
                         
            } else {
                  console.log('not found')
                  mongoose.disconnect()
      
      
            }
      } else {
            console.log('Invalid code')
      }


}