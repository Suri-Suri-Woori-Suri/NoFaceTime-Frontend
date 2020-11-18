import React from 'react';

import CancelButton from '../CancelButton/CancelButton';
import SmallLinkCopyButton from '../SmallLinkCopyButton/SmallLinkCopyButton';

import { copyRoomInvitationLink } from '../../utils/index';
import styles from './RoomList.module.css';

const RoomList = ({
  currentUser,
  enterRoom,
  fetchToDeleteRoomData
}) => {
  return (
    currentUser.rooms
      ? currentUser.rooms.map((room) => {
        console.log("ROOMROOM", room);
        return (
          <div
            className={styles.RoomEntry}
            key={room._Id}
            onClick={(e) => enterRoom(e, room.link)}>
            <div className={styles.RoomName}>
              {room.name}
            </div>
            <div className={styles.Buttons}>
              <SmallLinkCopyButton
                buttonName="Link Copy"
                link={room.link}
                clickEventFunction={(e) => copyRoomInvitationLink(e)} />
              <CancelButton
                buttonName="Delete"
                onClick={() => fetchToDeleteRoomData(room._id)} />
            </div>
          </div>
        );
      })
      : <></>
  );
};

export default RoomList;
