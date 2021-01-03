import React, { useEffect, useState, useRef } from 'react';
import styles from './PeerVideo.module.css';

const PeerVideo = ({ faceapi, peer, analyzeFace }) => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) return;
    const useInterval = setInterval(analyzeFace, 5000);

    return (() => {
      clearInterval(useInterval);
      setInitialized(false);
    });
  }, [initialized]);

  useEffect(() => {
    peer.peer.on("stream", stream => {
      videoRef.current.srcObject = stream;
    });
  }, []);

  return (
    <div className={styles.PeerVideoWrapper}>
      <video
        className={styles.PeerVideo}
        ref={videoRef}
        autoPlay
        playsInline
        onPlay={() => setInitialized(true)}
      />
      <canvas
        className={styles.Canvas}
        ref={canvasRef}
      />
    </div>
  );
};

export default PeerVideo;
