import React, { useMemo } from 'react';
import Button from 'react-bootstrap/button';
import Image from 'react-bootstrap/Image';
import { useSelector } from 'react-redux';
import LogoutButton from '../../components/LogoutButton';
import { LOGGED_IN } from '../../constants';
import { createImageURL, getUserData } from '../../util';
import './style.css';

const HomePage = () => {
  const authState = useSelector((state) => state.user.auth.status);
  const currentUserID = useSelector((state) => state.user.data.userID);
  const userName = useSelector(getUserData(currentUserID, 'name'));
  const userPic = useSelector(getUserData(currentUserID, 'image', 'current'));
  const userPicURL = useMemo(() => createImageURL(userPic), [userPic]);
  return (
    <div className="header-content cover-all have-background-img">
      <div className="header-content-inner center-vert-hor">
        <h1>CLEAN CLAN</h1>
        <hr />
        <p>
          An initiative to make Swachh Bharat program more of a game and lots of fun.
          <br />
          &quot;Ab khel khel me badlega Bharat&quot;
        </p>
        <div className="homepage-navigation">
          {authState === LOGGED_IN && userName ? (
            <>
              <Button variant="primary" href="/timeline" block>
                { userPic ? <Image className="user-pic" src={userPicURL} alt="user-pic" /> : null}
                Continue as
                {' '}
                <strong>{userName}</strong>
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
