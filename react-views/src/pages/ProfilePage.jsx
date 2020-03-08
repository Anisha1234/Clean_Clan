import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMyPostsAction } from '../actions/PostAction';
import UserProfileComponent from '../components/UserProfileComponent';
import NavBarComponent from '../components/NavBarComponent';
import PostFormComponent from '../components/PostFormComponent';
import PostComponent from '../components/PostComponent';


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
          <PostComponent
            key={post.id}
            postType={post.type_post}
            postID={post.id}
            author={post.author}
            date={post.date}
            heading={post.heading}
            location={post.location}
            description={post.description}
            likeCount={post.like_count}
            likes={post.likes}
          />
        ))}
        <p><strong>{getMyPostError}</strong></p>
      </div>
    </>
  );
};

export default ProfilePage;
