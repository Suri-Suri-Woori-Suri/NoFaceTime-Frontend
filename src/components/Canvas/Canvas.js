// //import * as faceapi from 'face-api.js';
// import React, { useRef } from 'react';
// import styles from './Canvas.module.css';

// const loadModels = async () => {
//   const MODEL_URL = process.env.PUBLIC_URL + '/faceApiModels';

//   try {
//     await Promise.all([
//       faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
//       faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
//       faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
//       faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
//     ]);
//     startVideo();
//   } catch(err) {
//     console.log(err);
//     startVideo();
//   }
// }

// // const emojis = {
// //   default: '😎',
// //   neutral: '🙂',
// //   happy: '😀',
// //   sad: '😥',
// //   angry: '😠',
// //   fearful: '😨',
// //   disgusted: '🤢',
// //   surprised: '😳'
// // };

// // const handleVideoPlay = () => {
// //   console.log('dho..!!!!');
// //   console.log(canvasRef);
// //   analyzeFace(faceapi, videoRef, canvasRef);
// // };

// // const useInterval = (callback) => {
// //   const savedCallback = useRef();

// //   useEffect(() => {
// //     savedCallback.current = callback;
// //     const analyzeEmotion = () => savedCallback.current();

// //     const realTimeAnalizaingEmotion = setInterval(analyzeEmotion, 1000);
// //     return () => clearInterval(realTimeAnalizaingEmotion);
// //   }, []);
// // };
// // useInterval(analyzeFace);

// const Canvas = async() => {
//   //emojis.default;

//   //async(faceapi, videoRef, canvasRef)

//   console.log(canvasRef)

//   canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
//   const displaySize = {
//     width: 400,
//     height: 400
//   };
//   faceapi.matchDimensions(canvasRef.current, displaySize);

//   const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
//   const resizedDetections = faceapi.resizeResults(detections, displaySize);
//   canvasRef.current.getContext('2d').clearRect(0, 0, 500, 500);
//   faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
//   faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
//   faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);

//   if (detections.length > 0) {
//     detections.forEach(element => {
//       console.log("HERE", element);
//       let status = "";
//       let valueStatus = 0.0;
//       for (const [key, value] of Object.entries(element.expressions)) {
//         console.log(element.expressions, '##', key, value, status);

//         if (value > valueStatus) {
//           status = key;
//           valueStatus = value;
//         }
//       }

//       return <canvas className={styles.Canvas} ref={canvasRef} />

//       //canvasRef.current.fillTex = emojis.default;
//       //canvasRef.current.innerHTML = statusIcons.default;
//     });
//   } else {
//     console.log("No Faces")
//   }
// };

// export default Canvas;
