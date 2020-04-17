import React, {
  useState, useCallback, useEffect, useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import Alert from 'react-bootstrap/Alert';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { MdCloudUpload } from 'react-icons/md';
import PropTypes from 'prop-types';
import Loader from '../Loader';
import { updateUserPic, getAllUserPics } from '../../store/user';
import { createImageURL, getUserData } from '../../util';
import { PENDING, DONE, FAIL } from '../../constants';
import './style.css';

const OLD_IMAGE_TAB = 'old';
const NEW_IMAGE_TAB = 'new';

const ProfileImgForm = ({ userID, closeForm }) => {
  const isMounted = useRef(true);
  useEffect(() => () => { isMounted.current = false; }, []);

  const dispatch = useDispatch();
  const allImages = useSelector(getUserData(userID, 'image', 'all'));
  useEffect(() => {
    dispatch(getAllUserPics(userID));
  }, [dispatch, userID]);

  const [activeTab, setActiveTab] = useState(NEW_IMAGE_TAB);
  const [newImageURL, setNewImageURL] = useState('');
  useEffect(() => () => {
    if (newImageURL) {
      URL.revokeObjectURL(newImageURL);
    }
  }, [newImageURL]);

  const [updateStatus, setUpdateStatus] = useState('');
  useEffect(() => {
    if (updateStatus === DONE) {
      closeForm();
    }
  }, [closeForm, updateStatus]);

  const [updateError, setUpdateError] = useState('');

  const changeUserImage = useCallback(async (oldImageName, newImageFile) => {
    try {
      setUpdateStatus(PENDING);
      await dispatch(updateUserPic(oldImageName, newImageFile));
      if (!isMounted.current) return;
      setUpdateStatus(DONE);
    } catch (error) {
      if (!isMounted.current) return;
      setUpdateStatus(FAIL);
      setUpdateError(error.toString());
    }
  }, [dispatch]);

  const formHandler = useFormik({
    initialValues: {
      newImageFile: null,
    },
    validate: (values) => {
      const { newImageFile } = values;
      if (!newImageFile) {
        setUpdateStatus(FAIL);
        setUpdateError("You haven't upload an image file yet!");
        return 'error';
      }
      return null;
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const { newImageFile } = values;
      await changeUserImage('', newImageFile);
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

  const imageFileRef = useRef();
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
    <Tabs
      activeKey={activeTab}
      onSelect={handleChangeTab}
      className="justify-content-center"
    >
      <Tab eventKey={NEW_IMAGE_TAB} title="Upload new pic">
        <div className="user-pic-preview text-center">
          <h2 className="center-vert-hor text-muted">Preview</h2>
          <Image fluid src={newImageURL} />
        </div>
        <Form
          className="cover-all"
          encType="multipart/form-data"
          onSubmit={formHandler.handleSubmit}
        >
          <Form.Group controlId="newImageFile" className="text-center">
            <Form.Control
              name="newImageFile"
              type="file"
              accept="image/*"
              ref={imageFileRef}
              onChange={handleUploadImage}
              className="user-pic-upload"
            />
          </Form.Group>
          <Form.Group>
            {
              updateStatus === FAIL && updateError
                ? <Alert variant="danger">{updateError}</Alert> : null
            }
          </Form.Group>
          <Form.Group className="text-center">
            <Button variant="outline-primary" type="submit" disabled={formHandler.isSubmitting}>
              <MdCloudUpload />
              {' '}
              {' '}
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Tab>
      <Tab
        eventKey={OLD_IMAGE_TAB}
        title="Choose old pic"
        disabled={!allImages || allImages.length === 0}
      >
        <div className="user-old-pics-select">
          {
              updateStatus === PENDING ? (
                <div className="cover-all loading-overlay"><Loader /></div>
              ) : null
            }
          {
              allImages && allImages.map((imageName) => (
                <button
                  type="button"
                  className="hidden-btn option"
                  onClick={() => changeUserImage(imageName, null)}
                >
                  <Image fluid src={createImageURL(imageName)} />
                </button>
              ))
            }
        </div>
      </Tab>
    </Tabs>
  );
};

export default ProfileImgForm;

ProfileImgForm.propTypes = {
  closeForm: PropTypes.func.isRequired,
  userID: PropTypes.string.isRequired,
};
