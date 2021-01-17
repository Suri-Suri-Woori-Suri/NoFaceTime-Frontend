import React from 'react';
import styles from './MyVideo.module.css';
import { BACKGROUND_IMG } from '../../constants';

const MyVideo = ({
  isHost,
  videoRef,
  canvasRef,
  isMuted
}) => {
  return (
    <div className={styles.Wrapper}>
      <video
        className={isHost ? styles.Host : styles.Peer}
        ref={videoRef}
        muted={isMuted}
        width={500}
        height={375}
        poster={BACKGROUND_IMG.LOADING}
        autoPlay
        playsInline
        data-testid='video'
      />
      <canvas
        ref={canvasRef}
        className={styles.Canvas}
        width={500}
        height={375} />
    </div>
  );
};

export default MyVideo;
