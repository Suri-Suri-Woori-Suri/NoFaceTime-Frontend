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
    <div className={styles.PeerWrapper}>
      <video
        className={styles.Peer}
        ref={videoRef}
        onPlay={handleVideoPlay}
        autoPlay />
      <canvas
        className={styles.Canvas}
        ref={canvasRef}
      />
    </div>
  );
};

export default MyVideo;
