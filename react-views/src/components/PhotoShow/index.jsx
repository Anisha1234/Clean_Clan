import React from 'react';
import Image from 'react-bootstrap/Image';
import { AiOutlineClose } from 'react-icons/ai';
import PropTypes from 'prop-types';
import { createImageURL } from '../../util';
import './style.css';

const PhotoShow = ({
  isOpen, onClose, image, children,
}) => {
  return (
    <>
      {children}
      {
        isOpen ? (
          <div className="photo-show-container text-center">
            <button className="hidden-btn close-btn" type="button" onClick={onClose}>
              <AiOutlineClose className="close-icon" />
            </button>
            <div className="photo-container">
              <Image className="photo center-vert-hor" src={createImageURL(image)} />
            </div>
          </div>
        ) : null
      }
    </>
  );
};

export default PhotoShow;

PhotoShow.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  children: PropTypes.element,
};

PhotoShow.defaultProps = {
  children: null,
};
