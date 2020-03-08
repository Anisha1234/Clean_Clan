import React, {
  useState, useRef, useEffect, useCallback,
} from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { publishPostAction } from '../actions/PostAction';
import defaultImg from '../assets/media/ninja.png';

// 2 types of post, each post type corresponds to an exact amount of images
const postTypeImageCount = {
  Challenge: 1,
  Solution: 2,
};

// initiate the uploaded images array with give size
const initiateUploadedImages = (size) => (
  [...Array(size)].map(() => ({
    file: null,
    url: defaultImg,
  }))
);

// type: intended post type (Challenge/Solution)
// responsePostID: if type === Solution, then it could be solution to some responseID.
const PostFormComponent = ({ type, responsePostID }) => {
  const isUnmounted = useRef(false);
  const [postLocation, setPostLocation] = useState(undefined);
  const [postType, setPostType] = useState(type);
  const [postHeading, setPostHeading] = useState(undefined);
  const [postDescription, setPostDescription] = useState(undefined);
  const [stakeholders, setStakeholders] = useState(undefined);
  const [uploadedImages, setUploadedImages] = useState(
    initiateUploadedImages(postTypeImageCount[postType]),
  );
  const [publishPostError, setPublishPostError] = useState(undefined);
  const dispatch = useDispatch();

  useEffect(() => () => {
    isUnmounted.current = true;
  }, []);

  const submitNewPost = useCallback((e) => {
    e.preventDefault();
    dispatch(publishPostAction({
      location: postLocation,
      type_post: postType,
      heading: postHeading,
      description: postDescription,
      stake_holders: stakeholders,
      images: uploadedImages,
    }, responsePostID))
      .then(() => {
        if (isUnmounted.current) return;
        window.location.reload();
      })
      .catch((error) => {
        if (isUnmounted.current) return;
        setPublishPostError(error.toString());
      });
  }, [
    isUnmounted, dispatch, responsePostID,
    postLocation, postType, postDescription, postHeading, stakeholders, uploadedImages,
  ]);
  // change the post type
  const updateSelectedPostType = useCallback((chosenType) => {
    // if responsePostID exist, the chosenType must !== Challenge
    if (responsePostID && chosenType === 'Challenge') {
      setPublishPostError('You are proposing a solution to this challenge');
      return;
    }
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
  }, [uploadedImages, responsePostID]);


  const handleUploadImage = useCallback((imageIndex, imageFile) => {
    if (imageIndex < postTypeImageCount[postType]) {
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
    }
  }, [uploadedImages, postType]);
  return (
    <form
      encType="multipart/form-data"
      onSubmit={submitNewPost}
    >
      <label htmlFor="post-location">
        Location:
        <input
          name="post-location"
          type="text"
          onChange={(e) => setPostLocation(e.target.value)}
          placeholder="Mumbai"
          required
        />
      </label>
      <br />
      <label htmlFor="post-type">
        Type of post:
        <select
          name="post-type"
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
        </select>
      </label>
      <br />
      <label htmlFor="post-heading">
        Title:
        <input
          name="post-heading"
          type="text"
          onChange={(e) => setPostHeading(e.target.value)}
          placeholder="Enter the heading..."
          required
        />
      </label>
      <br />
      <label htmlFor="post-description">
        Description
        <textarea
          name="post-description"
          onChange={(e) => setPostDescription(e.target.value)}
          placeholder={`Enter your ${postType.toLowerCase()} description here`}
          required
        />
      </label>
      <br />
      <label htmlFor="post-stakeholders">
        Stakeholders:
        <input
          name="post-stakeholders"
          type="text"
          onChange={(e) => setStakeholders(e.target.value)}
          placeholder="Stakeholders..."
          required
        />
      </label>
      <br />
      {
        [...Array(postTypeImageCount[postType]).keys()]
          .map((key) => (
            <div key={key}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleUploadImage(key, e.target.files[0])}
                required
              />
              <br />
              <img src={uploadedImages[key].url} alt="nothing" />
            </div>
          ))
      }
      <br />
      <input type="submit" />
      <br />
      <strong>{publishPostError}</strong>
    </form>

  );
};

export default PostFormComponent;

PostFormComponent.propTypes = {
  type: PropTypes.string,
  responsePostID: PropTypes.string,
};

PostFormComponent.defaultProps = {
  type: 'Solution',
  responsePostID: '',
};
