import React, { 
  useMemo, useEffect, useCallback, useState, Fragment 
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-bootstrap/Toast';
import Modal from 'react-bootstrap/Modal';
import Media from 'react-bootstrap/Media';
import {
  IoIosInformationCircleOutline as InfoIcon,
} from 'react-icons/io';
import { FaEllipsisH } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { removePopup, clearAllPopups } from '../../store/ui/popups';
import './style.css';

const MAX_DISPLAY_AMOUNT = 3;

const PopupOverflow = ({ onOpenNotiModal }) => (
  <button className="hidden-btn" onClick={onOpenNotiModal}> 
    <Toast>
      <Toast.Header closeButton={false}>
        <FaEllipsisH className="mr-2" />
        <strong className="mr-auto">Show more</strong>
      </Toast.Header>
    </Toast>
  </button>
);

PopupOverflow.propTypes = {
  onOpenNotiModal: PropTypes.func.isRequired
}

const Popups = () => {
  const dispatch = useDispatch();
  useEffect(() => () => {
    dispatch(clearAllPopups());
  }, [dispatch]);
  const popupEntries = useSelector((state) => state.ui.popups);
  const popupArray = useMemo(
    () => Object.entries(popupEntries).reverse(),
    [popupEntries],
  );
  const handleClosePopup = useCallback((popupKey) => {
    dispatch(removePopup(popupKey));
  }, [dispatch]);

  const [showNotiModal, setShowNotiModal] = useState(false);
  const handleOpenNotiModal = useCallback(() => setShowNotiModal(true), []);
  const handleCloseNotiModal = useCallback(() => {
    setShowNotiModal(false);
    dispatch(clearAllPopups());
  } , [dispatch]);
  return (
    <>
      <div className="popups-container">
        {
          popupArray.map(
            ([key, { title, message }], index) => {
              if(index < MAX_DISPLAY_AMOUNT){
                return (
                  <Toast key={key} onClose={() => handleClosePopup(key)} delay={1440} autohide>
                    <Toast.Header>
                      <InfoIcon className="mr-2" />
                      <strong className="mr-auto">{title}</strong>
                      <small>Just now</small>
                    </Toast.Header>
                    <Toast.Body>{message}</Toast.Body>
                  </Toast>
                );
              }
              if(index === MAX_DISPLAY_AMOUNT){
                return <PopupOverflow key={key} onOpenNotiModal={handleOpenNotiModal}/>
              }
              return null;
            }
          )
        }
      </div>
      <Modal show={showNotiModal} onHide={handleCloseNotiModal}>
        <Modal.Header closeButton>
          <Modal.Title>All your alerts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            popupArray.map(([key, { title, message }])=>(
              <Fragment key={key}>
               <Media>
                  <InfoIcon style={{ fontSize: '40px' }}/>
                  <Media.Body>
                    <h6>{title}</h6>
                    <p>{message}</p>
                  </Media.Body>
                </Media>
                <hr style={{ width: '100%' }}/>
              </Fragment>
            ))
          }
          
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Popups;
