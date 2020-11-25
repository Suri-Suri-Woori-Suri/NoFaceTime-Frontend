import React, { useState, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

import Canvas from '../Canvas/Canvas';
import HostVideo from '../HostVideo/HostVideo';
//import FaceDetectionCanvas from '../FaceDetectionCanvas/FaceDetectionCanvas';
import CompleteButton from '../CompleteButton/CompleteButton';
import styles from './SettingModal.module.css';
import MyVideo from '../MyVideo/MyVideo';

const SettingModal = ({
  setIsJoinedRoom,
  videoRef,
  toggleAudio,
  isHost,
  audioMuted
}) => {
  // const [isStartCanvas, setIsStartCanvas] = useState(false);
  // const canvasRef = useRef();

  // const [audioMuted, setAudioMuted] = useState(false);
  // const videoRef = useRef();
  // const streamRef = useRef();

  // const toggleAudio = () => {
  //   if (streamRef.current) {
  //     streamRef.current
  //       .getAudioTracks()
  //       .forEach(track => track.enabled = audioMuted);
  //   }

  //   setAudioMuted(!audioMuted);
  // };

  // useEffect(() => {
  //   const startVideo = async () => {
  //     try {
  //       const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
  //       videoRef.current.srcObject = stream;
  //       streamRef.current = stream;
  //     }
  //     catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   startVideo();

  // }, []);

  const videoHeight = 200;
  const videoWidth = 200;

  // const myVideo = (<video
  //   ref={videoRef} autoPlay
  //   height={videoHeight}
  //   width={videoWidth}
  //   onPlay={console.log('handleVideoPlay')}
  // />);


  return (
    <div className={styles.SettingModalBackground}>
      <div className={styles.SettingModal}>
        <div className={styles.VideoWrapper}>
          <MyVideo isHost={isHost} videoRef={videoRef} audioMuted={audioMuted}/>
          {/* <video
            className={styles.MyVideo}
            ref={videoRef}
            // onPlay={han}
            autoPlay /> */}
          {/* {
            isStartCanvas
            &&
            <Canvas
              videoRef={videoRef}
              canvasRef={canvasRef}
              startVideo={startVideo} /> */}
          {/* <FaceDetectionCanvas /> */}
          {/* } */}
          {/* <canvas
            className={styles.MyVideo}
            ref={canvasRef} /> */}
        </div>
        <div className={styles.Mute}>
          <label>
            <input
              type="checkbox"
              onChange={toggleAudio} />
            Mute
          </label>
        </div>
        <CompleteButton buttonName='Join' onClick={() => setIsJoinedRoom(true)} />
      </div>
    </div>
  );
};

export default SettingModal;
