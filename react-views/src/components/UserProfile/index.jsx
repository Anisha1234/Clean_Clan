import React from 'react';
import { useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import {
  FaAddressCard,
  FaCity, FaMailBulk,
  FaAward,
} from 'react-icons/fa';
import PropTypes from 'prop-types';
import ProfileImage from './ProfileImage';
import { getUserData } from '../../util';
import './style.css';


const UserProfile = ({ userID }) => {
  const userName = useSelector(getUserData(userID, 'name'));
  const userDetails = useSelector(getUserData(userID, 'user_details'));
  const userCity = useSelector(getUserData(userID, 'city'));
  const userEmail = useSelector(getUserData(userID, 'email'));
  const likeCount = useSelector(getUserData(userID, 'like_count'));
  const userImage = useSelector(getUserData(userID, 'image', 'current'));
  return (
    <>
      <ProfileImage
        currentImage={userImage}
        userID={userID}
      />
      <Row
        className="justify-content-center"
        style={{ marginTop: '20px' }}
      >
        <Card
          className="justify-content-center text-center"
          style={{
            width: '90%',
            fontSize: '0.8rem',
            maxWidth: '350px',
          }}
        >
          <Card.Title>
            <FaAddressCard className="user-profile-icon" />
            {userName || 'Oops'}
          </Card.Title>
          <Card.Subtitle className="text-muted">
            {userDetails || 'Oops'}
          </Card.Subtitle>
          <Card.Body className="text-left">
            <Card.Text>
              <FaCity className="user-profile-icon" />
              {userCity || 'Oops'}
            </Card.Text>
            <Card.Text>
              <FaMailBulk className="user-profile-icon" />
              {userEmail || 'Oops'}
            </Card.Text>
            <Card.Text>
              <FaAward className="user-profile-icon" />
              Reputation:
              <strong>
                {' '}
                { parseInt(likeCount, 10) * 10 }
              </strong>
            </Card.Text>
          </Card.Body>
        </Card>
      </Row>
    </>
  );
};

export default UserProfile;

UserProfile.propTypes = {
  userID: PropTypes.string.isRequired,
};
