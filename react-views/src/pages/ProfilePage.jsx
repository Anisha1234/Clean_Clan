import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMyPostsAction } from '../actions/PostAction';
import UserProfileComponent from '../components/UserProfileComponent';
import NavBarComponent from '../components/NavBarComponent';
import PostFormComponent from '../components/PostFormComponent';


const ProfilePage = () => {
  const [postFormPopUp, setPostFormPopUp] = useState(false);
  const [getMyPostError, setGetMyPostError] = useState(undefined);
  const myPosts = useSelector((state) => state.posts.my_posts);
  const dispatch = useDispatch();
  useEffect(() => {
    let componentUmounted = false;
    dispatch(getMyPostsAction())
      .catch((error) => {
        if (!componentUmounted) {
          setGetMyPostError(error.toString());
        }
      });
    return () => {
      componentUmounted = true;
    };
  }, [dispatch]);

  return (
    <>
      <NavBarComponent />
      <UserProfileComponent />
      <button
        onClick={() => setPostFormPopUp(!postFormPopUp)}
        type="button"
      >
        {postFormPopUp ? 'Close' : 'Create a post'}
      </button>
      {postFormPopUp ? <PostFormComponent /> : null}
      <div>
        {myPosts.map((post) => (
          <div key={post.id}>
            <h4>{post.heading}</h4>
          </div>
        ))}
        <p><strong>{getMyPostError}</strong></p>
      </div>
    </>
  );
};

export default ProfilePage;
