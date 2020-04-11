import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import { getUserProfile } from '../../store/user';
import UserProfile from '../../components/UserProfile';
import NavBar from '../../components/NavBar';
import Feed from '../../components/Feed';
import Loader from '../../components/Loader';
import { PENDING, DONE, FAIL } from '../../constants';
import './style.css';


const ProfilePage = ({ userID }) => {
  const [requestStatus, setRequestStatus] = useState(PENDING);
  const dispatch = useDispatch();
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        await dispatch(getUserProfile(userID));
        setRequestStatus(DONE);
      } catch (error) {
        if (!isMounted) return;
        setRequestStatus(FAIL);
      }
    })();
    return () => { isMounted = false; };
  }, [dispatch, userID]);

  if (requestStatus === PENDING) return <Loader />;
  if (requestStatus === FAIL) {
    return <p><strong>There is something broken with this profile link</strong></p>;
  }
  return (
    <>
      <NavBar />
      <Row className="profile-page-content">
        <Col lg={3}>
          <UserProfile userID={userID} />
        </Col>
        <Col lg={6}>
          <Feed author={userID} />
        </Col>
      </Row>
    </>
  );
};
export default ProfilePage;

ProfilePage.propTypes = {
  userID: PropTypes.string,
};

ProfilePage.defaultProps = {
  userID: '',
};
