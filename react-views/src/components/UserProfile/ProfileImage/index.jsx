import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import { MdCameraAlt } from 'react-icons/md';
import PropTypes from 'prop-types';
import ProfileImgForm from '../../ProfileImgForm';
import PhotoShow from '../../PhotoShow';
import { createImageURL } from '../../../util';
import profileImg from '../../../assets/media/profile.png';
import './style.css';

const ProfileImage = ({ userID, currentImage }) => {
  const currentUserID = useSelector((state) => state.user.data.userID);
  const [imageFormShow, setImageFormShow] = useState(false);
  const [imageDisplay, setImageDisplay] = useState(false);
  const handleCloseImageForm = useCallback(() => {
    setImageFormShow(false);
  }, []);
  return (
    <>
      <Row className="justify-content-center">
        <Card
          className="justify-content-center user-img-container"
          border="light"
          bg="light"
        >
          <PhotoShow
            isOpen={!!(imageDisplay && currentImage)}
            image={currentImage}
            onClose={() => setImageDisplay(false)}
          >
            <button
              className="hidden-btn"
              type="button"
              onClick={() => setImageDisplay(true)}
            >
              <Image
                src={currentImage ? createImageURL(currentImage) : profileImg}
                roundedCircle
                fluid
                alt="profile-pic"
              />
            </button>
          </PhotoShow>
          {
            userID === currentUserID ? (
              <button
                className="user-img-update"
                type="button"
                onClick={() => setImageFormShow(true)}
              >
                <MdCameraAlt style={{ fontSize: '20px' }} />
              </button>
            ) : null
          }
        </Card>
      </Row>
      {
        userID === currentUserID ? (
          <Modal show={imageFormShow} onHide={handleCloseImageForm}>
            <Modal.Header closeButton>
              <Modal.Title>Change your profile pic</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ProfileImgForm
                userID={currentUserID}
                closeForm={handleCloseImageForm}
              />
            </Modal.Body>
          </Modal>
        ) : null
      }
    </>
  );
};

export default ProfileImage;

ProfileImage.propTypes = {
  userID: PropTypes.string,
  currentImage: PropTypes.string,
};

ProfileImage.defaultProps = {
  userID: '',
  currentImage: '',
};
