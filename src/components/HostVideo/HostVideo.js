import React, { useEffect, useRef } from 'react';
import styles from './HostVideo.module.css';

const HostVideo = ({
  peers,
  startDetectionOnCanvas
}) => {
  console.log("HOST VIDEO 내 peer", peers);

  const ref = useRef();

  useEffect(() => {
    peers[0].peer.on("stream", stream => {
      ref.current.srcObject = stream;
    });
  }, []);

  return (
    <video
      className={styles.HostVideo}
      ref={ref}
      onPlay={startDetectionOnCanvas}
      autoPlay
    />
  );
};

export default HostVideo;
