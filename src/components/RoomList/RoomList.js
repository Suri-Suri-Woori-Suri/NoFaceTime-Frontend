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
    Array.isArray(currentUser.rooms)
      ? currentUser.rooms.map((room) => {
        return (
          <div
            key={room._id}
            className={styles.RoomEntry}
            onClick={(e) => enterRoom(e, room.link)}>
            <div className={styles.RoomName}>
              {room.name}
            </div>
            <div className={styles.Buttons}>
              <SmallLinkCopyButton
                buttonName="Room Link Copy"
                link={room.link}
                clickEventFunction={(e) => copyRoomInvitationLink(e)} />
              <CancelButton
                buttonName="Delete"
                onClick={() => fetchToDeleteRoomData(room._id)} />
            </div>
          </div>
        );
      })
      : <>{currentUser.rooms}</>
  );
};

export default RoomList;
