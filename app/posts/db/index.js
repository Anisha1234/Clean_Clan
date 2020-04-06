const PostModel = require('./postModel');
/**
 * @function getPostByID : get a post by its unique id
 * @param {string} postID 
 */
const getPostByID = (postID) => new Promise((resolve, reject)=>{
  PostModel.findById(postID, (error, post)=>{
    if(error){
      reject(error);
      return;
    }
    if(!post){
      resolve(null);
      return;
    }
    resolve(post.toObject());
  });
});
/**
 * @function getPosts - get array of posts by a filter object
 * @param {object} obtions - filter object, could be null
 */
const getPosts = (options) => new Promise((resolve, reject)=>{
  PostModel.find(options, (error, posts)=>{
    if(error){
      reject(error);
      return;
    }
    if(!posts || !posts.length){
      resolve([]);
      return;
    }
    resolve(posts.toObject());
  });
});
/**
 * @function updatePostLike - update post like
 * @param {string} postID - post which is liked
 * @param {string} userID - user who interacts 
 * @param {boolean} likeStatus - true for like, false for unlike
 */
const updatePostLike = (postID, userID, likeStatus) => new Promise((resolve, reject)=>{
  const updateQuery = {
    [likeStatus ? '$push': '$pull']: {
      likes: userID
    },
    $inc:{
      like_count: likeStatus ? 1: -1
    }
  }
  PostModel.findByIdAndUpdate(postID, updateQuery, { new: true }, (error, post)=>{
    if(error || post){
      reject(error || new Error("Could not find that post"));
      return;
    }
    resolve(post.toObject());
  });
});
/**
 * @function updatePostData : update post data (other than likes)
 * @param {string} postID 
 * @param {object} newData 
 */
const updatePostData = (postID, newData) => new Promise((resolve, reject)=>{
  PostModel.findByIdAndUpdate(postID, {
    $set: newData
  }, { new: true }, (error, post) => {
    if(error || post){
      reject(error || new Error("Could not find that post"));
      return;
    }
    resolve(post.toObject());
  });
});

/**
 * @function saveNewPost : save new post
 * @param {object} data 
 */
const saveNewPost = (data) => new Promise((resolve, reject)=>{
  const newPost = new PostModel({
    ...data,
    like_count: 0,
    likes: [],
    comments: []
  });
  newPost.save((error, post)=>{
    if(error || !post){
      reject(error || new Error("Could not save post"));
      return;
    }
    resolve(post.toObject());
  });
});

module.exports = {
  getPostByID, getPosts, updatePostLike, updatePostData, saveNewPost
}