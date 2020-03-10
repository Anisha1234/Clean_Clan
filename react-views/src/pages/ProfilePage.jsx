import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPostsAction } from '../actions/Post';
import UserProfile from '../components/UserProfile';
import NavBar from '../components/NavBar';
import PostForm from '../components/PostForm';
import Post from '../components/Post';


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
      <NavBar />
      <UserProfile />
      <button
        onClick={() => setPostFormPopUp(!postFormPopUp)}
        type="button"
      >
        {postFormPopUp ? 'Close' : 'Create a post'}
      </button>
      {postFormPopUp ? <PostForm /> : null}
      <div>
        {myPosts.map((post) => (
          <Post
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
