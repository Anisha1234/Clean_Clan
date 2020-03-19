var express = require('express')
var path = require('path')
var User = require('../model/user')
// create our router object
var bcrypt = require('bcrypt')
var router = express.Router()

// export our router
module.exports = router

router.get('/', function (req, res) {
  console.log('Got get request')
  res.sendFile(path.join(__dirname, '../login.html'))
})

router.post('/', function (req, res) {
  console.log('got login request')
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log(err)
      return res.status(500).send(err)
    }
    if (!user) {
      const message = 'Not registered'
      return res.status(200).send({ message, user_data: user })
    }
    bcrypt.compare(req.body.password, user.password, function (err, result) {
      console.log(result)
      if (err) {
        console.log(err)
        return res.status(500).send('Internal Server Error')
      }
      if (result) {
        req.session.email = user.email
        req.session.userid = user._id
        req.session.userimage = user.image
        req.session.name = user.name
        const userData = {
          email: user.email,
          userid: user._id.toString(),
          name: user.name,
          city: user.city,
          like_count: user.like_count,
          user_details: user.user_details
        }
        return res.status(200).send({
          message: 'Success',
          user_data: userData
        })
      }
      return res.status(400).send({ message: 'Wrong password' })
    })
  })
})
