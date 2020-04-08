import React from 'react';
import Media from 'react-bootstrap/Media';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';
import { MdLocationOn } from 'react-icons/md';
import PropTypes from 'prop-types';
import Loader from '../Loader';
import useSinglePost from '../../containers/singlePostHook';
import { createImageURL } from '../../util';
import { PENDING, FAIL } from '../../constants';
import './style.css';

const PostReview = ({ postID }) => {
  const { post, requestStatus, requestError } = useSinglePost(postID);
  return (
    <a href={`/post/${postID}`} className="post-preview-link">
      <Card border="light">
        <Media className="post-preview-container text-muted">
          {
          (() => {
            if (requestStatus === PENDING) {
              return <Loader />;
            }
            if (requestStatus === FAIL || !post) {
              return (<strong>{requestError || 'Could not find the post'}</strong>);
            }
            return (
              <>
                <Image
                  fluid
                  className="post-preview-img"
                  src={
                    createImageURL((
                      post.post_type === 'Solution' ? post.image_after : post.image_before
                    ))
                  }
                  alt="something"
                />
                <Media.Body style={{ marginLeft: '15px' }}>
                  <h6>
                    {post.heading || 'Oops'}
                  </h6>
                  <p>
                    <Badge
                      variant={post.post_type === 'Solution' ? 'success' : 'danger'}
                    >
                      {post.post_type || 'Oops'}
                    </Badge>
                    <MdLocationOn />
                    {' '}
                    {post.location || 'Oops'}
                  </p>
                </Media.Body>
              </>
            );
          })()
        }
        </Media>
      </Card>
    </a>
  );
};

export default PostReview;

PostReview.propTypes = {
  postID: PropTypes.string.isRequired,
};
