import React, { useEffect, useRef } from 'react';
import styles from './PeerVideo.module.css';

const PeerVideo = ({ peer }) => {
  const ref = useRef();

  useEffect(() => {
    peer.on("stream", stream => {
      ref.current.srcObject = stream;
    });
  }, []);

  return (
    <video
      className={styles.PeerVideo}
      ref={ref}
      autoPlay
      playsInline />
  );
};

export default PeerVideo;
