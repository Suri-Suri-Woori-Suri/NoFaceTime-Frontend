import React from 'react';

import SmallSuccessButton from '../SmallSuccessButton/SmallSuccessButton';
import styles from './RoomContent.module.css';

import { deleteRoom } from '../../api/index';

const RoomContent = ({ currentUser, setCurrentUser, setShowModal }) => {
  const popupModal = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  const fetch = async (roomId) => {
    const data = await deleteRoom(currentUser._id, roomId);
    setCurrentUser({ ...currentUser, rooms: data.rooms });
  };

  const copyRoomInvitationLink = (e) => {
    const linkText = document.createElement('textarea');
    linkText.value = e.target.value;

    e.target.appendChild(linkText);
    linkText.focus();
    linkText.select();

    const isSuccessToCopy = document.execCommand('copy');

    if (isSuccessToCopy) {
      alert('Invitation Link Copy!');
    } else {
      alert('Copy Failure');
    }

    e.target.removeChild(linkText);
  };


  const roomList = currentUser.rooms ? currentUser.rooms.map(room => {
    const roomId = room._id;
    return (
      <div className={styles.Room} key={roomId}>{room.name}
        <SmallSuccessButton
          buttonName="Link Copy"
          link={room.link}
          clickEventFunction={copyRoomInvitationLink}
        />
        <button className={styles.removeRoomButton} onClick={() => fetch(roomId)}>Delete</button>
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
