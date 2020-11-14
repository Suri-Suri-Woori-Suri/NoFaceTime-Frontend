import React, { useState } from 'react';
import styles from './Room.module.css';
import Sidebar from '../Sidebar/Sidebar';
import ContentWrap from '../ContentWrap/ContentWrap';
import Modal from '../Modal/Modal';

const Room = ({ currentUser, setCurrentUser }) => {
  console.log('Room, currentUser', currentUser);
  const [showModal, setShowModal] = useState(false);
  const [roomName, setRoomName] = useState('');

  const onChange = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setRoomName(value);
  };

  const modalContent = (
    <div className={styles.ModalContent}>
      <div className={styles.ModalTitle}>Create your room</div>
      <input
        className={styles.RoomNameInput}
        type='text'
        placeholder='Enter room name'
        onChange={onChange}>
      </input>
    </div>
  );

  return (
    <div className={styles.Body}>
      {showModal && <Modal currentUser={currentUser} setCurrentUser={setCurrentUser} setShowModal={setShowModal} roomName={roomName}>{modalContent}</Modal>}
      <Sidebar />
      <ContentWrap currentUser={currentUser} setShowModal={setShowModal} />
    </div>
  );
};

export default Room;
