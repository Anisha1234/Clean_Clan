import React, {
  useState, useCallback, useRef, useEffect,
} from 'react';
import Form from 'react-bootstrap/Form';
import CardDeck from 'react-bootstrap/CardDeck';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { MdAttachFile } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { publishPost } from '../../store/posts';
import './style.css';

// 2 types of post, each post type corresponds to an exact amount of images
const imageCount = {
  Challenge: 1,
  Solution: 2,
};

const imageTitles = ['Before', 'After'];

/**
 * @function- initiate the uploaded images array
 * @param {number} size
 */
const uploadImageURLsInit = (size) => [...Array(size)].map(() => '');

const PostForm = ({ type, responsePostID, closeForm }) => {
  const isMounted = useRef(true);
  useEffect(() => () => { isMounted.current = false; }, []);

  const [publishStatus, setPublishStatus] = useState(false);
  useEffect(() => {
    if (publishStatus) {
      closeForm();
    }
  }, [closeForm, publishStatus]);

  const [publishError, setPublishError] = useState('');
  const [imageURLs, setImageURLs] = useState(
    uploadImageURLsInit(imageCount[type]),
  );
  useEffect(() => () => {
    setImageURLs((URLs) => {
      URLs.forEach((url) => { URL.revokeObjectURL(url); });
      return [];
    });
  }, []);

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
        <Form.Control.Feedback type="invalid">
          {formHandler.errors.location}
        </Form.Control.Feedback>
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
        <Form.Control.Feedback type="invalid">
          {formHandler.errors.heading}
        </Form.Control.Feedback>
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
        <Form.Control.Feedback type="invalid">
          {formHandler.errors.stakeholders}
        </Form.Control.Feedback>
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
        <Form.Control.Feedback type="invalid">
          {formHandler.errors.description}
        </Form.Control.Feedback>
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
        <Button
          variant="outline-info"
          type="submit"
          style={{ padding: '10px' }}
          disabled={formHandler.isSubmitting}
        >
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
    </Form>
  );
};

export default PostForm;

PostForm.propTypes = {
  type: PropTypes.oneOf(Object.keys(imageCount)).isRequired,
  responsePostID: PropTypes.string,
  closeForm: PropTypes.func.isRequired,
};

PostForm.defaultProps = {
  responsePostID: '',
};
