import React, { useState, useEffect } from 'react';
import styles from './RoomContent.module.css';
//import { deleteRoom } from '../../api/index';

const RoomContent = ({ currentUser, setShowModal }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  console.log(selectedRoom);

  const popupModal = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  // 나중에 api/index에서 import 할 함수

  // const deleteRoom = async(roomId, currentUser) => {
  //   const response = await fetch(`http://localhost:5000/rooms/${roomId}`, {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     credentials: 'include',
  //     body: JSON.stringify({ currentUser })
  //   });

  //   console.log(response);
  // };

  useEffect(() => {
    if (!selectedRoom) return;

    console.log('deleteRoom!!!!');
    //deleteRoom(selectedRoom, currentUser);
    //setCurrentUser({...currentUser, rooms: mockData});
    setSelectedRoom(null);
  }, [selectedRoom]);

  const roomList = currentUser.rooms ? currentUser.rooms.map(room => {
    const roomId = room.id;

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
        <div className={styles.Room}>방 이름
          <button className={styles.removeRoomButton} >Delete</button>
        </div>
        <div className={styles.Room}>방 이름
          <button className={styles.removeRoomButton} >Delete</button>
        </div>
        {roomList}
      </div>
      <button className={styles.AddRoomButton} onClick={popupModal}>Add Room</button>
    </div>
  );
};

export default RoomContent;
