import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import {
  FaAddressCard,
  FaCity, FaMailBulk,
  FaAward,
} from 'react-icons/fa';
import ProfileImage from './ProfileImage';
<<<<<<< HEAD
<<<<<<< HEAD
import { getUserProfile } from '../../store/user';
=======
import { getUserProfileAction } from '../../store/user';
>>>>>>> 992e396... Allow user to upload profile picture
=======
import { getUserProfile } from '../../store/user';
>>>>>>> 560a7fe... add formik + reform redux store
import './style.css';


const UserProfile = () => {
  const currentUser = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  useEffect(() => {
<<<<<<< HEAD
<<<<<<< HEAD
    dispatch(getUserProfile());
=======
    dispatch(getUserProfileAction());
>>>>>>> 992e396... Allow user to upload profile picture
=======
    dispatch(getUserProfile());
>>>>>>> 560a7fe... add formik + reform redux store
  }, [dispatch]);

  return (
    <>
      <ProfileImage
        currentImage={currentUser.image.current}
        allImages={currentUser.image.all}
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
            {currentUser.name}
          </Card.Title>
          <Card.Subtitle className="text-muted">
            {currentUser.user_details}
          </Card.Subtitle>
          <Card.Body className="text-left">
            <Card.Text>
              <FaCity className="user-profile-icon" />
              { currentUser.city }
            </Card.Text>
            <Card.Text>
              <FaMailBulk className="user-profile-icon" />
              { currentUser.email }
            </Card.Text>
            <Card.Text>
              <FaAward className="user-profile-icon" />
              Reputation:
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 2d5cfb4... finish post component (backend and frontend)
              <strong>
                {' '}
                { parseInt(currentUser.like_count, 10) * 10 }
              </strong>
<<<<<<< HEAD
=======
              {' '}
<<<<<<< HEAD
              {` ${parseInt(currentUser.like_count, 10) * 10}`}
>>>>>>> 992e396... Allow user to upload profile picture
=======
              { parseInt(currentUser.like_count, 10) * 10 }
>>>>>>> 560a7fe... add formik + reform redux store
=======
>>>>>>> 2d5cfb4... finish post component (backend and frontend)
            </Card.Text>
          </Card.Body>
        </Card>
      </Row>
    </>
  );
};

export default UserProfile;
