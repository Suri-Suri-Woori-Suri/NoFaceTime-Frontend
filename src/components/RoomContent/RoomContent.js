import React from 'react';

import SmallLinkCopyButton from '../SmallLinkCopyButton/SmallLinkCopyButton';
import CancelButton from '../CancelButton/CancelButton';
import styles from './RoomContent.module.css';

import { deleteRoom } from '../../api/index';

const RoomContent = ({ currentUser, setCurrentUser, setShowModal }) => {
  const popupModal = (event) => {
    event.preventDefault();
    setShowModal(true);
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

  const fetchToDeleteRoomData = async (roomId) => {
    const data = await deleteRoom(currentUser._id, roomId);
    setCurrentUser({ ...currentUser, rooms: data.rooms });
  };

  const roomList = currentUser.rooms ? currentUser.rooms.map(room => {
    const roomId = room._id;
    return (
      <div className={styles.RoomEntry} key={roomId}>
        <div className={styles.RoomName}>
          {room.name}
        </div>
        <div className={styles.Buttons}>
          <SmallLinkCopyButton
            buttonName="Link Copy"
            link={room.link}
            clickEventFunction={copyRoomInvitationLink}
          />
          <CancelButton
            buttonName="Delete"
            onClick={() => fetchToDeleteRoomData(roomId)}
          />
        </div>
      </div>
    );
  }) : undefined;

  return (
    <div className={styles.Content}>
      <div className={styles.Title}>Your Room</div>
      <div className={styles.Rooms}>
        {roomList}
      </div>
      <button
        className={styles.AddRoomButton}
        onClick={popupModal}>
        Add Room
      </button>
    </div>
  );
};

export default RoomContent;
