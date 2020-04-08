import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import { MdCameraAlt } from 'react-icons/md';
import PropTypes from 'prop-types';
import ProfileImgForm from '../ProfileImgForm';
import { createImageURL } from '../../../util';
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
            src={currentImage ? createImageURL(currentImage) : profileImg}
            roundedCircle
            fluid
            alt="profile-pic"
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
