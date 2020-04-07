import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import { MdCameraAlt } from 'react-icons/md';
import PropTypes from 'prop-types';
import ProfileImgForm from '../ProfileImgForm';
<<<<<<< HEAD
<<<<<<< HEAD
import { createFileURL } from '../../../util';
=======
import { SERVER_ROOT } from '../../../constants';
>>>>>>> 992e396... Allow user to upload profile picture
=======
import { createFileURL } from '../../../util';
>>>>>>> 2d5cfb4... finish post component (backend and frontend)
import profileImg from '../../../assets/media/profile.png';
import './style.css';

const ProfileImage = ({ currentImage, allImages }) => {
  const [imageFormShow, setImageFormShow] = useState(false);
  return (
    <>
      <Row className="justify-content-center">
        <Card
          className="justify-content-center user-img-container"
          border="light"
          bg="light"
        >
          <Image
<<<<<<< HEAD
<<<<<<< HEAD
            src={currentImage ? createFileURL(currentImage) : profileImg}
            roundedCircle
            fluid
            alt="profile-pic"
=======
            src={
                currentImage
                  ? new URL(`/images/${currentImage}`, SERVER_ROOT) : profileImg
              }
            roundedCircle
            fluid
>>>>>>> 992e396... Allow user to upload profile picture
=======
            src={currentImage ? createFileURL(currentImage) : profileImg}
            roundedCircle
            fluid
            alt="profile-pic"
>>>>>>> 2d5cfb4... finish post component (backend and frontend)
          />
          <button
            className="user-img-update"
            type="button"
            onClick={() => setImageFormShow(true)}
          >
            <MdCameraAlt style={{ fontSize: '20px' }} />
          </button>
        </Card>
      </Row>
      <Modal show={imageFormShow} onHide={() => setImageFormShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change your profile pic</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProfileImgForm allImages={allImages} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProfileImage;

ProfileImage.propTypes = {
  currentImage: PropTypes.string,
  allImages: PropTypes.arrayOf(PropTypes.string),
};

ProfileImage.defaultProps = {
  currentImage: '',
  allImages: [],
};
