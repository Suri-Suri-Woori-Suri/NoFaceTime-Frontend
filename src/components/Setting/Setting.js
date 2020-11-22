import React, { useState, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import Canvas from '../Canvas/Canvas';
import styles from './Setting.module.css';
import CompleteButton from '../CompleteButton/CompleteButton';

const Setting = ({ location, setJoinedRoom }) => {
  //const ROOM_ID = location.pathname.split('/').pop();//'/room/여기'
  const videoHeight = 500;
  const videoWidth = 500;
  const videoRef = useRef();
  //const canvasRef = useRef();
  const [initialized, setinitialized] = useState(false);

  console.log(process.env.PUBLIC_URL)// empty

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + '/faceApiModels';

      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
      ]);
      startVideo();
    }
    loadModels();
  }, []);

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      videoRef.current.srcObject = stream;
      setinitialized(true);
    }
    catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.Setting}>
      <div>Video 니 얼굴..</div>
      <div className={styles.Video}>
        <video ref={videoRef} autoPlay muted height={videoHeight} width={videoWidth} onPlay={console.log('handleVideoPlay')} />
        {/* import Canvas */}
      </div>
      <CompleteButton buttonName='Join' onClick={() => setJoinedRoom(true)}/>
    </div>
  );
}

export default Setting;
