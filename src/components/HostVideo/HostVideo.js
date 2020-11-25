import React, { useEffect, useRef } from 'react';
import styles from './HostVideo.module.css';

const HostVideo = ({
  peers,
  hostId
  // startDetectionOnCanvas
}) => {
  console.log("HOST VIDEO 내 peer", peers);
  console.log("HOST VIDEO 내 peer", hostId);

  const ref = useRef();

  useEffect(() => {

    const host = peers.find(peer => peer.peerId === hostId);

    host.peer.on("stream", stream => {
      ref.current.srcObject = stream;
    });
  }, []);

  return (
    <video
      className={styles.HostVideo}
      ref={ref}
      onPlay={console.log('startDetectionOnVancas')}
      autoPlay
    />
  );
};

export default HostVideo;
