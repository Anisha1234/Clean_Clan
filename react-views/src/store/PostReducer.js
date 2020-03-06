import {
  POST_ACTION_PENDING,
  GET_MY_POSTS_DONE,
  GET_ALL_POSTS_DONE,
  POST_ACTION_DONE,
} from '../utilities/constants';

const initialState = {
  status: POST_ACTION_DONE,
  my_posts: [],
  all_posts: [],
};

const PostReducer = (state = initialState, action) => {
  // posts here must be an array
  const { type, posts } = action;
  switch (type) {
    case POST_ACTION_PENDING:
    case POST_ACTION_DONE:
      return { ...state, status: type };
    case GET_MY_POSTS_DONE:
      return { ...state, my_posts: posts };
    case GET_ALL_POSTS_DONE:
      return { ...state, all_posts: posts };
    default:
      return state;
  }
};

export default PostReducer;
