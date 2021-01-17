import React, { useEffect, useCallback, useRef } from 'react';

import CompleteButton from '../CompleteButton/CompleteButton';
import styles from './SettingModal.module.css';

const SettingModal = ({
  setIsJoinedRoom,
  toggleAudio,
  audioMuted
}) => {
  const videoRef = useRef();

  useEffect(() => {
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      } catch (err) {
        console.error("Can't Start Video in Setting", err);
      }
    })();
  }, []);

  const handleJoinButtonClick = useCallback(() => {
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach((track) => {
      track.stop();
    });

    videoRef.current.srcObject = null;
    setIsJoinedRoom(true);
  }, [setIsJoinedRoom]);

  return (
    <div className={styles.SettingModalBackground}>
      <div className={styles.SettingModal}>
        <div className={styles.VideoWrapper}>
          <video
            className={styles.Video}
            ref={videoRef}
            muted={audioMuted}
            autoPlay />
        </div>
        <div className={styles.Mute}>
          <label>
            <input
              className={styles.Checkbox}
              type="checkbox"
              onChange={toggleAudio} />
            Mute
          </label>
        </div>
        <CompleteButton buttonName='Join' onClick={handleJoinButtonClick} />
      </div>
    </div>
  );
};

export default SettingModal;
