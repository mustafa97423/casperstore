const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const e = require('connect-flash');
const { default: mongoose, mongo } = require('mongoose');
const authModel = require('../models/auth.model.js')
const validationResult = require('express-validator').validationResult
const User = require('../models/auth.model.js')
const Token = require('../models/token.model.js')


const DB_URL = "mongodb://mustafahashim:1234@ac-95nllrh-shard-00-00.66cxeyk.mongodb.net:27017,ac-95nllrh-shard-00-01.66cxeyk.mongodb.net:27017,ac-95nllrh-shard-00-02.66cxeyk.mongodb.net:27017/?ssl=true&replicaSet=atlas-qfsqyn-shard-0&authSource=admin&retryWrites=true&w=majority";




exports.postRegister = async (req, res, next) => {
      await mongoose.connect(DB_URL)

      User.findOne({ email: req.body.email }, function (err, user) {
            if (err) {
                  return res.status(500).send({ msg: err.message });
            }
            else if (user) {
                  return res.status(400).render('alert', {
                        pageTitle: 'Check your email',
                        cssFile: '/css/verifyEmail.css',
                        isUser: false,
                        isAdmin: req.session.isAdmin,
                        alert: "There is already an account with these email"
                  });
            }
            else {
                  req.body.password = bcrypt.hashSync(req.body.password, 10);
                  user = new User({
                        userName: req.body.userName,
                        password: req.body.password,
                        email: req.body.email,
                        socialUsername: req.body.socialUsername,
                        image: req.body.image,
                        isAdmin: false,
                        active: false,
                  });
                  user.save(function (err) {
                        if (err) {
                              return res.status(500).send({ msg: err.message });
                        }

                        var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
                        token.save(function (err) {
                              if (err) {
                                    return res.status(500).send({ msg: err.message });
                              }

                              var transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: 'kalindey.iq@gmail.com', pass: 'iplfvdjyrowbnyaf' } });
                              var mailOptions = { from: 'kalindey.iq@gmail.com', to: user.email, subject: 'Account Verification Link', text: 'Hello ' + user.userName + ',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/verify\/' + user.email + '\/' + token.token + '\n\nThank You!\n' };
                              transporter.sendMail(mailOptions, function (err) {
                                    if (err) {
                                          return res.status(500).render('alert', {
                                                pageTitle: 'Check your email',
                                                cssFile: '/css/verifyEmail.css',
                                                isUser: false,
                                                isAdmin: req.session.isAdmin,
                                                alert: "Technical issue from nodemailer"
                                          });
                                    }
                                    return res.render('verifyEmail', {
                                          pageTitle: 'Verify your email',
                                          cssFile: '/css/verifyEmail.css',
                                          isUser: false,
                                          isAdmin: req.session.isAdmin
                                    })
                              });
                        });
                  });
            }

      });

};


exports.GetSendPasswordEmail = (req, res, next) => {
      res.render('resetPasswordOrder', {
            pageTitle: 'Reset your password',
            cssFile: '/css/resetPasswordOrder.css',
            isUser: false,
            isAdmin: req.session.isAdmin,
      })
}


exports.PostSendPasswordEmail = async (req, res, next) => {
      await mongoose.connect(DB_URL)

      email = req.body.email

      User.findOne({ email: email }, async (err, user) => {
            if (!user) {
                  res.render('unableToFindUser', {
                        cssFile: '/css/unableToFindUser.css',
                        pageTitle: 'Unable to find user',
                        isUser: false,
                        isAdmin: req.session.isAdmin
                  })
            } else {

                  token = await new Token({
                        _userId: user._id,
                        token: crypto.randomBytes(16).toString('hex')
                  })

                  await token.save()

                  var transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: 'kalindey.iq@gmail.com', pass: 'iplfvdjyrowbnyaf' } });
                  var mailOptions = { from: 'kalindey.iq@gmail.com', to: user.email, subject: 'Reset your password', text: 'Hello ' + user.userName + ',\n\n' + 'Please reset your password by clicking the link: \nhttp:\/\/' + req.headers.host + '\/reset-password\/' + email + '\/' + token.token + '\n\nThank You!\n' };
                  transporter.sendMail(mailOptions, function (err) {
                        if (err) {
                              return res.status(500).render('alert', {
                                    pageTitle: 'Check your email',
                                    cssFile: '/css/verifyEmail.css',
                                    isUser: false,
                                    isAdmin: req.session.isAdmin,
                                    alert: "Technical issue from nodemailer, try again later."
                              });
                        }
                        return res.render('alert', {
                              pageTitle: 'Check your email',
                              cssFile: '/css/verifyEmail.css',
                              isUser: false,
                              isAdmin: req.session.isAdmin,
                              alert: "We sent you email to reset your password, check it out!"
                        })
                  });
            }
      })
}

exports.GetResetPassword = async (req, res) => {
      res.render('newPassword', {
            pageTitle: 'Enter new password',
            cssFile: '/css/newPassword.css',
            isUser: false,
            isAdmin: req.session.isAdmin
      })
}

exports.PostResetPassword = async (req, res) => {
      await mongoose.connect(DB_URL)

      newPassword = req.body.newPassword
      email = req.params.email
      token = req.params.token

      User.findOne({ email: email }, async (err, user) => {
            if (!user) {
                  res.render('unableToFindUser', {
                        cssFile: '/css/unableToFindUser.css',
                        pageTitle: 'Unable to find user',
                        isUser: false,
                        isAdmin: req.session.isAdmin
                  })
            } else {

                  Token.findOne({ userId: user._id, token: req.params.token }, async (err, token) => {
                        if (!token) {
                              res.render('alert', {
                                    pageTitle: 'Invalid token',
                                    cssFile: '/css/alert.css',
                                    isUser: false,
                                    isAdmin: req.session.isAdmin,
                                    alert: "Invalid token!"
                              })
                        } else {
                              saltRounds = 10
                              hashedPassword = await bcrypt.hash(newPassword, saltRounds)
                              user.password = hashedPassword
                              user.save()
                              await token.delete();
                              res.render('passwordResetDone', {
                                    pageTitle: 'Password reseted success',
                                    cssFile: '/css/passwordResetDone.css',
                                    isUser: false,
                                    isAdmin: req.session.isAdmin,
                              })
                        }
                  })
            }
      })
}


exports.confirmEmail = async (req, res, next) => {
      await mongoose.connect(DB_URL)

      Token.findOne({ token: req.params.token }, async function (err, token) {

            if (!token) {
                  return res.status(400).render('alert', {
                        cssFile: '/css/alert.css',
                        pageTitle: 'Unable to find user',
                        isUser: false,
                        isAdmin: req.session.isAdmin,
                        alert: 'token is expired'
                  });
            }
            else {
                  User.findOne({ _id: token._userId, email: req.params.email }, (err, user) => {

                        if (!user) {
                              return res.status(401).render('unableToFindUser', {
                                    cssFile: '/css/unableToFindUser.css',
                                    pageTitle: 'Unable to find user',
                                    isUser: false,
                                    isAdmin: req.session.isAdmin
                              });
                        }

                        else if (user.verified) {
                              return res.status(401).render('userAlreadyVerified', {
                                    cssFile: '/css/userAlreadyVerified.css',
                                    pageTitle: 'User is already verified',
                                    isUser: false,
                                    isAdmin: req.session.isAdmin
                              });
                        }

                        else {

                              user.verified = true;
                              token.delete()
                              user.save(function (err) {

                                    if (err) {
                                          return res.status(500).send({ msg: err.message });
                                    }

                                    else {
                                          return res.status(200).render('verifiedEmail', {
                                                cssFile: '/css/verifiedEmail.css',
                                                pageTitle: 'Verified!',
                                                isUser: true,
                                                isAdmin: req.session.isAdmin,
                                          })
                                    }
                              });
                        }
                  });
            }

      });
};


exports.getRegister = (req, res) => {
      res.render('register', {
            cssFile: '/css/register.css',
            pageTitle: 'Register | Casper Store',
            validationErrors: req.flash('validationErrors'),
            authError: req.flash('authError')[0],
            isUser: false,
            isAdmin: req.session.isAdmin
      });
}

exports.getLogin = (req, res, next) => {
      res.render('login', {
            pageTitle: 'Login back! | Casper Store',
            cssFile: '/css/login.css',
            authError: req.flash("authError")[0],
            isUser: false,
            isAdmin: req.session.isAdmin
      });
}

exports.postLogin = (req, res, next) => {
      if (validationResult(req).isEmpty()) {
            authModel.loginUser(req.body.email, req.body.password).then(result => {
                  let session = req.session;
                  session.userId = result.id,
                        req.session.isAdmin = result.isAdmin

                  res.redirect('/')
            }).catch(err => {
                  req.flash('authError', err)
                  console.log(err)
                  res.redirect('/login')
            })
      } else {
            req.flash('validationErrors', validationResult(req).array())
            res.redirect('/login')
      }
}


exports.verifyEmail = (req, res) => {
      res.render('verifyEmail', {
            pageTitle: 'Verify your email',
            cssFile: '/css/verifyEmail.css',
            isUser: false,
            isAdmin: req.session.isAdmin
      })
}


exports.postLogout = (req, res, next) => {
      req.session.destroy(() => {
            res.redirect('/');
      })
}
