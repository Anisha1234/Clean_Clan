<<<<<<< HEAD
<<<<<<< HEAD
import React, { useMemo } from 'react';
import Button from 'react-bootstrap/button';
import Image from 'react-bootstrap/Image';
import { useSelector } from 'react-redux';
import LogoutButton from '../../components/LogoutButton';
import { LOGGED_IN } from '../../constants';
import { createFileURL } from '../../util';
import './style.css';

const HomePage = () => {
  const authState = useSelector((state) => state.user.auth.status);
  const userName = useSelector((state) => state.user.data.name);
  const userPic = useSelector((state) => state.user.data.image.current);
<<<<<<< HEAD
  const userPicURL = useMemo(() => createFileURL(userPic), [userPic]);
  return (
    <div className="header-content cover-all have-background-img">
      <div className="header-content-inner center-vert-hor">
=======
import React from 'react';
=======
import React, { useMemo } from 'react';
>>>>>>> 2d5cfb4... finish post component (backend and frontend)
import Button from 'react-bootstrap/button';
import Image from 'react-bootstrap/Image';
import { useSelector } from 'react-redux';
import LogoutButton from '../../components/LogoutButton';
import { LOGGED_IN } from '../../constants';
import { createFileURL } from '../../util';
import './style.css';

const HomePage = () => {
  const authState = useSelector((state) => state.user.auth.status);
  const userName = useSelector((state) => state.user.data.name);
  const userPic = useSelector((state) => state.user.data.image.current);
  console.log(userPic);
=======
>>>>>>> 25138db... Lint react-views
  const userPicURL = useMemo(() => createFileURL(userPic), [userPic]);
  return (
<<<<<<< HEAD
    <div className="header-content">
      <div className="header-content-inner">
>>>>>>> 4054e8b... add react-bootstrap and design home page
=======
    <div className="header-content cover-all have-background-img">
      <div className="header-content-inner center-vert-hor">
>>>>>>> b7879d0... bootstrap login and signup page
        <h1>CLEAN CLAN</h1>
        <hr />
        <p>
          An initiative to make Swachh Bharat program more of a game and lots of fun.
          <br />
          &quot;Ab khel khel me badlega Bharat&quot;
        </p>
        <div className="homepage-navigation">
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
          {authState === LOGGED_IN && userName ? (
            <>
              <Button variant="primary" href="/profile" block>
                { userPic ? <Image className="user-pic" src={userPicURL} /> : null}
                Continue as
                {' '}
                <strong>{userName}</strong>
=======
          {user && user.name ? (
=======
          {authState === LOGGED_IN && user && user.name ? (
>>>>>>> a81005f... bootstrap user profile component
=======
          {authState === LOGGED_IN && userName ? (
>>>>>>> 560a7fe... add formik + reform redux store
            <>
              <Button variant="primary" href="/profile" block>
                { userPic ? <Image className="user-pic" src={userPicURL} /> : null}
                Continue as
                {' '}
<<<<<<< HEAD
                <strong>{user.name}</strong>
>>>>>>> 4054e8b... add react-bootstrap and design home page
=======
                <strong>{userName}</strong>
>>>>>>> 560a7fe... add formik + reform redux store
              </Button>
              <br />
              <LogoutButton />
            </>
          ) : (
            <Button variant="info" href="/login" block>
              <strong>SIGN IN</strong>
            </Button>
          )}
          <br />
          { authState !== LOGGED_IN
            ? (
              <Button variant="dark" href="/signup" block>
                <strong>NEW ACCOUNT</strong>
              </Button>
            ) : null}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
