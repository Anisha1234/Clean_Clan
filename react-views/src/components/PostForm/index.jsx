import React, {
  useState, useCallback, useRef, useEffect,
} from 'react';
import Form from 'react-bootstrap/Form';
import CardDeck from 'react-bootstrap/CardDeck';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import { MdAttachFile } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { FAIL, DONE } from '../../util';
import { publishPostAction } from '../../actions/Post';
import './style.css';

// 2 types of post, each post type corresponds to an exact amount of images
const postTypeImageCount = {
  Challenge: 1,
  Solution: 2,
};

/**
 * @function- initiate the uploaded images array
 * @param {number} size
 */
const initiateUploadedImages = (size) => (
  [...Array(size)].map(() => ({
    file: null,
    url: '',
  }))
);

// type: intended post type (Challenge/Solution)
// responsePostID: if type === Solution, then it could be solution to some responseID.
const PostForm = ({ type, responsePostID }) => {
  const [postLocation, setPostLocation] = useState(undefined);
  const [postType, setPostType] = useState(type);
  const [postHeading, setPostHeading] = useState(undefined);
  const [postDescription, setPostDescription] = useState(undefined);
  const [stakeholders, setStakeholders] = useState(undefined);
  const [uploadedImages, setUploadedImages] = useState(
    initiateUploadedImages(postTypeImageCount[postType]),
  );
  const publishMessage = useSelector((state) => state.posts.publish.message);
  const publishStatus = useSelector((state) => state.posts.publish.status);
  const dispatch = useDispatch();
  const postDescriptionTextRef = useRef();

  useEffect(() => {
    if (publishStatus === DONE) {
      window.location.reload();
    }
  }, [publishStatus]);

  const submitNewPost = useCallback((e) => {
    e.preventDefault();
    dispatch(
      publishPostAction({
        location: postLocation,
        type_post: postType,
        heading: postHeading,
        description: postDescription,
        stake_holders: stakeholders,
        images: uploadedImages,
      }, responsePostID),
    );
  }, [
    dispatch, responsePostID,
    postLocation, postType, postDescription, postHeading, stakeholders, uploadedImages,
  ]);

  const handlePostDescriptionText = useCallback((e) => {
    setPostDescription(e.target.value);
    postDescriptionTextRef.current.style.height = '60px';
    postDescriptionTextRef.current.style.height = `${`${e.target.scrollHeight}px`}`;
  }, [postDescriptionTextRef]);

  // onChange the post type
  const updateSelectedPostType = useCallback((chosenType) => {
    // resize uploaded images array first
    const newUploadedImages = initiateUploadedImages(postTypeImageCount[chosenType]);
    for (let i = 0; i < uploadedImages.length; i += 1) {
      // if the image element fits the new array => copy into the new array
      if (i < newUploadedImages.length) {
        newUploadedImages[i] = { ...uploadedImages[i] };
      }
      // revoke the url of the old uploaded images array to free the memory
      URL.revokeObjectURL(uploadedImages[i].url);
    }
    // now set the state
    setUploadedImages(newUploadedImages);
    // change the post type
    setPostType(chosenType);
  }, [uploadedImages]);

  // onChange upload image
  const handleUploadImage = useCallback((imageIndex, imageFile) => {
    if (imageIndex >= postTypeImageCount[postType]) {
      return;
    }
    setUploadedImages(uploadedImages.map(
      (currentImage, index) => {
        if (index !== imageIndex) return currentImage;
        URL.revokeObjectURL(currentImage.url);
        const url = URL.createObjectURL(imageFile);
        return {
          file: imageFile,
          url,
        };
      },
    ));
  }, [uploadedImages, postType]);

  return (
    <Form
      encType="multipart/form-data"
      onSubmit={submitNewPost}
    >
      {
        responsePostID ? null : (
          <Form.Group controlId="post-type">
            <Form.Label>What do you want to propose?</Form.Label>
            <Form.Control
              as="select"
              value={postType}
              onChange={(e) => updateSelectedPostType(e.target.value)}
            >
              {Object.keys(postTypeImageCount).map((pType) => (
                <option
                  key={pType}
                  value={pType}
                >
                  {pType}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        )
      }
      <Form.Group controlId="post-location">
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => setPostLocation(e.target.value)}
          placeholder="Mumbai"
          required
        />
      </Form.Group>
      <Form.Group controlId="post-heading">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => setPostHeading(e.target.value)}
          placeholder="Enter the heading..."
          required
        />
      </Form.Group>
      <Form.Group controlId="post-stakeholders">
        <Form.Label>Stakeholders</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => setStakeholders(e.target.value)}
          placeholder="Stakeholders..."
          required
        />
      </Form.Group>
      <Form.Group controlId="post-description">
        <Form.Label>
          Describe your
          {postType.toLowerCase()}
        </Form.Label>
        <Form.Control
          as="textarea"
          className="post-description"
          onChange={handlePostDescriptionText}
          placeholder="Enter the description here..."
          required
          ref={postDescriptionTextRef}
        />
      </Form.Group>
      <CardDeck className="justify-content-around">
        {
          [...Array(postTypeImageCount[postType]).keys()]
            .map((key) => (
              <Form.Group
                key={key}
                controlId={`post-image-${key}`}
              >
                <Form.Label className="post-image-container">
                  <div className="post-image-overlay cover-all">
                    <MdAttachFile
                      className="center-vert-hor post-image-icon"
                    />
                  </div>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleUploadImage(key, e.target.files[0])}
                    required
                    className="post-image-upload cover-all"
                  />
                  {
                    uploadedImages[key].url ? (
                      <Image
                        fluid
                        src={uploadedImages[key].url}
                        className="center-vert-hor"
                      />
                    ) : null
                  }
                </Form.Label>
              </Form.Group>
            ))
        }
      </CardDeck>
      {
          publishMessage ? (
            <Alert
              variant={publishStatus === FAIL ? 'danger' : 'info'}
            >
              {publishMessage}
            </Alert>
          ) : null
        }
    </Form>
  );
};

export default PostForm;

PostForm.propTypes = {
  type: PropTypes.string,
  responsePostID: PropTypes.string,
};

PostForm.defaultProps = {
  type: 'Solution',
  responsePostID: '',
};
