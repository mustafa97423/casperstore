module.exports = (req, res, next) => {
      if (req.session.isAdmin) next()
      else {
            res.redirect('/')
            console.log('You are not admin')
      }
}