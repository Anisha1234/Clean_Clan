import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import {
  FaAddressCard,
  FaCity, FaMailBulk,
  FaAward,
} from 'react-icons/fa';
import { getUserProfileAction } from '../actions/User';
import profileImg from '../assets/media/profile.png';


const UserProfile = () => {
  const currentUser = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserProfileAction());
  }, [dispatch]);

  return (
    <>
      <Row className="justify-content-center">
        <Card
          className="justify-content-center"
          style={{ width: '150px' }}
          border="light"
          bg="light"
        >
          <Image src={profileImg} roundedCircle fluid />
        </Card>
      </Row>
      <Row
        className="justify-content-center"
        style={{ marginTop: '20px' }}
      >
        <Card
          className="justify-content-center text-center"
          style={{ width: '80%' }}
        >
          <Card.Title>
            <FaAddressCard
              style={{ padding: '5px', fontSize: '30px' }}
            />
            {
              currentUser && currentUser.name
                ? currentUser.name : 'Oops'
            }
          </Card.Title>
          <Card.Subtitle className="text-muted">
            {
              currentUser && currentUser.user_details
                ? currentUser.user_details : 'Oops'
            }
          </Card.Subtitle>
          <Card.Body className="text-left">
            <Card.Text>
              <FaCity style={{ padding: '5px', fontSize: '30px' }} />
              {
                currentUser && currentUser.city
                  ? currentUser.city : 'Oops'
              }
            </Card.Text>
            <Card.Text>
              <FaMailBulk style={{ padding: '5px', fontSize: '30px' }} />
              {
                currentUser && currentUser.email
                  ? currentUser.email : 'Oops'
              }
            </Card.Text>
            <Card.Text>
              <FaAward style={{ padding: '5px', fontSize: '30px' }} />
              Reputation: &nbsp;
              {
                currentUser && typeof (currentUser.like_count) === 'number'
                  ? (<strong>{currentUser.like_count * 10}</strong>)
                  : 'Could not display your reputation'
              }
            </Card.Text>
          </Card.Body>
        </Card>
      </Row>
    </>
  );
};

export default UserProfile;
