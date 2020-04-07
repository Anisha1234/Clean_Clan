<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserProfile from '../../components/UserProfile';
import NavBar from '../../components/NavBar';
import Feed from '../../components/Feed';
import './style.css';


const ProfilePage = () => (
  <>
    <NavBar />
    <Row className="profile-page-content">
      <Col lg={3}>
        <UserProfile />
      </Col>
      <Col lg={6}>
        <Feed />
      </Col>
    </Row>
  </>
);
=======
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPostsAction } from '../../actions/Post';
=======
import React, { /* useState, */ } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import Container from 'react-bootstrap/Container';
=======
import React from 'react';
>>>>>>> cb1dc93... Design post form
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
>>>>>>> a81005f... bootstrap user profile component
import UserProfile from '../../components/UserProfile';
import NavBar from '../../components/NavBar';
import Feed from '../../components/Feed';
import './style.css';


const ProfilePage = () => (
  <>
    <NavBar />
    <Row className="profile-page-content">
      <Col lg={3}>
        <UserProfile />
<<<<<<< HEAD
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
      </div>
    </>
  );
};

>>>>>>> f770ec9... bootstrap navbar
=======
      </Col>
      <Col lg={6}>
        <Feed />
      </Col>
    </Row>
  </>
);
>>>>>>> a81005f... bootstrap user profile component
export default ProfilePage;
