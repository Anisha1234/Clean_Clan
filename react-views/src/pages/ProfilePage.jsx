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
    let isUmounted = false;
    dispatch(getMyPostsAction())
      .catch((error) => {
        if (!isUmounted) {
          setGetMyPostError(error.toString());
        }
      });
    return () => {
      isUmounted = true;
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
            <img src={`http://localhost:3000/${post.image_before}`} alt="before" />
            {
              post.image_after
                ? <img src={`http://localhost:3000/${post.image_after}`} alt="after" />
                : null
            }
          </div>
        ))}
        <p><strong>{getMyPostError}</strong></p>
      </div>
    </>
  );
};

export default ProfilePage;
