import React from 'react';

import { MY_VIDEO_MODE } from '../../constants/index';
import styles from './MyVideo.module.css';

const MyVideo = ({
  mode,
  MyVideo,
  isHost,
  videoRef,
  audioMuted,
  handleVideoPlay,
  // canvasRef
  // startDetectionOnCanvas
}) => {
  const { HOST } = MY_VIDEO_MODE;
  console.log('MY VIDEO');

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

  return <video
    className={styles.Peer}
    ref={videoRef}
    // onPlay={() => handleVideoPlay(videoRef)}
    // onPlay={startDetectionOnCanvas}
    autoPlay />
};

export default MyVideo;
