import {
  GET_POSTS_PENDING,
  GET_MY_POSTS_DONE,
  GET_ALL_POSTS_DONE,
} from '../utilities/constants';

const initialState = {
  status: null,
  my_posts: null,
  all_posts: null,
};

const PostReducer = (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case GET_POSTS_PENDING:
      return { ...state, status: GET_POSTS_PENDING };
    case GET_MY_POSTS_DONE:
      return { ...state, status: 'done', my_posts: data };
    case GET_ALL_POSTS_DONE:
      return { ...state, status: 'done', all_posts: data };
    default:
      return state;
  }
};

export default PostReducer;
