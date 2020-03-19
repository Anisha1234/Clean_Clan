// require express
var express = require('express')
var path = require('path')
var User = require('../model/user')
var Post = require('../model/post')
// create our router object
var router = express.Router()

// export our router
module.exports = router

var auth = function (req, res, next) {
  if (req.session && req.session.email) { return next() } else { return res.redirect('/login') }
}

router.get('/', auth, function (req, res, next) {
  var ids = new Array(5)
  Post.find({}, function (err, posts) {
    var render__data = {
      posts: posts,
      current_userid: req.session.userid
    }
    res.render('./pages/timeline', render__data)
  })
})

// only for react dev test
router.get('/posts', function (req, res) {
  if (req.session && req.session.email) {
    const queryFilter = {}
    const userID = req.query.user_id
    if (userID) {
      queryFilter.author = userID
    }
    Post.find(queryFilter, function (err, posts) {
      if (err) {
        return res.status(500).send('Internal server error')
      }
      const postData = new Array(posts.length)
      for (let i = 0; i < posts.length; ++i) {
        postData[i] = posts[i].toObject()
        postData[i].id = postData[i]._id.toString()
      }
      return res.status(200).send(postData)
    })
  } else {
    return res.status(401).send('Request not allowed')
  }
})
