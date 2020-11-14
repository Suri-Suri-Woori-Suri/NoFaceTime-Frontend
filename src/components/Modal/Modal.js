import React from 'react';
import styles from './Modal.module.css';
import { API_METHOD } from '../../constants';

const Modal = ({ setShowModal, roomName, children }) => {
  const { POST } = API_METHOD;
  console.log(roomName)

  const closeModal = (event) => {
    event.preventDefault();
    setShowModal(false);
  };

  const createRoom = async () => {
    if (roomName.length === 0) return;

    const response = await fetch('http://localhost:5000/rooms', {
      method: POST,
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ roomName })
    });

    console.log(response);
  };

  return (
    <div className={styles.Modal}>
      <div className={styles.ModalContent}>
        {children}
        <div>
          <button className={`${styles.Button} ${styles.CloseModalButton}`} onClick={closeModal}>Cancel</button>
          <button className={`${styles.Button} ${styles.CreateButton}`} onClick={createRoom}>Create</button>
        </div>
      </div>
    </div>
  );

};

export default Modal;