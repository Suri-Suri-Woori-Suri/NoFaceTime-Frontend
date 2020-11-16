import React, { useState } from 'react';
import styles from './Room.module.css';
import Sidebar from '../Sidebar/Sidebar';
import Modal from '../Modal/Modal';
import RoomContent from '../RoomContent/RoomContent';

import { createRoom } from '../../api';

const Room = ({ currentUser, setCurrentUser }) => {
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

  const fetchToCreateRoom = () => createRoom(currentUser, roomName);

  return (
    <div className={styles.Body}>
      {showModal &&
        <Modal
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          setShowModal={setShowModal}
          fetchFunction={fetchToCreateRoom}
        >{modalContent}
        </Modal>}
      <Sidebar />
      <div className={styles.ContentWrap}>
        <h1 className={styles.Title}>Welcome!</h1>
        <RoomContent
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          setShowModal={setShowModal} />
      </div>
    </div>
  );
};

export default Room;
