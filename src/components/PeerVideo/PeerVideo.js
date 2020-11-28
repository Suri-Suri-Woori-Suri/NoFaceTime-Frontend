import React, { useEffect, useRef } from 'react';
import styles from './PeerVideo.module.css';

const PeerVideo = ({ peer, handleVideoPlay }) => {
  const videoRef = useRef();//studentVideoRef
  //const canvasRef = useRef();

  useEffect(() => {
    peer.peer.on("stream", stream => {
      videoRef.current.srcObject = stream;
    });
  }, []);

  return (
    <>
      <video
        className={styles.PeerVideo}
        ref={videoRef}
        autoPlay
        playsInline
      // onPlay={handleVideoPlay}
      />
    </>
  );
};

export default PeerVideo;
