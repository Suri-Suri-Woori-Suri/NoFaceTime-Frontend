import React from 'react';
import styles from './MyVideo.module.css';

const MyVideo = ({
  isHost,
  videoRef,
  canvasRef,
  audioMuted,
  handleVideoPlay
}) => {

  if (isHost) {
    console.log("AUDIOMUTED", audioMuted, audioMuted.toString());
    return (
      <video
        className={styles.Host}
        ref={videoRef}
        muted={audioMuted}
        onPlay={handleVideoPlay}
        autoPlay
        data-testid='video' />
    );
  }

  return (
    <video
      className={styles.Peer}
      ref={videoRef}
      onPlay={handleVideoPlay}
      autoPlay
      data-testid='video' />
  );
};

export default MyVideo;
