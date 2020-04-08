import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { MdLocationOn } from 'react-icons/md';
import PropTypes from 'prop-types';
import { createImageURL } from '../../util';
import PostPreview from '../PostPreview';

const PostContent = ({
  date, location, description,
  imageBefore, imageAfter,
  challenge, solution,
}) => (
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
            <Card.Img src={createImageURL(imageBefore)} />
          </Card>
        )
      }
      {
        imageAfter && (
          <Card border="light">
            <Card.Img src={createImageURL(imageAfter)} />
          </Card>
        )
      }
    </CardGroup>
  </>
);

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
