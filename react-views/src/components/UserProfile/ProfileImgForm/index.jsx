<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 560a7fe... add formik + reform redux store
import React, {
  useState, useCallback, useEffect, useRef,
} from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
<<<<<<< HEAD
=======
import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
>>>>>>> 992e396... Allow user to upload profile picture
=======
>>>>>>> 560a7fe... add formik + reform redux store
import Alert from 'react-bootstrap/Alert';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { MdCloudUpload } from 'react-icons/md';
import PropTypes from 'prop-types';
<<<<<<< HEAD
<<<<<<< HEAD
import { updateUserPic } from '../../../store/user';
import './style.css';

const OLD_IMAGE_TAB = 'old';
const NEW_IMAGE_TAB = 'new';

const ProfileImgForm = ({ allImages }) => {
  const isMounted = useRef(true);
  useEffect(() => () => { isMounted.current = false; }, []);

  const [activeTab, setActiveTab] = useState(NEW_IMAGE_TAB);
  const [newImageURL, setNewImageURL] = useState('');
  useEffect(() => () => {
    if (newImageURL) {
      URL.revokeObjectURL(newImageURL);
    }
  }, [newImageURL]);
  const [updateStatus, setUpdateStatus] = useState(false);
  useEffect(() => {
    if (updateStatus) {
      window.location.reload();
    }
  }, [updateStatus]);
  const [updateError, setUpdateError] = useState('');
  const dispatch = useDispatch();
  const imageFileRef = useRef();
  const formHandler = useFormik({
    initialValues: {
      newImageFile: null,
      oldImageName: '',
    },
    validate: (values) => {
      const { newImageFile, oldImageName } = values;
      if (!newImageFile && !oldImageName) {
        setUpdateStatus(false);
        setUpdateError("You haven't pick an profile picture yet!");
        return 'error';
      }
      return null;
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const { newImageFile, oldImageName } = values;
        await dispatch(updateUserPic(oldImageName, newImageFile));
        if (!isMounted.current) return;
        setUpdateStatus(true);
      } catch (error) {
        if (!isMounted.current) return;
        setUpdateStatus(false);
        setUpdateError(error.toString());
      }
    },
  });

  const handleUploadImage = useCallback((e) => {
    const file = e.target.files[0];
    setNewImageURL((currentURL) => {
      URL.revokeObjectURL(currentURL);
      return URL.createObjectURL(file);
    });
    formHandler.setFieldValue('newImageFile', file);
  }, [formHandler]);

  const handleChangeTab = useCallback((chosenTab) => {
    if (chosenTab === OLD_IMAGE_TAB) {
      setNewImageURL((currentURL) => {
        URL.revokeObjectURL(currentURL);
        return '';
      });
      imageFileRef.current.value = null;
      formHandler.setFieldValue('newImageFile', null);
    }
    setActiveTab(chosenTab);
  }, [formHandler, imageFileRef]);

  return (
    <Form
      className="justify-content-center cover-all"
      encType="multipart/form-data"
      onSubmit={formHandler.handleSubmit}
    >
      <Tabs
        activeKey={activeTab}
        onSelect={handleChangeTab}
        className="justify-content-center"
      >
        <Tab
          eventKey={NEW_IMAGE_TAB}
          title="Upload new pic"
          className="text-center"
        >
          <div className="user-pic-preview">
            <h2 className="center-vert-hor text-muted">Preview</h2>
<<<<<<< HEAD
<<<<<<< HEAD
            <Image fluid src={newImageURL} />
          </div>
          <Form.Group controlId="newImageFile" className="text-center">
            <Form.Control
              name="newImageFile"
              type="file"
              accept="image/*"
              ref={imageFileRef}
              onChange={handleUploadImage}
            />
          </Form.Group>
        </Tab>
        <Tab
          eventKey={OLD_IMAGE_TAB}
          title="Choose old pic"
          disabled={!allImages || allImages.length === 0}
        />
      </Tabs>
      <Form.Group>
        {
          !updateStatus && updateError
            ? <Alert variant="danger">{updateError}</Alert> : null
        }
      </Form.Group>
      <Form.Group className="text-center">
        <Button variant="outline-primary" type="submit">
          <MdCloudUpload />
          {' '}
          {' '}
          Submit
        </Button>
      </Form.Group>
    </Form>
=======
import { updateUserPicAction } from '../../../store/user';
=======
import { updateUserPic } from '../../../store/user';
>>>>>>> 560a7fe... add formik + reform redux store
import './style.css';

const OLD_IMAGE_TAB = 'old';
const NEW_IMAGE_TAB = 'new';

const ProfileImgForm = ({ allImages }) => {
  const isMounted = useRef(true);
  useEffect(() => () => { isMounted.current = false; }, []);

  const [activeTab, setActiveTab] = useState(NEW_IMAGE_TAB);
  const [newImageURL, setNewImageURL] = useState('');
  useEffect(() => () => {
    if (newImageURL) {
      URL.revokeObjectURL(newImageURL);
    }
  }, [newImageURL]);
  const [updateStatus, setUpdateStatus] = useState(false);
  useEffect(() => {
    if (updateStatus) {
      window.location.reload();
    }
  }, [updateStatus]);
  const [updateError, setUpdateError] = useState('');
  const dispatch = useDispatch();
  const imageFileRef = useRef();
  const formHandler = useFormik({
    initialValues: {
      newImageFile: null,
      oldImageName: '',
    },
    validate: (values) => {
      const { newImageFile, oldImageName } = values;
      if (!newImageFile && !oldImageName) {
        setUpdateStatus(false);
        setUpdateError("You haven't pick an profile picture yet!");
        return 'error';
      }
      return null;
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const { newImageFile, oldImageName } = values;
        await dispatch(updateUserPic(oldImageName, newImageFile));
        if (!isMounted.current) return;
        setUpdateStatus(true);
      } catch (error) {
        if (!isMounted.current) return;
        setUpdateStatus(false);
        setUpdateError(error.toString());
      }
    },
  });

  const handleUploadImage = useCallback((e) => {
    const file = e.target.files[0];
    setNewImageURL((currentURL) => {
      URL.revokeObjectURL(currentURL);
      return URL.createObjectURL(file);
    });
    formHandler.setFieldValue('newImageFile', file);
  }, [formHandler]);

  const handleChangeTab = useCallback((chosenTab) => {
    if (chosenTab === OLD_IMAGE_TAB) {
      setNewImageURL((currentURL) => {
        URL.revokeObjectURL(currentURL);
        return '';
      });
      imageFileRef.current.value = null;
      formHandler.setFieldValue('newImageFile', null);
    }
    setActiveTab(chosenTab);
  }, [formHandler, imageFileRef]);

  return (
    <Form
      className="justify-content-center cover-all"
      encType="multipart/form-data"
      onSubmit={formHandler.handleSubmit}
    >
      <Tabs
        activeKey={activeTab}
        onSelect={handleChangeTab}
        className="justify-content-center"
      >
        <Tab
          eventKey={NEW_IMAGE_TAB}
          title="Upload new pic"
          className="text-center"
        >
          <div className="user-pic-preview">
            <h2 className="center-vert-hor text-muted">Preview</h2>
            <Image fluid className="center-vert-hor" src={newImageURL} />
=======
            <Image fluid src={newImageURL}/>
>>>>>>> 2d5cfb4... finish post component (backend and frontend)
=======
            <Image fluid src={newImageURL} />
>>>>>>> 25138db... Lint react-views
          </div>
          <Form.Group controlId="newImageFile" className="text-center">
            <Form.Control
              name="newImageFile"
              type="file"
              accept="image/*"
              ref={imageFileRef}
              onChange={handleUploadImage}
            />
          </Form.Group>
        </Tab>
        <Tab
          eventKey={OLD_IMAGE_TAB}
          title="Choose old pic"
          disabled={!allImages || allImages.length === 0}
        />
      </Tabs>
      <Form.Group>
        {
          !updateStatus && updateError
            ? <Alert variant="danger">{updateError}</Alert> : null
        }
<<<<<<< HEAD
        </Form>
      </Tab>
      <Tab
        eventKey="pick old"
        title="Choose old pic"
        disabled={!allImages || allImages.length === 0}
      />
    </Tabs>
>>>>>>> 992e396... Allow user to upload profile picture
=======
      </Form.Group>
      <Form.Group className="text-center">
        <Button variant="outline-primary" type="submit">
          <MdCloudUpload />
          {' '}
          {' '}
          Submit
        </Button>
      </Form.Group>
    </Form>
>>>>>>> 560a7fe... add formik + reform redux store
  );
};

export default ProfileImgForm;

ProfileImgForm.propTypes = {
  allImages: PropTypes.arrayOf(PropTypes.string),
};

ProfileImgForm.defaultProps = {
  allImages: [],
};
