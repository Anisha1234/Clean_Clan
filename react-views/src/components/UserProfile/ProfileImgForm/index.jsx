import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { MdCloudUpload } from 'react-icons/md';
import PropTypes from 'prop-types';
import { updateUserPicAction } from '../../../store/user';
import './style.css';

const ProfileImgForm = ({ allImages }) => {
  const [keyAction, setKeyAction] = useState('upload new');
  const userDataError = useSelector((state) => state.user.data.error);
  const [newProfileImg, setNewProfileImg] = useState({
    file: null,
    url: '',
  });
  const dispatch = useDispatch();

  const handleUploadImage = useCallback((file) => {
    setNewProfileImg((currentImg) => {
      if (currentImg.file) {
        URL.revokeObjectURL(currentImg.url);
      }
      return {
        file,
        url: URL.createObjectURL(file),
      };
    });
  }, []);

  const submitNewProfileImg = useCallback((e) => {
    e.preventDefault();
    dispatch(updateUserPicAction('', newProfileImg.file));
  }, [dispatch, newProfileImg]);

  return (
    <Tabs
      activeKey={keyAction}
      onSelect={(action) => setKeyAction(action)}
      className="justify-content-center"
    >
      <Tab
        eventKey="upload new"
        title="Upload new pic"
      >
        <Form
          className="justify-content-center text-center"
          encType="multipart/form-data"
          onSubmit={submitNewProfileImg}
        >
          <div className="user-pic-preview">
            <h2 className="center-vert-hor text-muted">Preview</h2>
            <Image fluid className="center-vert-hor" src={newProfileImg.url} />
          </div>
          <Form.Group controlId="user-pic">
            <Form.Label className="user-pic-upload-control">
              <Form.Control
                className="user-pic-upload cover-all"
                name="user-pic"
                type="file"
                accept="image/*"
                onChange={(e) => handleUploadImage(e.target.files[0])}
                required
              />
              <Button variant="link" className="user-pic-upload-label">
                <MdCloudUpload />
                {' '}
                {' '}
                Upload an image
              </Button>
            </Form.Label>
          </Form.Group>
          <Form.Group>
            <Button variant="outline-primary" type="submit">Submit</Button>
          </Form.Group>
          {
          userDataError ? (
            <Alert variant="danger">{userDataError}</Alert>
          ) : null
        }
        </Form>
      </Tab>
      <Tab
        eventKey="pick old"
        title="Choose old pic"
        disabled={!allImages || allImages.length === 0}
      />
    </Tabs>
  );
};

export default ProfileImgForm;

ProfileImgForm.propTypes = {
  allImages: PropTypes.arrayOf(PropTypes.string),
};

ProfileImgForm.defaultProps = {
  allImages: [],
};
