import React from 'react';

import RoomList from '../RoomList/RoomList';
import styles from './Room.module.css';

const Room = ({
  currentUser,
  enterRoom,
  popupModal,
  fetchToDeleteRoomData
}) => {

  return (
    <div className={styles.Content}>
      <div className={styles.Title}>Your Room</div>
      <div className={styles.Rooms}>
        <RoomList
          currentUser={currentUser}
          enterRoom={enterRoom}
          fetchToDeleteRoomData={fetchToDeleteRoomData}
        />
      </div>
      <button
        className={styles.AddRoomButton}
        onClick={popupModal}>
        Add Room
      </button>
    </div>
  );
};

export default Room;
