const mongoose = require('mongoose');

const DB_URL = "mongodb://mustafahashim:1234@ac-95nllrh-shard-00-00.66cxeyk.mongodb.net:27017,ac-95nllrh-shard-00-01.66cxeyk.mongodb.net:27017,ac-95nllrh-shard-00-02.66cxeyk.mongodb.net:27017/?ssl=true&replicaSet=atlas-qfsqyn-shard-0&authSource=admin&retryWrites=true&w=majority";
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid')
const Token = require('./token.model.js')
const nodemailer = require("nodemailer");
const e = require('express');
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
      userName: String,
      password: String,
      email: { type: String, unique: true },
      socialUsername: String,
      image: String,
      isAdmin: {
            type: Boolean,
            default: false
      },
      verified: {
            type: Boolean,
            default: false
      }
});


const User = (mongoose.model('users', userSchema));
var exports = module.exports = User;


exports.loginUser = (email, password) => {
      return new Promise((resolve, reject) => {
            mongoose.connect(DB_URL).then(() => {
                  User.findOne({ email: email }).then(user => {
                        if (!user) {
                              mongoose.disconnect()
                              reject('There is no account with these email')
                        } else {
                              bcrypt.compare(password, user.password).then(same => {
                                    if (!same) {
                                          mongoose.disconnect()
                                          reject('Password is incorrect')
                                    } else if (user.verified == false) {
                                          mongoose.disconnect()
                                          reject('email account is not verified')
                                    } else {
                                          mongoose.disconnect();
                                          resolve({
                                                id: user._id,
                                                isAdmin: user.isAdmin,
                                                verified: user.verified,
                                          })
                                    }
                              })
                        }
                  }).catch(err => {
                        mongoose.disconnect()
                        reject(err)
                  })
            })
      })
}


