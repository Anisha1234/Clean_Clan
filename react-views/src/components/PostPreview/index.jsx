import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Media from 'react-bootstrap/Media';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';
import { MdLocationOn } from 'react-icons/md';
import PropTypes from 'prop-types';
import Loader from '../Loader';
import { getSinglePost } from '../../store/posts';
import { PENDING, DONE, FAIL } from '../../constants';
import { createImageURL } from '../../util';
import './style.css';
 
const PostReview = ({ postID }) => {
  const [requestError, setRequestError] = useState("");
  const [requestStatus, setRequestStatus] = useState("");
  const [post, setPost] = useState({});
  const dispatch = useDispatch();
  useEffect(()=>{
    let isMounted = true;
    setRequestStatus(PENDING);
    dispatch(getSinglePost(postID))
      .then((post)=>{
        if(!isMounted) return;
        setRequestStatus(DONE);
        setPost(post);
      })
      .catch((error)=>{
        if(!isMounted) return;
        setRequestStatus(FAIL);
        setRequestError(error.toString());
      });
    return () => {
      isMounted = false;
    }
  }, [dispatch]);
  return (
    <a href="/" className="post-preview-link">
      <Card border="light">
      <Media className='post-preview-container text-muted'>
        {
          (()=>{
            if(requestStatus === PENDING){
              return <Loader />
            }
            if(requestStatus === FAIL){
              return <strong>{requestError}</strong>;
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
                <Media.Body style={{marginLeft:'15px'}}>
                  <h6>
                    {post.heading || 'Oops'}
                  </h6>
                  <p>
                    <Badge 
                      variant={post.post_type === "Solution" ? "success": "danger"}
                    >
                      {post.post_type || "Oops"}
                    </Badge>
                    <MdLocationOn />
                    {' '}
                    {post.location || 'Oops'}
                  </p>
                </Media.Body>
              </>
            )
          })()
        }
      </Media>
    </Card>
    </a>
  );
};

export default PostReview;

PostReview.propTypes = {
  postID: PropTypes.string.isRequired
};
