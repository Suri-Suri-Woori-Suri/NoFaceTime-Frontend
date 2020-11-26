import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Peer from "simple-peer";
import * as faceapi from 'face-api.js';

import Logo from '../Logo/Logo';
import Canvas from '../Canvas/Canvas';
import MenuBar from '../MenuBar/MenuBar';
import PeerVideo from '../PeerVideo/PeerVideo';
import Chat from '../../components/Chat/Chat';
import MyVideo from '../../components/MyVideo/MyVideo';
import HostVideo from '../../components/HostVideo/HostVideo';
import GroupListInVideoRoom from '../GroupListInVideoRoom/GroupListInVideoRoom';

import { MENU_MODE, MY_VIDEO_MODE } from '../../constants/index';
import { socket } from '../../utils/socket';
import styles from './VideoConferenceRoom.module.css';

const VideoConferenceRoom = ({
  isHost,
  location,
  joinMember,
  addMessage,
  messageList,
  currentUser,
  memberInRoom,
  addSecretMessage,
  secretMessageList,
  deleteLeavingMember,
  audioMuted,
  setAudioMuted
}) => {
  const {
    INVITE,
    STUDENTS,
    PUBLIC_CHAT,
    SCREEN_SHARE,
    QUESTION_CHAT } = MENU_MODE;

  const { HOST, PEER } = MY_VIDEO_MODE;

  const { _id, nickname } = currentUser;
  const ROOM_ID = location.pathname.split('/').pop();

  const [mode, setMode] = useState(STUDENTS);
  const [peers, setPeers] = useState([]); //체크
  const [streamForShare, setStreamForShare] = useState();

  const videoRef = useRef();
  const streamRef = useRef();
  const canvasRef = useRef();
  const myPeer = useRef();
  const peersRef = useRef({});

  const [initialized, setInitialized] = useState(false);
  const [hostId, setHostId] = useState('');

  const handleVideoPlay = () => {
    let xCoord, yCoord, width, height;

    setInterval(async () => {

      canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);

      const displaySize = {
        width: 350,
        height: 350
      };

      faceapi.matchDimensions(canvasRef.current, displaySize);

      const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      canvasRef.current.getContext('2d').clearRect(0, 0, 500, 500);
      faceapi.draw.drawDetections(canvasRef.current, resizedDetections, { withScore: false });
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);


      if (detections.length > 0) {
        xCoord = resizedDetections[0]?.detection?._box?._x;
        yCoord = resizedDetections[0]?.detection?._box?._y;
        width = resizedDetections[0]?.detection?._box?._width;
        height = resizedDetections[0]?.detection?._box?._height;

        detections.forEach(element => {
          let status = "";
          let valueStatus = 0.0;

          for (const [key, value] of Object.entries(element.expressions)) {
            if (value > valueStatus) {
              status = key;
              valueStatus = value;
            }
          }

          const context = canvasRef.current.getContext('2d');
          const { _x, _y, _width, _height } = resizedDetections[0].detection._box;

          const img = new Image();
          img.src = 'https://no-face-time.s3.ap-northeast-2.amazonaws.com/Emoji/png_angry2_emoji.png';
          context.drawImage(img, 0.75 * xCoord, 0.75 * yCoord, 350, 350);
        }
        );
      } else {
        console.log("No Faces");
        const context = canvasRef.current.getContext('2d');

        const img = new Image();
        img.src = 'https://no-face-time.s3.ap-northeast-2.amazonaws.com/Emoji/png_angry2_emoji.png';
        context.drawImage(img, 0.75 * xCoord, 0.75 * yCoord, 350, 350);
      }
    }, 5000);
  };

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      videoRef.current.srcObject = stream;
      streamRef.current = stream;

      setStreamForShare(stream);
      setInitialized(true);
    }
    catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const loadModels = () => {
      const MODEL_URL = process.env.PUBLIC_URL + '/faceApiModels';

      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
      ]).then(startVideo());
    };
    loadModels();
  }, []);


  useEffect(() => {
    socket.emit('join-room', { roomId: ROOM_ID, userId: _id, nickname, isHost });

    socket.on('joined', ({ members, host }) => {
      joinMember(members);
      setHostId(host);
    });

    socket.on('joined-newMember', newMember => {
      joinMember(newMember);
    });

    socket.on('user left', ({ socketId }) => {
      deleteLeavingMember(socketId);
      delete peersRef.current[socketId];

      setPeers(peers => {
        const targetPeer = peers.filter(peer => peer.peerId === socketId)[0];
        const rest = peers.filter(peer => peer.peerId !== socketId);

        if (targetPeer) targetPeer.peer.destroy();
        return [...rest];
      });
    });

    return () => {
      socket.emit('leave');
      socket.off();
    };
  }, []);


  useEffect(() => {
    if (!initialized) return;

    for (let key in memberInRoom) {
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: streamRef.current
      });

      myPeer.current = peer;

      peer.on('signal', signal => {
        socket.emit('send signal', { signal, to: memberInRoom[key] });
      });

      peersRef.current[key] = peer;
      setPeers(peers => [...peers, { peerId: key, peer }]);
    }

    socket.on('return signal', ({ signal, from }) => {
      const initiator = from;

      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: streamRef.current,
      });

      myPeer.current = peer;

      peer.signal(signal);

      peer.on('signal', signal => {
        socket.emit('respond signal', { signal, to: initiator });
      });

      peersRef.current[initiator.socketId] = peer;

      setPeers(peers => [...peers, { peerId: from.socketId, peer }]);
    });

    socket.on('respond signal', ({ signal, from }) => {
      const targetPeer = peersRef.current[from.socketId];
      targetPeer.signal(signal);
    });

    return () => socket.off();

  }, [initialized]);

  const shareScreen = () => {
    navigator.mediaDevices.getDisplayMedia({ cursor: true })
      .then(screenStream => {
        for (let key in peersRef.current) {
          peersRef.current[key].replaceTrack(streamForShare.getVideoTracks()[0], screenStream.getVideoTracks()[0], streamForShare);
        }
        videoRef.current.srcObject = screenStream;

        screenStream.getTracks()[0].onended = () => {
          for (let key in peersRef.current) {
            peersRef.current[key].replaceTrack(screenStream.getVideoTracks()[0], streamForShare.getVideoTracks()[0], streamForShare);
          }
          videoRef.current.srcObject = streamForShare;
        };
      });

    setMode(STUDENTS);
  };

  const [message, setMessage] = useState('');
  const [sendTo, setSendTo] = useState('');
  const targetMessage = mode === PUBLIC_CHAT ? messageList : secretMessageList;

  useEffect(() => {
    socket.on('message-public', message => {
      addMessage(message);
    });

    socket.on('message-secret', message => {
      const { from } = message;
      if (from !== nickname) addSecretMessage(message);
    });

    return () => {
      socket.off('message-public');
      socket.off('message-secret');
    };

  }, [messageList, secretMessageList]);

  const sendMessagePublic = (event) => {
    event.preventDefault();
    if (!message) return;

    const data = { text: message, from: nickname };

    socket.emit('message-public', data, () => {
      setMessage('');
      addMessage(data);
    });
  };

  const sendMessageSecretly = (event) => {
    event.preventDefault();
    if (!message) return;

    const data = { text: message, from: nickname, to: sendTo };

    setMessage('');
    addSecretMessage(data);
    socket.emit('message-secret', data);
  };

  const sendMessage = mode === PUBLIC_CHAT ? sendMessagePublic : sendMessageSecretly;

  const showMenuOnMode = () => {
    switch (mode) {

      case PUBLIC_CHAT:
      case QUESTION_CHAT:
        return (
          <Chat
            mode={mode}
            message={message}
            nickname={nickname}
            setMessage={setMessage}
            sendMessage={sendMessage}
            targetMessage={targetMessage}
            setSendTo={setSendTo} />
        );

      case SCREEN_SHARE:
        return shareScreen();

      case INVITE:
        return (
          <GroupListInVideoRoom
            id={styles.Invite}
            groups={currentUser.groups}
            sender={currentUser.email} />
        );

      case STUDENTS:
      default:
        return (
          isHost
            ? peers.map((peer, index) => {
              return <PeerVideo faceapi={faceapi} key={index} peer={peer} />;
            })
            : <>
              <MyVideo isHost={isHost} videoRef={videoRef} audioMuted={audioMuted} handleVideoPlay={handleVideoPlay} />
              {
                peers.slice(1).map((peer, index) => {
                  return <PeerVideo faceapi={faceapi} key={index} peer={peer} />;
                })
              }
              {/* <canvas
                className={styles.StudentCanvas}
                ref={studentCanvasRef}
              /> */}
            </>
        );
    }
  };

  const toggleAudio = () => {
    if (streamRef.current) {
      streamRef.current
        .getAudioTracks()
        .forEach(track => track.enabled = audioMuted);
    }

    setAudioMuted(!audioMuted);
  };

  return (
    <>
      <div className={styles.VideoConferenceRoom}>
        <div className={styles.LogoWrapper}>
          <Link to='/'>
            <Logo />
          </Link>
        </div>
        <div className={styles.Content}>
          <div className={styles.LeftSide}>
            <div className={styles.CanvasOnVideo}>
              {isHost ?
                <MyVideo isHost={isHost} videoRef={videoRef} audioMuted={audioMuted} handleVideoPlay={handleVideoPlay} /> :
                peers.length && <HostVideo peers={peers} hostId={hostId} />
              }
              <canvas
                className={styles.Canvas}
                ref={canvasRef}
              />
            </div>
            <div className={styles.MenuBar}>
              <MenuBar
                audioMuted={audioMuted}
                toggleAudio={toggleAudio}
                setMode={setMode}
              />
            </div>
          </div>
          <div className={styles.RightSide}>
            {showMenuOnMode()}
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoConferenceRoom;
