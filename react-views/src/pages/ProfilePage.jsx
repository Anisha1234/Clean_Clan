import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPostsAction } from '../actions/Post';
import UserProfileComponent from '../components/UserProfileComponent';
import NavBarComponent from '../components/NavBarComponent';
import PostFormComponent from '../components/PostFormComponent';
import PostComponent from '../components/PostComponent';


const ProfilePage = () => {
  const [postFormPopUp, setPostFormPopUp] = useState(false);
  const getMyPostsMessage = useSelector((state) => state.posts.my_posts.message);
  const myPosts = useSelector((state) => state.posts.my_posts.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostsAction(true));
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
        <p><strong>{getMyPostsMessage}</strong></p>
      </div>
    </>
  );
};

export default ProfilePage;
