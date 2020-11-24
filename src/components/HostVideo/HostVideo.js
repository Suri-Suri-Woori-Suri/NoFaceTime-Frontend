import React, { useEffect, useRef } from 'react';
import styles from './HostVideo.module.css';

const HostVideo = ({ peer }) => {
  const videoWidth = 700;
  const videoHeight = 500;

  const ref = useRef();
  console.log("IN HOST VIDEO", peer);
  useEffect(() => {
    peer[0].peer.on("stream", stream => {
      ref.current.srcObject = stream;
    });
  }, []);

  return (
    <video
      id={styles.MyVideo}
      ref={ref} autoPlay
      muted
      height={videoHeight}
      width={videoWidth}
      onPlay={console.log('handleVideoPlay')}
    />
  );
};

export default HostVideo;
