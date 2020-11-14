import React from 'react';
import styles from './RoomContent.module.css';

const RoomContent = ({ setShowModal }) => {
  const popupModal = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  return (
    <div className={styles.RoomContent}>
      <div className={styles.Rooms}>
          <label className={styles.Title}>Your Room</label>
          <div className={styles.RoomName}>방 이름</div>
          <div className={styles.RoomName}>방 이름</div>
          <div className={styles.RoomName}>방 이름</div>
          <div className={styles.RoomName}>방 이름</div>
          <div className={styles.RoomName}>방 이름</div>
          <div className={styles.RoomName}>방 이름</div>
          <div className={styles.RoomName}>방 이름</div>
      </div>
      <button className={styles.AddRoomButton} onClick={popupModal}>Add Room</button>
    </div>
  );
};

export default RoomContent;
