import React, { useState, useEffect, useRef } from 'react';
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

  const { HOST } = MY_VIDEO_MODE;

  const { _id, nickname } = currentUser;
  const ROOM_ID = location.pathname.split('/').pop();

  const [mode, setMode] = useState(STUDENTS);
  const [peers, setPeers] = useState([]); //체크
  const [streamForShare, setStreamForShare] = useState();

  const videoRef = useRef();
  const streamRef = useRef();
  const canvasRef = useRef();

  const peersRef = useRef({});
  const [initialized, setInitialized] = useState(false);
  const [hostId, setHostId] = useState('');

  const myPeer = useRef(); //share

  console.log("$$$$", peers)
  console.log("$$$$", peersRef)

  const handleVideoPlay = () => {
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

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      console.log("SAME STREAM???", stream)
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
    }
    loadModels();
  }, []);


  useEffect(() => {
    socket.emit('join-room', { roomId: ROOM_ID, userId: _id, nickname, isHost });//isHost : socket

    socket.on('joined', ({ members, host }) => {//host : socketId
      console.log('원래 있던 맴버!!!!', members);
      joinMember(members);
      console.log('socket Id of host', host);//ECs0877G_3exUiNDAAAB
      setHostId(host);
    });

    socket.on('joined-newMember', newMember => {
      console.log('새로운 맴버', newMember);
      joinMember(newMember);
    });

    socket.on('user left', ({ socketId }) => {
      console.log(socketId);
      console.log('user left');
      deleteLeavingMember(socketId);
      delete peersRef.current[socketId];

      console.log("PEER REF", peersRef);

      setPeers(peers => {
        const targetPeer = peers.filter(peer => peer.peerId === socketId)[0];
        const rest = peers.filter(peer => peer.peerId !== socketId);

        if (targetPeer) targetPeer.peer.destroy();
        return [...rest];
      });
    });

    // const startVideo = async () => {
    //   try {
    //     const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    //     videoRef.current.srcObject = stream;
    //     streamRef.current = stream;

    //     setStreamForShare(stream);
    //     setInitialized(true);
    //   }
    //   catch (err) {
    //     console.error(err);
    //   }
    // };

    // startVideo();

    return () => { //unmountung
      socket.emit('leave');
      socket.off();
    };
  }, []);


  useEffect(() => {
    if (!initialized) return;

    console.log("원래 있던 맴버를 돈다. 처음에 딱 한 번만 시행돼야한다.");
    console.log(memberInRoom);

    for (let key in memberInRoom) {
      console.log("%%%%%%%", key);

      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: streamRef.current
      });

      myPeer.current = peer;//share

      peer.on('signal', signal => {
        socket.emit('send signal', { signal, to: memberInRoom[key] });
      });

      peersRef.current[key] = peer;
      //setPeers(users => ([...users, peer])); ****
      setPeers(peers => [...peers, { peerId: key, peer }]); //soketId
    }

    ////////////////////////// Reciever

    socket.on('return signal', ({ signal, from }) => {
      const initiator = from;
      console.log("INITIATOR", initiator);
      console.log("RECIVER", socket.id);

      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: streamRef.current,
      });

      myPeer.current = peer;//share

      peer.signal(signal);

      peer.on('signal', signal => {
        socket.emit('respond signal', { signal, to: initiator });
      });

      peersRef.current[initiator.socketId] = peer;

      console.log('여기서 새로운 사람이 조인했을 때 반응하고 peer에 추가해야한다.');
      console.log(peersRef.current, "initiator === ", peer);
      console.log('기존 peers', peers);
      //setPeers(users => [...users, peer]); ****
      setPeers(peers => [...peers, { peerId: from.socketId, peer }]);
    });

    socket.on('respond signal', ({ signal, from }) => {
      const targetPeer = peersRef.current[from.socketId];
      console.log(targetPeer, ' === RECIVER');
      targetPeer.signal(signal);
    });

    return () => socket.off();

  }, [initialized]);

  /////////////////////////////////////////////////////////////////////////////////////////// screen share
  const shareScreen = () => {
    navigator.mediaDevices.getDisplayMedia({ cursor: true })
      .then(screenStream => {
        for (let key in peersRef.current) {
          peersRef.current[key].replaceTrack(streamForShare.getVideoTracks()[0], screenStream.getVideoTracks()[0], streamForShare)
        }
        videoRef.current.srcObject = screenStream;

        screenStream.getTracks()[0].onended = () => {
          for (let key in peersRef.current) {
            peersRef.current[key].replaceTrack(screenStream.getVideoTracks()[0], streamForShare.getVideoTracks()[0], streamForShare)
          }
          videoRef.current.srcObject = streamForShare;
        }
      });

    setMode(STUDENTS);
  };

  /////////////////////////////////////////////////////////////////////////////////////////// CHAT
  const [message, setMessage] = useState('');
  const [sendTo, setSendTo] = useState('');
  const targetMessage = mode === PUBLIC_CHAT ? messageList : secretMessageList;

  useEffect(() => {
    socket.on('message-public', message => {//from -> user's nickname, text
      console.log("@@@@@@@,", message); // ex) { from: "woori", text: "sasaasasassss" }

      addMessage(message);
    });

    socket.on('message-secret', message => {
      console.log("HERE!!!!", message);
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
    // socket.off('message-public');
  };

  const sendMessageSecretly = (event) => {
    event.preventDefault();
    if (!message) return;

    const data = { text: message, from: nickname, to: sendTo };
    console.log(data);
    setMessage('');
    addSecretMessage(data);
    socket.emit('message-secret', data);
  };

  const sendMessage = mode === PUBLIC_CHAT ? sendMessagePublic : sendMessageSecretly;

  ///////////////////////////////////////////////////////////////


  //////////////////////////////////////////////////////////////////////////  right side bar
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
      // case NOTE:// MIC 랑 NOTE 일단 지웠습니다.. 컴포넌트가 로딩되거나 함수가 시행되어야 하는데 setMode로 모드가 바뀌면서 무한루프에 빠집니다.
      // return setMode(NOTE);

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
          <Logo />
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
