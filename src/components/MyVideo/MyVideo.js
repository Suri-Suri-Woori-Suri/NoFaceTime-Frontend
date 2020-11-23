import React, { useState, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

import FaceDetectionCanvas from '../FaceDetectionCanvas/FaceDetectionCanvas';
import styles from './MyVideo.module.css';

const MyVideo = () => {
  const videoWidth = 500;
  const videoHeight = 500;
  const videoRef = useRef();
  //const canvasRef = useRef();
  const [initialized, setInitialized] = useState(false);

  console.log("PUBLIC_URL", process.env.PUBLIC_URL);// empty
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

  return (
    <>
      <video
        ref={videoRef}
        width={videoWidth}
        height={videoHeight}
        onPlay={console.log('handleVideoPlay')}
        autoPlay
        muted />
      <FaceDetectionCanvas
        videoRef={videoRef}
        startVideo={startVideo} />
    </>
  );
};

export default MyVideo;
