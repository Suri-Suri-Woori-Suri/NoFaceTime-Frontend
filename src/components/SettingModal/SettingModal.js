import React, { useState, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

import Canvas from '../Canvas/Canvas';
import HostVideo from '../HostVideo/HostVideo';
import FaceDetectionCanvas from '../FaceDetectionCanvas/FaceDetectionCanvas';
import CompleteButton from '../CompleteButton/CompleteButton';
import styles from './SettingModal.module.css';

const SettingModal = ({
  timeId,
  setIsJoinedRoom
}) => {
  console.log("TIMEID", timeId);
  const videoWidth = 500;
  const videoHeight = 500;

  const [initializing, setInitializing] = useState(false);
  const videoRef = useRef();
  const canvasRef = useRef();

  // console.log(process.env.PUBLIC_URL);// empty

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + '/faceApiModels'; //process.env.PUBLIC_URL +

      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
      ]).then(startVideo());
    };
    loadModels();
  }, []);

  const startVideo = async () => {
    try {
      const result = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      console.log("RESULT,", result);
      videoRef.current.srcObject = result;
    }
    catch (err) {
      console.err(err);
    }
  };

  console.log("checkbox");
  const [checked, setChecked] = useState(true);
  // const emojis = {
  //   default: '😎',
  //   neutral: '🙂',
  //   happy: '😀',
  //   sad: '😥',
  //   angry: '😠',
  //   fearful: '😨',
  //   disgusted: '🤢',
  //   surprised: '😳'
  // };
  // console.log(emojis.default);

  // const handleVideoPlay = () => {
  //   console.log('dho..!!!!');

  //   timeId = setInterval(async () => {
  //     if (initializing) {
  //       setInitializing(false);
  //     }

  //     canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
  //     const displaySize = {
  //       width: 500,
  //       height: 500
  //     };
  //     await faceapi.matchDimensions(canvasRef.current, displaySize);

  //     const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
  //     const resizedDetections = faceapi.resizeResults(detections, displaySize);
  //     canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
  //     faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
  //     faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
  //     faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);

  //     if (detections.length > 0) {
  //       detections.forEach(element => {
  //         console.log("HERE", element);
  //         let status = "";
  //         let valueStatus = 0.0;
  //         for (const [key, value] of Object.entries(element.expressions)) {
  //           console.log(element.expressions, '##', key, value, status);

  //           if (value > valueStatus) {
  //             status = key;
  //             valueStatus = value;
  //           }
  //         }
  //         //canvasRef.current.fillText = emojis.default;
  //         //canvasRef.current.innerHTML = statusIcons.default;
  //       });
  //     } else {
  //       console.log("No Faces");
  //     }
  //   }, 1000);
  //};

  return (
    <div className={styles.SettingModalBackground}>
      <div className={styles.SettingModal}>
        <div className={styles.VideoWrapper}>
          <video
            className={styles.MyVideo}
            ref={videoRef}
            width={videoWidth}
            height={videoHeight}
            onPlay={console.log("handleVideoPlay")}
            autoPlay
            muted />
          <canvas
            className={styles.MyVideo}
            ref={canvasRef} />
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
