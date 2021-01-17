import React, { useEffect, useRef } from 'react';
import styles from './PeerVideo.module.css';
import { analyzeFacialExpression } from '../../utils/face-api';
import { BACKGROUND_IMG } from '../../constants';

const PeerVideo = ({ peer, setIntervalName }) => {
  const videoRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    if (!peer) return;

    peer.on('stream', stream => {
      const canvas = {
        canvasRef,
        width: canvasRef.current.width,
        height: canvasRef.current.height,
      };

      const video = {
        videoRef,
        width: videoRef.current.width,
        height: videoRef.current.height
      };

      analyzeFacialExpression(canvas, video, setIntervalName);
      videoRef.current.srcObject = stream;
    });
  }, [peer]);

  return (
    <div className={styles.Wrapper}>
      <video
        ref={videoRef}
        className={styles.Video}
        poster={BACKGROUND_IMG.WAITING_MEMBER}
        autoPlay
        playsInline
        width={500}
        height={375}
      />
      <canvas
        ref={canvasRef}
        className={styles.Canvas}
        width={500}
        height={375}>
      </canvas>
    </div>
  );
};

export default PeerVideo;
