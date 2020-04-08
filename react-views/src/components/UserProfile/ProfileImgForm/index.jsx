import React, {
  useState, useCallback, useEffect, useRef,
} from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import Alert from 'react-bootstrap/Alert';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { MdCloudUpload } from 'react-icons/md';
import PropTypes from 'prop-types';
import { updateUserPic } from '../../../store/user';
import { createImageURL } from '../../../util';
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

  const onChooseOldImage = useCallback((imageName, isChosen) => {
    if (isChosen) {
      formHandler.setFieldValue('oldImageName', imageName);
      return;
    }
    formHandler.setFieldValue('oldImageName', '');
  }, [formHandler]);

  return (
    <Form
      className="cover-all"
      encType="multipart/form-data"
      onSubmit={formHandler.handleSubmit}
    >
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
        </Tab>
        <Tab
          eventKey={OLD_IMAGE_TAB}
          title="Choose old pic"
          disabled={allImages.length === 0}
        >
          <Form.Group style={{ marginTop: '20px' }}>
            {
              allImages.map((imageName) => (
                <Card
                  key={imageName}
                  style={{ maxWidth: '100px', display: 'inline-block' }}
                  className={
                    formHandler.values.oldImageName === imageName ? 'user-old-pic-chosen' : ''
                  }
                >
                  <input
                    type="checkbox"
                    className="user-old-pic-checkbox"
                    value={formHandler.values.oldImageName === imageName}
                    onChange={(e) => onChooseOldImage(imageName, e.target.value)}
                  />
                  <Image fluid src={createImageURL(imageName)} />
                </Card>
              ))
            }
          </Form.Group>
        </Tab>
      </Tabs>
      <Form.Group>
        {
          !updateStatus && updateError
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
  );
};

export default ProfileImgForm;

ProfileImgForm.propTypes = {
  allImages: PropTypes.arrayOf(PropTypes.string),
};

ProfileImgForm.defaultProps = {
  allImages: [],
};
