import React from 'react';
import Media from 'react-bootstrap/Media';
import Image from 'react-bootstrap/Image';
import PropTypes from 'prop-types';
import { createImageURL } from '../../../util';
import profileImg from '../../../assets/media/profile.png';
import './style.css';

const AuthorBar = ({ authorName, authorImage }) => (
  <Media>
    <Image
      className="post-author-img"
      roundedCircle
      fluid
      src={createImageURL(authorImage) || profileImg}
    />
    <Media.Body className="post-author-body">
      <h6 className="post-author-name">{authorName}</h6>
    </Media.Body>
  </Media>
);

export default AuthorBar;

AuthorBar.propTypes = {
  authorName: PropTypes.string,
  authorImage: PropTypes.string,
};

AuthorBar.defaultProps = {
  authorName: '',
  authorImage: '',
};
