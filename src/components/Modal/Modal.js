import React, { useState, useEffect } from 'react';
import styles from './Modal.module.css';
import { createRoom } from '../../api/index';

const Modal = ({ currentUser, setShowModal, roomName, children }) => {
  const [isFetched, setIsFetched] = useState(false);
  console.log("isFetched?", isFetched);
  const closeModal = () => {
    setShowModal(false);
  };

  const toggle = () => {
    setIsFetched(!isFetched);
  };

  useEffect(() => {
    if (!isFetched) return;
    createRoom(currentUser, roomName);
    toggle();
  }, [isFetched]);

  return (
    <div className={styles.Modal}>
      <div className={styles.ModalContent}>
        {children}
        <div>
          <button className={`${styles.Button} ${styles.CloseModalButton}`} onClick={closeModal}>Cancel</button>
          <button className={`${styles.Button} ${styles.CreateButton}`} onClick={toggle}>Create</button>
        </div>
      </div>
    </div>
  );

};

export default Modal;