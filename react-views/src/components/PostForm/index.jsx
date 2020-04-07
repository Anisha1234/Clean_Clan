import React, {
<<<<<<< HEAD
<<<<<<< HEAD
  useState, useCallback, useRef, useEffect,
=======
  useState, useCallback, useRef,
>>>>>>> cb1dc93... Design post form
=======
  useState, useCallback, useRef, useEffect,
>>>>>>> a46b53d... Reduce redundant code
} from 'react';
import Form from 'react-bootstrap/Form';
import CardDeck from 'react-bootstrap/CardDeck';
import Image from 'react-bootstrap/Image';
<<<<<<< HEAD
<<<<<<< HEAD
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
<<<<<<< HEAD
<<<<<<< HEAD
import Badge from 'react-bootstrap/Badge';
import { MdAttachFile } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { publishPost } from '../../store/posts';
import './style.css';

// 2 types of post, each post type corresponds to an exact amount of images
const imageCount = {
=======
=======
import Alert from 'react-bootstrap/Alert';
>>>>>>> a46b53d... Reduce redundant code
=======
>>>>>>> 243be1d... add submit button to post form
=======
import Badge from 'react-bootstrap/Badge';
>>>>>>> 2d5cfb4... finish post component (backend and frontend)
import { MdAttachFile } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { publishPost } from '../../store/posts';
import './style.css';

// 2 types of post, each post type corresponds to an exact amount of images
<<<<<<< HEAD
const postTypeImageCount = {
>>>>>>> cb1dc93... Design post form
=======
const imageCount = {
>>>>>>> 2d5cfb4... finish post component (backend and frontend)
  Challenge: 1,
  Solution: 2,
};

<<<<<<< HEAD
<<<<<<< HEAD
const imageTitles = ['Before', 'After'];

=======
>>>>>>> cb1dc93... Design post form
=======
const imageTitles = ['Before', 'After'];

>>>>>>> 2d5cfb4... finish post component (backend and frontend)
/**
 * @function- initiate the uploaded images array
 * @param {number} size
 */
<<<<<<< HEAD
<<<<<<< HEAD
const uploadImageURLsInit = (size) => [...Array(size)].map(() => '');

const PostForm = ({ type, responsePostID }) => {
  const isMounted = useRef(true);
  useEffect(() => () => { isMounted.current = false; }, []);

  const [publishStatus, setPublishStatus] = useState(false);
  useEffect(() => {
    if (publishStatus) {
      window.location.reload();
    }
  }, [publishStatus]);

  const [publishError, setPublishError] = useState('');
  const [imageURLs, setImageURLs] = useState(
    uploadImageURLsInit(imageCount[type]),
  );
  useEffect(() => () => {
    imageURLs.forEach((url) => {
      if (url) URL.revokeObjectURL(url);
    });
  }, [imageURLs]);

  const dispatch = useDispatch();
  const formHandler = useFormik({
    initialValues: {
      location: '',
      heading: '',
      stakeholders: '',
      description: '',
      images: [...Array(imageCount[type])],
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: (values) => {
      const {
        location, heading, stakeholders, description, images,
      } = values;
      const error = {};
      if (!location) error.location = 'Location cannot be empty';
      if (!heading) error.heading = 'Title cannot be empty';
      if (!description) error.description = 'Description cannot be empty';
      if (!stakeholders) error.stakeholders = 'Stakeholers cannot be empty';
      if (images.length < imageCount[type]) error.images = 'Invalid images';
      if (images.filter((imageFile) => (!imageFile)).length > 0) { error.images = `Should have ${imageCount[type]} images`; }
      return error;
    },
    onSubmit: async (values) => {
      try {
        await dispatch(publishPost(type, responsePostID, values));
        if (!isMounted.current) return;
        setPublishStatus(true);
      } catch (error) {
        if (!isMounted.current) return;
        setPublishStatus(false);
        setPublishError(error.toString());
      }
    },
  });
  // handle description text area
  const postDescriptionTextRef = useRef();
  const handlePostDescriptionText = useCallback((e) => {
    formHandler.handleChange(e);
    postDescriptionTextRef.current.style.height = '60px';
    postDescriptionTextRef.current.style.height = `${`${e.target.scrollHeight}px`}`;
  }, [formHandler, postDescriptionTextRef]);

  // onChange upload image
  const handleUploadImage = useCallback((imageIndex, imageFile) => {
    const { images } = formHandler.values;
    if (imageIndex >= images.length) {
      formHandler.setFieldError('images', 'Could not upload images');
      return;
    }
    images[imageIndex] = imageFile;
    formHandler.setFieldValue('images', images);
    setImageURLs(
      (urlArray) => urlArray.map((url, index) => {
        if (index !== imageIndex) return url;
        URL.revokeObjectURL(url);
        return URL.createObjectURL(imageFile);
      }),
    );
  }, [formHandler]);
  return (
    <Form
      encType="multipart/form-data"
      onSubmit={formHandler.handleSubmit}
    >
      <Badge variant={type === 'Challenge' ? 'danger' : 'success'}>
        {type}
      </Badge>
      <Form.Group controlId="location">
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          name="location"
          onChange={formHandler.handleChange}
          placeholder="Mumbai"
          isInvalid={formHandler.errors.location}
        />
      </Form.Group>
      <Form.Group controlId="heading">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="heading"
          onChange={formHandler.handleChange}
          placeholder="Enter the heading..."
          isInvalid={formHandler.errors.heading}
        />
      </Form.Group>
      <Form.Group controlId="stakeholders">
        <Form.Label>Stakeholders</Form.Label>
        <Form.Control
          type="text"
          name="stakeholders"
          onChange={formHandler.handleChange}
          placeholder="Stakeholders..."
          isInvalid={formHandler.errors.stakeholders}
        />
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>
          Describe your
          {' '}
          {type.toLowerCase()}
        </Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          className="post-description"
          onChange={handlePostDescriptionText}
          placeholder="Enter the description here..."
          ref={postDescriptionTextRef}
          isInvalid={formHandler.errors.description}
        />
      </Form.Group>
      <CardDeck className="justify-content-around text-center">
        {
          [...Array(imageCount[type]).keys()].map((key) => (
            <Form.Group key={key}>
              <Form.Label className="post-image-container">
                <div className="post-image-overlay cover-all">
                  <MdAttachFile className="center-vert-hor post-image-icon" />
                </div>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleUploadImage(key, e.target.files[0])}
                  className="post-image-upload cover-all"
                />
                <Image fluid className="center-vert-hor" src={imageURLs[key]} />
              </Form.Label>
              <br />
              <small className="text-muted">{imageTitles[key]}</small>
            </Form.Group>
          ))
        }
      </CardDeck>
      {
          formHandler.errors.images
            ? (
              <Alert variant="danger">
                {formHandler.errors.images}
              </Alert>
            ) : null
        }
      <Form.Group className="text-center">
        <Button variant="outline-info" type="submit" style={{ padding: '10px' }}>
          Submit
        </Button>
        {
          publishError
            ? (
              <Alert variant="danger">
                {publishError}
              </Alert>
            ) : null
        }
      </Form.Group>
=======
const initiateUploadedImages = (size) => (
  [...Array(size)].map(() => ({
    file: null,
    url: '',
  }))
);
=======
const uploadImageURLsInit = (size) => [...Array(size)].map(() => '');
>>>>>>> 2d5cfb4... finish post component (backend and frontend)

const PostForm = ({ type, responsePostID }) => {
  const isMounted = useRef(true);
  useEffect(() => () => { isMounted.current = false; }, []);

  const [publishStatus, setPublishStatus] = useState(false);
  useEffect(() => {
    if (publishStatus) {
      window.location.reload();
    }
  }, [publishStatus]);

  const [publishError, setPublishError] = useState('');
  const [imageURLs, setImageURLs] = useState(
    uploadImageURLsInit(imageCount[type]),
  );
  useEffect(() => () => {
    imageURLs.forEach((url) => {
      if (url) URL.revokeObjectURL(url);
    });
  }, [imageURLs]);

  const dispatch = useDispatch();
  const formHandler = useFormik({
    initialValues: {
      location: '',
      heading: '',
      stakeholders: '',
      description: '',
      images: [...Array(imageCount[type])],
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: (values) => {
      const {
        location, heading, stakeholders, description, images,
      } = values;
      const error = {};
      if (!location) error.location = 'Location cannot be empty';
      if (!heading) error.heading = 'Title cannot be empty';
      if (!description) error.description = 'Description cannot be empty';
      if (!stakeholders) error.stakeholders = 'Stakeholers cannot be empty';
      if (images.length < imageCount[type]) error.images = 'Invalid images';
      if (images.filter((imageFile) => (!imageFile)).length > 0) { error.images = `Should have ${imageCount[type]} images`; }
      return error;
    },
    onSubmit: async (values) => {
      try {
        await dispatch(publishPost(type, responsePostID, values));
        if (!isMounted.current) return;
        setPublishStatus(true);
      } catch (error) {
        if (!isMounted.current) return;
        setPublishStatus(false);
        setPublishError(error.toString());
      }
    },
  });
  // handle description text area
  const postDescriptionTextRef = useRef();
  const handlePostDescriptionText = useCallback((e) => {
    formHandler.handleChange(e);
    postDescriptionTextRef.current.style.height = '60px';
    postDescriptionTextRef.current.style.height = `${`${e.target.scrollHeight}px`}`;
  }, [formHandler, postDescriptionTextRef]);

  // onChange upload image
  const handleUploadImage = useCallback((imageIndex, imageFile) => {
    const { images } = formHandler.values;
    if (imageIndex >= images.length) {
      formHandler.setFieldError('images', 'Could not upload images');
      return;
    }
    images[imageIndex] = imageFile;
    formHandler.setFieldValue('images', images);
    setImageURLs(
      (urlArray) => urlArray.map((url, index) => {
        if (index !== imageIndex) return url;
        URL.revokeObjectURL(url);
        return URL.createObjectURL(imageFile);
      }),
    );
  }, [formHandler]);
  return (
    <Form
      encType="multipart/form-data"
      onSubmit={formHandler.handleSubmit}
    >
      <Badge variant={type === 'Challenge' ? 'danger' : 'success'}>
        {type}
      </Badge>
      <Form.Group controlId="location">
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          name="location"
          onChange={formHandler.handleChange}
          placeholder="Mumbai"
          isInvalid={formHandler.errors.location}
        />
      </Form.Group>
      <Form.Group controlId="heading">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="heading"
          onChange={formHandler.handleChange}
          placeholder="Enter the heading..."
          isInvalid={formHandler.errors.heading}
        />
      </Form.Group>
      <Form.Group controlId="stakeholders">
        <Form.Label>Stakeholders</Form.Label>
        <Form.Control
          type="text"
          name="stakeholders"
          onChange={formHandler.handleChange}
          placeholder="Stakeholders..."
          isInvalid={formHandler.errors.stakeholders}
        />
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>
          Describe your
          {' '}
          {type.toLowerCase()}
        </Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          className="post-description"
          onChange={handlePostDescriptionText}
          placeholder="Enter the description here..."
          ref={postDescriptionTextRef}
          isInvalid={formHandler.errors.description}
        />
      </Form.Group>
      <CardDeck className="justify-content-around text-center">
        {
          [...Array(imageCount[type]).keys()].map((key) => (
            <Form.Group key={key}>
              <Form.Label className="post-image-container">
                <div className="post-image-overlay cover-all">
                  <MdAttachFile className="center-vert-hor post-image-icon" />
                </div>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleUploadImage(key, e.target.files[0])}
                  className="post-image-upload cover-all"
                />
                <Image fluid className="center-vert-hor" src={imageURLs[key]} />
              </Form.Label>
              <br />
              <small className="text-muted">{imageTitles[key]}</small>
            </Form.Group>
          ))
        }
      </CardDeck>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> cb1dc93... Design post form
=======
=======
      <Form.Group
        controlId="user-submit"
        style={{ textAlign: 'center' }}
      >
        <Button
          variant="outline-info"
          type="submit"
          style={{ padding: '10px' }}
        >
=======
      {
          formHandler.errors.images
            ? (
              <Alert variant="danger">
                {formHandler.errors.images}
              </Alert>
            ) : null
        }
      <Form.Group className="text-center">
        <Button variant="outline-info" type="submit" style={{ padding: '10px' }}>
>>>>>>> 2d5cfb4... finish post component (backend and frontend)
          Submit
        </Button>
        {
          publishError
            ? (
              <Alert variant="danger">
                {publishError}
              </Alert>
            ) : null
        }
      </Form.Group>
<<<<<<< HEAD
>>>>>>> 243be1d... add submit button to post form
      {
          publishMessage ? (
            <Alert
              variant={publishStatus === FAIL ? 'danger' : 'info'}
            >
              {publishMessage}
            </Alert>
          ) : null
        }
>>>>>>> a46b53d... Reduce redundant code
=======
>>>>>>> 992e396... Allow user to upload profile picture
    </Form>
  );
};

export default PostForm;

PostForm.propTypes = {
<<<<<<< HEAD
<<<<<<< HEAD
  type: PropTypes.oneOf(Object.keys(imageCount)).isRequired,
=======
  type: PropTypes.string,
>>>>>>> cb1dc93... Design post form
=======
  type: PropTypes.oneOf(Object.keys(imageCount)).isRequired,
>>>>>>> 2d5cfb4... finish post component (backend and frontend)
  responsePostID: PropTypes.string,
};

PostForm.defaultProps = {
<<<<<<< HEAD
<<<<<<< HEAD
=======
  type: 'Solution',
>>>>>>> cb1dc93... Design post form
=======
>>>>>>> 2d5cfb4... finish post component (backend and frontend)
  responsePostID: '',
};
