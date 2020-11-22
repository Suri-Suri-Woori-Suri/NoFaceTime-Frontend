import React, { useEffect } from 'react';
import styles from './ConfigureModal.module.css';

const ConfigureModal = () => {

  useEffect(() => {

    console.log("NAVIGATOR MEDIA DEVICES", navigator.mediaDevices);

    window.onload = async function () {
      console.log("??!");
      const videoWrap = document.getElementById('configureCam');


      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement('configureCam');
      video.srcObject = mediaStream;

      console.log(video);
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

      if (navigator.getUserMedia) {
        alert('hello');
        navigator.getUserMedia({
          video: true
        },
          handleVideo, videoError);
      }

      function handleVideo(stream) {
        //video.src = new window.webkitURL().createObjectURL(stream);
        video.play();
      }

      function videoError(e) {
        console.error(e);
      }
    }();
  }, []);


  return (
    <div className={styles.ConfigureModalBackground}>
      <div className={styles.ConfigureModal}>
        <video
          id="configureCam"
          src=""></video>
      </div>
    </div>
  );
};

export default ConfigureModal;


