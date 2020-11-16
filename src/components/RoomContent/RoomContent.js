import React, { useState, useEffect } from 'react';
import styles from './RoomContent.module.css';
import { deleteRoom } from '../../api/index';

const RoomContent = ({ currentUser, setCurrentUser, setShowModal }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const popupModal = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  useEffect(() => {
    if (!selectedRoom) return;

    const fetchData = async () => {
      const roomsData = await deleteRoom(currentUser._id, selectedRoom);
      console.log("$$$$$$$", roomsData);
      setCurrentUser({ ...currentUser, rooms: roomsData });
    };
    fetchData();
    setSelectedRoom(null);
  }, [selectedRoom]);

  const roomList = currentUser.rooms ? currentUser.rooms.map(room => {
    const roomId = room._id;
    return (
      <div className={styles.Room} key={roomId}>{room.name}
        <button className={styles.removeRoomButton} onClick={() => setSelectedRoom(roomId)}>Delete</button>
      </div>
    );
  }) : undefined;

  return (
    <div className={styles.Content}>
      <div className={styles.Rooms}>
        <label className={styles.Title}>Your Room</label>
        {roomList}
      </div>
      <button className={styles.AddRoomButton} onClick={popupModal}>Add Room</button>
    </div>
  );
};

export default RoomContent;
