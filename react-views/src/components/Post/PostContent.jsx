import React, { useState, useCallback } from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { MdLocationOn } from 'react-icons/md';
import PropTypes from 'prop-types';
import { createImageURL } from '../../util';
import PostPreview from '../PostPreview';
import PhotoShow from './PhotoShow';


const PostContent = ({
  date, location, description,
  imageBefore, imageAfter,
  challenge, solution,
}) => {
  const [photoShowOpen, setPhotoShowOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState('');
  const [activePhotoTitle, setActivePhotoTitle] = useState('');
  const handleOpenPhotoShow = useCallback((imageName, imageTitle) => {
    if (!imageName) {
      return;
    }
    setActivePhoto(imageName);
    setPhotoShowOpen(true);
    setActivePhotoTitle(imageTitle);
  }, []);
  return (
    <>
      <small className="text-muted">
        {new Date(date).toLocaleString()}
        <MdLocationOn />
        {` ${location}`}
      </small>
      {solution && <PostPreview postID={solution} />}
      {challenge && <PostPreview postID={challenge} />}
      <Card.Text>
        {description}
      </Card.Text>
      <CardGroup>
        {
          imageBefore && (
            <Card border="light">
              <button
                className="hidden-btn"
                type="button"
                onClick={() => handleOpenPhotoShow(imageBefore, 'BEFORE')}
              >
                <Card.Img src={createImageURL(imageBefore)} />
              </button>
            </Card>
          )
        }
        {
          imageAfter && (
            <Card border="light">
              <button
                className="hidden-btn"
                type="button"
                onClick={() => handleOpenPhotoShow(imageAfter, 'AFTER')}
              >
                <Card.Img src={createImageURL(imageAfter)} />
              </button>
            </Card>
          )
        }
      </CardGroup>
      <PhotoShow
        isOpen={activePhoto ? photoShowOpen : false}
        onClose={() => setPhotoShowOpen(false)}
        image={activePhoto}
        title={activePhotoTitle}
      />
    </>
  );
};

export default PostContent;

PostContent.propTypes = {
  location: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  imageBefore: PropTypes.string.isRequired,
  imageAfter: PropTypes.string,
  solution: PropTypes.string,
  challenge: PropTypes.string,
};

PostContent.defaultProps = {
  imageAfter: '',
  solution: '',
  challenge: '',
};
