import React from 'react';
import Image from 'react-bootstrap/Image';
import { AiOutlineClose } from 'react-icons/ai';
import PropTypes from 'prop-types';
import { createImageURL } from '../../../util';
import './style.css';

const PhotoShow = ({
  isOpen, onClose, image, title,
}) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="photo-show-container text-center">
      <button className="hidden-btn close-btn" type="button" onClick={onClose}>
        <AiOutlineClose className="close-icon" />
      </button>
      <Image className="photo" src={createImageURL(image)} />
      <div className="photo-title">
        <h1>{title.toUpperCase()}</h1>
      </div>
    </div>
  );
};

export default PhotoShow;

PhotoShow.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
