import React from 'react';
import PeerVideo from '../PeerVideo/PeerVideo';
import styles from './PeerVideoWrapper.module.css';

const PeerVideoWrapper = ({
  members,
  peersVideoRef,
  userId,
  mySocketId,
  hostSocketId,
  currentVideoRoomId,
  setIntervalName,
}) => {
  return (
    members.map((member, index) => {
      if (member.userId !== userId && member.socketId !== mySocketId && member.socketId !== hostSocketId && member.roomId === currentVideoRoomId) {
        const peer = peersVideoRef.current[member.socketId];

        return (
          <PeerVideo
            key={index}
            className={styles.PeerVideo}
            peer={peer}
            setIntervalName={setIntervalName} />
        );
      }
      return null;
    })
  );
};

export default PeerVideoWrapper;
