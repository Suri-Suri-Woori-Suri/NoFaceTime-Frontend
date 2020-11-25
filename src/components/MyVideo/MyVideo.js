import React from 'react';

import { MY_VIDEO_MODE } from '../../constants/index';
import styles from './MyVideo.module.css';

const MyVideo = ({
  mode,
  videoRef,
  startDetectionOnCanvas
}) => {
  const { HOST } = MY_VIDEO_MODE;

  switch (mode) {
    case HOST:
      return (
        <video
          className={styles.Host}
          ref={videoRef}
          onPlay={startDetectionOnCanvas}
          autoPlay /> //videoRef => user's
      );

    default:
      return (
        <video
          className={styles.Peer}
          ref={videoRef}
          onPlay={startDetectionOnCanvas}
          autoPlay /> //videoRef => user's
      );
  }
};

export default MyVideo;
