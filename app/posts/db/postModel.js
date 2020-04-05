const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  comment: { type: String, required: true },
  author: { type: String, required: true }
}, {
  timestamps: true
});

const postSchema = new Schema({
  id: String,
  date: { type: Date, default: Date.now },
  heading: String,
  like_count: { type: Number, default: 0 },
  stake_holders: String,
  likes: [String],
  author_name: String,
  description: String,
  author: String,
  location: String,
  type_post: { type: String, default: 'Solution' },
  author_image: String,
  image_before: String,
  image_after: String,
  // this stores name of challenger of this solution
  challenge_user_name: String,
  // this stores post id of solutions to this challenge
  solutions: { type: String, default: '' },
  // this stores name of solver of this challenge
  solutions_user_name: String,
  comments: [commentSchema]
}, { collection: 'post' });

postSchema.pre('save', function(next){
  const post=this;
  post.id = post._id.toString();
  next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
