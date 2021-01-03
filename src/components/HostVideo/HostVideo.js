import React, { useEffect, useRef } from 'react';
import styles from './HostVideo.module.css';

const HostVideo = ({
  peers,
  hostId,
  handleVideoPlay
}) => {
  const ref = useRef();

  useEffect(() => {
    const host = peers.find(peer => peer.peerId === hostId);

    if (!host) alert('호스트가 입장하지 않았습니다.');

    host.peer.on("stream", stream => {
      ref.current.srcObject = stream;
    });
  }, []);

  return (
    <video
      className={styles.HostVideo}
      ref={ref}
      onPlay={handleVideoPlay}
      autoPlay
    />
  );
};

export default HostVideo;
