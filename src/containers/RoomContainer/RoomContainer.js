import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import ModalContainer from '../ModalContainer/ModalContainer';
import Sidebar from '../../components/Sidebar/Sidebar';
import Room from '../../components/Room/Room';

import { createRoom, deleteRoom } from '../../api';
import styles from './RoomContainer.module.css';

const RoomContainer = ({
  currentUser,
  addRooms,
  deleteRooms
}) => {
  const [showModal, setShowModal] = useState(false);
  const [roomName, setRoomName] = useState('');
  let history = useHistory();

  const setInputValue = (event) => {
    const { value } = event.target;
    setRoomName(value);
  };

  const fetchToCreateRoom = () => createRoom(currentUser, roomName);

  const modalContent = (
    <div className={styles.ModalContent}>
      <div className={styles.ModalTitle}>Create your room</div>
      <input
        className={styles.RoomNameInput}
        type='text'
        placeholder='Enter room name'
        onChange={(e) => setInputValue(e)}>
      </input>
    </div>
  );

  const enterRoom = (event, roomLink) => {
    if (event.target.tagName !== 'BUTTON') {
      const sliceIndex = roomLink.indexOf('/rooms');
      const roomIdURL = roomLink.slice(sliceIndex);

      history.push(roomIdURL);
    }
  };

  const fetchToDeleteRoomData = async (roomId) => {
    deleteRooms(roomId);
    await deleteRoom(currentUser._id, roomId);
  };

  const popupModal = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  return (
    <>
      <div className={styles.Body}>
        <Sidebar />
        <div className={styles.ContentWrap}>
          <h1 className={styles.Title}> Welcome! </h1>
          <Room
            currentUser={currentUser}
            enterRoom={enterRoom}
            popupModal={popupModal}
            fetchToDeleteRoomData={fetchToDeleteRoomData}
          />
          {
            showModal &&
            <ModalContainer
              currentUser={currentUser}
              addAndUpdateUserState={addRooms}
              setShowModal={setShowModal}
              fetchToCreate={fetchToCreateRoom}>
              {modalContent}
            </ModalContainer>
          }
        </div>
      </div>
    </>
  );
};

export default RoomContainer;
