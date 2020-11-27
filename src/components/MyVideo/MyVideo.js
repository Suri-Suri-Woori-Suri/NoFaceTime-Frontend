import React from 'react';
import styles from './MyVideo.module.css';

const MyVideo = ({
  isHost,
  videoRef,
  audioMuted,
  handleVideoPlay
}) => {
  if (isHost) {
    return (
      <video
        className={styles.Host}
        ref={videoRef}
        mute={audioMuted.toString()}
        onPlay={handleVideoPlay}
        autoPlay />
    );
  }

  return (
    <video
      className={styles.Peer}
      ref={videoRef}
      onPlay={handleVideoPlay}
      autoPlay />
  );
};

export default MyVideo;
