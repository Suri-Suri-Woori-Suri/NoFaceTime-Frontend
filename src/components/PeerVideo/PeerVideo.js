import React, { useEffect, useRef } from 'react';
import styles from './PeerVideo.module.css';

const PeerVideo = ({ faceapi, peer }) => {
  const videoRef = useRef();//studentVideoRef
  console.log("새로운 형태", peer);
  useEffect(() => {
    peer.peer.on("stream", stream => {
      videoRef.current.srcObject = stream;
    });
  }, []);

  const canvasRef = useRef();

  const handleVideoPlay2 = () => {
    console.log('handle video Play!!!!');

    setInterval(async () => {

      canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);

      const displaySize = {
        width: 500,
        height: 500
      };

      faceapi.matchDimensions(canvasRef.current, displaySize);

      const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      canvasRef.current.getContext('2d').clearRect(0, 0, 500, 500);
      faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);

      if (detections.length > 0) {
        const xCoord = resizedDetections[0]?.detection?._box?._x;
        const yCoord = resizedDetections[0]?.detection?._box?._y;

        console.log("X좌표", xCoord, "Y좌표", yCoord);

        detections.forEach(element => {
          console.log("HERE", element);
          let status = "";
          let valueStatus = 0.0;
          for (const [key, value] of Object.entries(element.expressions)) {
            console.log(element.expressions, '##', key, value, status);

            if (value > valueStatus) {
              status = key;
              valueStatus = value;
            }
          }

          const context = canvasRef.current.getContext('2d');
          const { _x, _y, _width, _height } = resizedDetections[0].detection._box;
          console.log("RESIZED", resizedDetections);

          const img = new Image();
          img.src = 'https://no-face-time.s3.ap-northeast-2.amazonaws.com/Emoji/emoji-sleep-smiley-emoticon-fatigue-tired.jpg';
          context.drawImage(img, xCoord - xCoord * 0.25, yCoord - yCoord * 0.25, _width * 1.5, _height * 1.5);
        }
        );
      } else {
        console.log("No Faces");
        const context = canvasRef.current.getContext('2d');

        const img = new Image();
        img.src = 'https://no-face-time.s3.ap-northeast-2.amazonaws.com/Emoji/mask_emoji.jpeg';
        context.drawImage(img, 0, 0, 500, 500);
      }
    }, 5000);
  };


  return (
    <>
      <video
        className={styles.PeerVideo}
        ref={videoRef}
        autoPlay
        playsInline
        onPlay={handleVideoPlay2} />
      <canvas
        className={styles.Canvas}
        ref={canvasRef}
      />
    </>

  );
};

export default PeerVideo;
