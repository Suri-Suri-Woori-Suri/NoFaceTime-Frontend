import React from 'react';
import styles from './MyVideo.module.css';

const MyVideo = ({
  isHost,
  videoRef,
  canvasRef,
  audioMuted,
  handleVideoPlay,
  isJoinedRoom
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

  if (isJoinedRoom) {
    return <>
      <div className={styles.PeerWrapper}>
        <video
          className={styles.Peer}
          ref={videoRef}
          onPlay={handleVideoPlay}
          playsInline
          autoPlay />
        <canvas
          className={styles.Canvas}
          ref={canvasRef}
        />
      </div>
    </>
  }

  return (
    <video
      className={styles.Peer}
      ref={videoRef}
      onPlay={handleVideoPlay}
      playsInline
      autoPlay />
  );
};

export default MyVideo;
