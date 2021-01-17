import React, { useEffect, useRef } from 'react';
import styles from './HostVideo.module.css';
import { analyzeFacialExpression } from '../../utils/face-api';
import { BACKGROUND_IMG } from '../../constants';

const HostVideo = ({ host, setIntervalName }) => {
  const videoRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    if (!host) return;

    host.on('stream', stream => {
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

      videoRef.current.srcObject = stream;
      analyzeFacialExpression(canvas, video, setIntervalName);
    });
  }, [host]);

  return (
    <div className={styles.Wrapper}>
      <video
        ref={videoRef}
        className={styles.Video}
        poster={BACKGROUND_IMG.WAITING_HOST}
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

export default HostVideo;
