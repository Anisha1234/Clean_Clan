import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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

const PostFormComponent = () => {
  const [postLocation, setPostLocation] = useState(undefined);
  const [postType, setPostType] = useState('Challenge');
  const [postHeading, setPostHeading] = useState(undefined);
  const [postDescription, setPostDescription] = useState(undefined);
  const [stakeholders, setStakeholders] = useState(undefined);
  const [uploadedImages, setUploadedImages] = useState(
    initiateUploadedImages(postTypeImageCount[postType]),
  );
  const [publishPostError, setPublishPostError] = useState(undefined);
  const dispatch = useDispatch();
  const submitNewPost = (e) => {
    e.preventDefault();
    dispatch(publishPostAction(
      postLocation, postType, postHeading, postDescription, stakeholders, uploadedImages,
    ))
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        setPublishPostError(error.toString());
      });
  };
  // change the post type => resize the uploaded images array
  const updateSelectedPostType = (chosenType) => {
    // resize uploaded images array first
    const newUploadedImages = initiateUploadedImages(postTypeImageCount[chosenType]);
    for (let i = 0; i < uploadedImages.length; i += 1) {
      // if the image element fits the new uploaded array => copy
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
  };
  const handleUploadImage = (imageIndex, imageFile) => {
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
  };
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
          {Object.keys(postTypeImageCount).map((type) => (
            <option
              key={type}
              value={type}
            >
              {type}
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
        Title:
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
