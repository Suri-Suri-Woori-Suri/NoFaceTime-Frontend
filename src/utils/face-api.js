import * as faceapi from 'face-api.js';
import { FACE_STATUS, BACKGROUND_IMG, EMOJI } from '../constants';

const {
  NEUTRAL,
  HAPPY,
  SAD,
  ANGRY,
  DISGUSTED,
  FEARFUL,
  SURPRIZED
} = FACE_STATUS;

let analyzeInterval;

export const loadModels = async () => {
  const MODEL_URL = process.env.PUBLIC_URL + '/faceApiModels';

  await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
  await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
  await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
  await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
};

export const analyzeFacialExpression = (canvas, video, setIntervalName) => {
  setTimeout(() => {
    const result = attachEmoji(canvas, video);
    setIntervalName((prev) => [...prev, result]);
  }, [5000]);
};

export const attachEmoji = (canvas, video) => {
  const { canvasRef } = canvas;
  const { videoRef } = video;
  const displaySize = { width: video.width, height: video.height };

  if (!canvasRef?.current) return;
  if (!videoRef?.current) return;

  canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
  faceapi.matchDimensions(canvasRef.current, displaySize);

  let context = canvasRef.current.getContext('2d');

  const waitingImage = new Image();
  waitingImage.src = BACKGROUND_IMG.DETECTING_FACE;
  waitingImage.addEventListener('load', e => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(waitingImage, 0, 0, video.width, video.height);
  });

  analyzeInterval = setInterval(async () => {
    const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
    const resizedDetections = faceapi.resizeResults(detections, displaySize);

    if (detections.length > 0) {
      detections.forEach(element => {
        let status = "";
        let valueStatus = 0.0;

        for (const [key, value] of Object.entries(element.expressions)) {
          if (value > valueStatus) {
            status = key;
            valueStatus = value;
          }
        }

        const { _x, _y } = resizedDetections[0].detection._box;
        const _width = resizedDetections[0].landmarks.imageWidth;
        const _height = resizedDetections[0].landmarks.imageHeight;

        const img = new Image();

        if (status === NEUTRAL) {
          img.src = EMOJI.NEUTRAL;
        } else if (status === HAPPY) {
          img.src = EMOJI.HAPPY;
        } else if (status === SAD) {
          img.src = EMOJI.SAD;
        } else if (status === ANGRY) {
          img.src = EMOJI.ANGRY;
        } else if (status === DISGUSTED) {
          img.src = EMOJI.DISGUSTED;
        } else if (status === FEARFUL) {
          img.src = EMOJI.FEARFUL;
        } else if (status === SURPRIZED) {
          img.src = EMOJI.SURPRIZED;
        }

        img.addEventListener('load', e => {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(img, _x - _height / 4, _y - _height / 1.8, _width * 1.5, _height * 1.5);
        });
      }
      );
    } else {
      const img = new Image();
      img.src = EMOJI.NO_FACE;

      img.addEventListener('load', e => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      });
    }
  }, [150]);

  const result = rememberIntervalName(analyzeInterval);
  return result;
};

const rememberIntervalName = (intervalName) => {
  return intervalName;
};

export const clearAnalyzeFacialExpression = (intervalNameArray) => {
  if (Array.isArray(intervalNameArray)) {
    intervalNameArray.forEach((name) => {
      clearInterval(name);
    });
  } else {
    clearInterval(intervalNameArray);
  }
};
