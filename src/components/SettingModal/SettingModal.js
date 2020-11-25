import React, { useState, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

import Canvas from '../Canvas/Canvas';
import HostVideo from '../HostVideo/HostVideo';
import FaceDetectionCanvas from '../FaceDetectionCanvas/FaceDetectionCanvas';
import CompleteButton from '../CompleteButton/CompleteButton';
import styles from './SettingModal.module.css';

const SettingModal = ({
  isMuted,
  setIsMuted,
  setIsJoinedRoom
}) => {
  const [initializing, setInitializing] = useState(false);
  const [isStartCanvas, setIsStartCanvas] = useState(false);

  const videoRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + '/faceApiModels'; //process.env.PUBLIC_URL +

      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
      ]).then(startVideo(isMuted));
    };
    loadModels();
  }, []);

  const startVideo = async () => {
    try {
      const media = await navigator.mediaDevices.getUserMedia({ audio: !isMuted, video: true });
      videoRef.current.srcObject = media;
      //setIsStartCanvas(true);
    }
    catch (err) {
      console.error(err);
    }

  };


  return (
    <div className={styles.SettingModalBackground}>
      <div className={styles.SettingModal}>
        <div className={styles.VideoWrapper}>
          <video
            className={styles.MyVideo}
            ref={videoRef}
            // onPlay={han}
            autoPlay />
          {
            isStartCanvas
            &&
            // <Canvas
            //   videoRef={videoRef}
            //   canvasRef={canvasRef}
            //   startVideo={startVideo} />
            <FaceDetectionCanvas />
          }
          {/* <canvas
            className={styles.MyVideo}
            ref={canvasRef} /> */}
        </div>
        <div className={styles.Mute}>
          <label>
            <input
              type="checkbox"
              onChange={() => setIsMuted(!isMuted)} />
            Mute
          </label>
        </div>
        <CompleteButton buttonName='Join' onClick={() => setIsJoinedRoom(true)} />
      </div>
    </div>
  );


};

export default SettingModal;
