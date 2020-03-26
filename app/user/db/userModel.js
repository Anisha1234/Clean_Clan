const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// create a schema
const userSchema = new mongoose.Schema({
  userid: String,
  name: String,
  email: String,
  city: String,
  password: String,
  image: String,
  like_count: Number,
  user_details: String,
}, { collection: 'user' });

//hook function: user.password = hash, user.userid = user._id
const saltRounds = 10;
userSchema.pre('save', function(next){
  const user = this;
  user.userid = user._id.toString();
  bcrypt.hash(user.password, saltRounds, (err, hash)=>{
    if (err) return next(err)
    user.password = hash;
    next();
  });
});

const User = mongoose.model('User', userSchema);

module.exports = User;
