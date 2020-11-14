import React, { useState, useEffect } from 'react';
import styles from './Modal.module.css';
import { createRoom } from '../../api/index';

const Modal = ({ currentUser, setCurrentUser, setShowModal, roomName, children }) => {
  const [isFetched, setIsFetched] = useState(false);
  console.log("isFetched?", isFetched);
  console.log('currentUser', currentUser);
  const closeModal = () => {
    setShowModal(false);
  };

  const toggle = () => {
    setIsFetched(!isFetched);
  };

  useEffect(() => {
    if (!isFetched) return;
    //createRoom(currentUser, roomName);
    const mockData = [
      { id: 1, name: 'name1'},
      { id: 2, name: 'name2'},
      { id: 3, name: 'name3'},
      { id: 4, name: 'name4'}
    ];
    setCurrentUser({...currentUser, rooms: mockData});
    toggle();
    closeModal();
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