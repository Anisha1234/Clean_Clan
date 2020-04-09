/**
 * @function getAuthors - from array of posts, get [userid: userdata] for authors
 * @param {{
  *  getUserProfile : (userID: string, fields?: string[]) => Promise<any>
  * }} UserService: user service
  * @param {{author: string}[]} posts - array of posts
  */
const getAuthors = async (UserService, posts) => {
  const authors = {};
  await Promise.all(
    posts.map(async ({ author }) => {
      if (!author || authors[author]) return;
      const {
        name,
        image: { current: image }
      } = await UserService.getUserProfile(author, ['name', 'image']);
      authors[author] = {
        id: author,
        name,
        image
      };
    })
  );
  return authors;
};
/**
 * @function addAuthorDataToPost : add author data to post
 * @param {any} authorEntries
 * @param {{
 *  author: string
 * }} post
 * @return {{
 *  author: {
 *   id: string,
 *   name: string
 *   image: string
 * }
 * }}
 */
const addAuthorDataToPost = (authorEntries, post) => {
  const nPost = post;
  nPost.author = post.author && authorEntries[post.author];
  return nPost;
};
/**
 * @function addLikeStatusToPost : delete 'likes' property and add 'like_status' property
 * @param {string} userID - current user id in the session
 * @param {{
  *  likes: string[],
  * }} post
  * @return {{
  *   like_status: boolean,
  * }}
  */
const addLikeStatusToPost = (userID, post) => {
  const nPost = post;
  const likeStatus = !!(nPost.likes && nPost.likes.indexOf(userID) !== -1);
  delete nPost.likes;
  nPost.like_status = likeStatus;
  return nPost;
};

module.exports = {
  getAuthors, addLikeStatusToPost, addAuthorDataToPost
};
