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
      reject(new Error("Could not find post"));
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
      reject(new Error("Could not find posts"));
      return;
    }
    resolve(posts.toObject());
  });
});

module.exports = {
  getPostByID, getPosts
}