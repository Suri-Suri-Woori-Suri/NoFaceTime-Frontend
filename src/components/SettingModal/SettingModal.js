import React, { useState, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

import Canvas from '../Canvas/Canvas';
import CompleteButton from '../CompleteButton/CompleteButton';
import styles from './SettingModal.module.css';

const SettingModal = ({
  location,
  setIsJoinedRoom
}) => {
  //const ROOM_ID = location.pathname.split('/').pop();//'/room/여기'
  const videoHeight = 500;
  const videoWidth = 500;
  const videoRef = useRef();
  //const canvasRef = useRef();
  const [initialized, setInitialized] = useState(false);

  console.log(process.env.PUBLIC_URL);// empty

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
    };
    loadModels();
  }, []);

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      videoRef.current.srcObject = stream;
      setInitialized(true);
    }
    catch (err) {
      console.log(err);
    }
  };

  console.log("checkbox");
  const [checked, setChecked] = useState(true);

  return (
    <div className={styles.SettingModalBackground}>
      <div className={styles.SettingModal}>
        <div className={styles.VideoWrapper}>
          <video
            ref={videoRef}
            width={videoWidth}
            height={videoHeight}
            onPlay={console.log('handleVideoPlay')}
            autoPlay
            muted />
        </div>
        <div className={styles.Mute}>
          <label>
            {/* <input type='checkbox' name='mute' value='muted' /> */}
            <input type="checkbox"
              name='mute'
              onChange={() => setChecked(!checked)}
            />
            Mute
          </label>
        </div>
        <CompleteButton buttonName='Join' onClick={() => setIsJoinedRoom(true)} />
      </div>
    </div>
  );
};

export default SettingModal;
