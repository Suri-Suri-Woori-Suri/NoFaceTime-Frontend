import React, { useState, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

function Video({ socket, location }) {
  console.log('VIDEO!!!!!')
   //window.history.back(); -> 이거 누르면 뒤로 가지 않을까용??? 나중에 핵심기능 구현하구 고민해보기...
  const roomLinkId = location.pathname.split('/').pop();//'/room/여기'

  const videoHeight = 500;
  const videoWidth = 500;
  const [initializing, setInitializing] = useState(false);
  const videoRef = useRef();
  const canvasRef = useRef();

  console.log(process.env.PUBLIC_URL)// empty

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + '/faceApiModels'; //process.env.PUBLIC_URL +
      setInitializing(true);
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
      ]).then(startVideo());
    }
    loadModels();
  }, []);

  const startVideo = async () => {
    try {
      const result = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      videoRef.current.srcObject = result
    }
    catch(err) {
      console.log(err);
    }
  };

  const emojis = {
    default: '😎',
    neutral: '🙂',
    happy: '😀',
    sad: '😥',
    angry: '😠',
    fearful: '😨',
    disgusted: '🤢',
    surprised: '😳'
  };

  const handleVideoPlay = () => {
    console.log('dho..!!!!');

    setInterval(async () => {
      if (initializing) {
        setInitializing(false);
      }
      //emojis.default;

      canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
      const displaySize = {
        width: videoWidth,
        height: 400
      };
      faceapi.matchDimensions(canvasRef.current, displaySize);

      const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
      faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
      //console.log(detections);

      if (detections.length > 0) {
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

          canvasRef.current.fillTex = emojis.default;
          //canvasRef.current.innerHTML = statusIcons.default;
        });
      } else {
        console.log("No Faces")
      }
    }, 100);
  };

  const [socketOn, setSocketOn] = useState(false);

  useEffect(()=> {
    if (!socketOn) return;

    const socketClient = socket;
    socketClient.emit('join-room', { name:'woori', roomLinkId });
    //socketClient.emit('join', { name:'woori', roomLinkId });

    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [socketOn]);


  return (
    <div className="App">
      <div>Video</div>
      <span>{initializing ? 'initializing' : 'Ready'}</span>
      <div className='faceShape center'>
        <video ref={videoRef} autoPlay muted height={videoHeight} width={videoWidth} onPlay={handleVideoPlay}/>
        <canvas className='canvas' ref={canvasRef}/>
      </div>
      <button onClick={() => setSocketOn(true)}>Join</button>
    </div>
  );
}

export default Video;
