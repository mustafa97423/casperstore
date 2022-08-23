const express = require('express')
const app = express()
const flash = require('connect-flash')
require('dotenv').config();


const authRoutes = require('./routes/auth.route.js')
const homeRoute = require('./routes/home.route.js')
const adminRoute = require('./routes/admin.route.js')
const profileRoute = require('./routes/profile.route.js')
const searchProductRoute = require('./routes/search-product.route.js')
const verifyEmailRoute = require('./routes/verifyEmail.route.js')
const resetPasswordRoute = require('./routes/resetPassword.route.js')
const enterNewPasswordRoute = require('./routes/enterNewPassword.route.js')
const findAndMangeUser = require('./routes/mangeUser.route.js')

app.use(express.static('public'))

app.use(express.json())
app.set('view engine', 'ejs')
app.use(flash())

const session = require('express-session')
const { getItemBuUser } = require('./models/product.model.js')
const SessionStore = require('connect-mongodb-session')(session);

const STORE = new SessionStore({
      uri: "mongodb://mustafahashim:1234@ac-95nllrh-shard-00-00.66cxeyk.mongodb.net:27017,ac-95nllrh-shard-00-01.66cxeyk.mongodb.net:27017,ac-95nllrh-shard-00-02.66cxeyk.mongodb.net:27017/?ssl=true&replicaSet=atlas-qfsqyn-shard-0&authSource=admin&retryWrites=true&w=majority",
      collection: "sessions"
});

app.use(session({
      secret: "whay si kkk wow my gsawww 2",
      saveUninitialized: false,
      store: STORE
}));


app.use(authRoutes.router);
app.use(homeRoute.router);
app.use(adminRoute.router);
app.use(profileRoute.router);
app.use(searchProductRoute.router);
app.use(verifyEmailRoute.router);
app.use(resetPasswordRoute.router);
app.use(enterNewPasswordRoute.router);
app.use(findAndMangeUser.router);




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
      console.log(`App is running at port ${PORT}`)
})