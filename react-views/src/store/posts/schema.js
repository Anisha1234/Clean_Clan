import { normalize, schema } from 'normalizr';

const postSchema = new schema.Entity('post', {}, { idAttribute: '_id' });
/**
 * @function: normalize array of posts
 * @param {any[]} posts
 * @return {{
 *  postIDs: string[],
 *  postEntries: {
 *    [key: string]: any
 *  }
 * }}
 */
const normalizePosts = (posts) => {
  const {
    result: postIDs,
    entities: {
      post: postEntries,
    },
  } = normalize(posts, [postSchema]);
  return { postIDs, postEntries };
};
/**
 * @function: normalize a posts
 * @param {any} post
 * @return {{
  *  postID: string,
  *  postEntries: {
  *    [key: string]: any
  *  }
  * }}
  */
const normalizePost = (post) => {
  const {
    result: postID,
    entities: {
      post: postEntries,
    },
  } = normalize(post, postSchema);
  return { postID, postEntries };
};

export {
  normalizePost, normalizePosts,
};
