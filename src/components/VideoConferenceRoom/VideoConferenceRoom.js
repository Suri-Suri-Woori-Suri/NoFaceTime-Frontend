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
  isMuted,
  setIsMuted,
  location,
  joinMember,
  addMessage,
  messageList,
  currentUser,
  memberInRoom,
  addSecretMessage,
  secretMessageList,
  deleteLeavingMember,
}) => {
  const {
    MIC,
    NOTE,
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
  const [initialized, setInitialized] = useState(false);
  const [streamForShare, setStreamForShare] = useState();

  const videoRef = useRef();
  const canvasRef = useRef();
  const streamRef = useRef();
  const myPeer = useRef(); //share
  let peersRef = useRef([]);

  // const videoWidth = 400;
  // const videoHeight = 400;











  const [socketOn, setSocketOn] = useState(false);
  const [initializing, setInitializing] = useState(false);


  const roomLinkId = location.pathname.split('/').pop();//'/room/여기'

  console.log(process.env.PUBLIC_URL);// empty

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
    };

    loadModels();
  }, []);


  useEffect(() => {
    if (!socketOn) return;

    const socketClient = socket;
    socketClient.emit('join-room', { name: 'woori', roomLinkId });
    //socketClient.emit('join', { name:'woori', roomLinkId });

    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [socketOn, socket, roomLinkId]);

  const startVideo = async () => {
    try {
      const result = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      videoRef.current.srcObject = result;
    }
    catch (err) {
      console.log(err);
    }
  };

  const emojis = {
    default: 'https://no-face-time.s3.ap-northeast-2.amazonaws.com/Emoji/mask_emoji.jpeg', // '😎',
    neutral: 'https://no-face-time.s3.ap-northeast-2.amazonaws.com/Emoji/mask_emoji.jpeg', // '🙂',
    happy: 'https://no-face-time.s3.ap-northeast-2.amazonaws.com/Emoji/happy_emoji.jpeg', // '😀',
    sad: 'https://no-face-time.s3.ap-northeast-2.amazonaws.com/Emoji/sad_emoji.jpeg', // '😥',
    angry: 'https://no-face-time.s3.ap-northeast-2.amazonaws.com/Emoji/gun_emoji.jpeg', // '😠',
    fearful: 'https://no-face-time.s3.ap-northeast-2.amazonaws.com/Emoji/fearful_emoji.jpeg', // '😨',
    disgusted: 'https://no-face-time.s3.ap-northeast-2.amazonaws.com/Emoji/disgusted_emoji.jpeg', // '🤢',
    surprised: 'https://no-face-time.s3.ap-northeast-2.amazonaws.com/Emoji/surprised_emoji.jpg', //'😳'
    noFace: 'https://no-face-time.s3.ap-northeast-2.amazonaws.com/Emoji/emoji-sleep-smiley-emoticon-fatigue-tired.jpg'
  };



  const handleVideoPlay = () => {
    console.log('handle video Play!!!!');


    setInterval(async () => {
      if (initializing) {
        setInitializing(false);
      }

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


          //canvasRef.current.fillTex = emojis.default;
          //anvasRef.current.innerHTML = emojis.default;

          const context = canvasRef.current.getContext('2d');
          const { _x, _y, _width, _height } = resizedDetections[0].detection._box;
          console.log("RESIZED", resizedDetections);


          console.log("HAPPY!!!");
          // context.drawImage(img, xCoord, yCoord, 100, 100);
          // context.font = '300px';
          // context.fillText('😎', xCoord, yCoord, 10000  );

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

        //const { _x, _y, _width, _height } = resizedDetections[0].detection._box;
      }
    }, 1000);
  };



















  useEffect(() => {
    socket.emit('join-room', { roomId: ROOM_ID, userId: _id, nickname, isHost });//isHost : socket

    socket.on('joined', ({ members, host }) => {//host : socketId
      console.log('원래 있던 맴버!!!!', members);
      joinMember(members);
      console.log('socket Id of host', host);
    });

    socket.on('joined-newMember', newMember => {
      console.log('새로운 맴버', newMember);
      joinMember(newMember);
    });

    socket.on('user left', ({ socketId }) => {
      console.log(socketId);
      console.log('user left');
      deleteLeavingMember(socketId);

      console.log("PEER REF", peersRef);
      peersRef = peersRef.current.filter(peer => peer.peerId !== socketId);

      setPeers(peers => {
        const targetPeer = peers.filter(peer => peer.peerId === socketId)[0];
        const rest = peers.filter(peer => peer.peerId !== socketId);

        if (targetPeer) targetPeer.peer.destroy();
        return [...rest];
      });
    });



    startVideo();

    return () => { //unmountung
      socket.emit('leave');
      socket.off();
    };
  }, []);

  useEffect(() => {
    if (!initialized) return;

    console.log("원래 있던 맴버를 돈다. 처음에 딱 한 번만 시행돼야한다.");

    for (let key in memberInRoom) {
      console.log(key);

      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: streamRef.current
      });

      myPeer.current = peer;//share

      peersRef.current.push({
        peerId: key,
        peer,
      });

      //peers.push(peer); ****

      peer.on('signal', signal => {
        socket.emit('send signal', { signal, to: memberInRoom[key] });
      });

      //setPeers(users => ([...users, peer])); ****
      setPeers(users => ([...users, { peerId: key, peer }])); //soketId
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

      peersRef.current.push({
        peerId: from.socketId,
        peer,
      });

      peer.signal(signal);

      peer.on('signal', signal => {
        socket.emit('respond signal', { signal, to: initiator });
      });

      console.log('여기서 새로운 사람이 조인했을 때 반응하고 peer에 추가해야한다.');
      console.log(peersRef.current, "initiator === ", peer);
      console.log('기존 peers', peers);
      //setPeers(users => [...users, peer]); ****
      setPeers(users => ([...users, { peerId: from.socketId, peer }]));
    });

    socket.on('respond signal', ({ signal, from }) => {
      console.log("HERE", peers);
      const targetPeer = peersRef.current.find(p => p.peerId === from.socketId);
      console.log(targetPeer, ' === RECIVER');
      console.log(targetPeer.peer);
      targetPeer.peer.signal(signal);
      // const targetPeer = peers.find(p => p.peerId === from.socketId);
      // console.log(targetPeer, ' === RECIVER');
      // console.log(targetPeer.peer);
      // targetPeer.peer.signal(signal);
    });

    return () => socket.off();

  }, [initialized]);
  /////////////////////////////////////////////////////////////////////////////////////////// screen share
  const shareScreen = () => {
    navigator.mediaDevices.getDisplayMedia({ cursor: true })
      .then(screenStream => {
        peersRef.current.map(item => {
          item.peer.replaceTrack(streamForShare.getVideoTracks()[0], screenStream.getVideoTracks()[0], streamForShare);
          videoRef.current.srcObject = screenStream;

          screenStream.getTracks()[0].onended = () => {
            item.peer.replaceTrack(screenStream.getVideoTracks()[0], streamForShare.getVideoTracks()[0], streamForShare);
            videoRef.current.srcObject = streamForShare;
          };
        });

        // peersRef.current.replaceTrack(streamForShare.getVideoTracks()[0], screenStream.getVideoTracks()[0], streamForShare)
        // videoRef.current.srcObject = screenStream // Cannot set property 'srcObject' of undefined
        // screenStream.getTracks()[0].onended = () => {
        //   peersRef.current.replaceTrack(screenStream.getVideoTracks()[0], streamForShare.getVideoTracks()[0], streamForShare)
        //   videoRef.current.srcObject = streamForShare
        // }

        // myPeer.current.replaceTrack(streamForShare.getVideoTracks()[0], screenStream.getVideoTracks()[0], streamForShare)
        // userVideo.current.srcObject = screenStream // Cannot set property 'srcObject' of undefined
        // screenStream.getTracks()[0].onended = () => {
        //   myPeer.current.replaceTrack(screenStream.getVideoTracks()[0], streamForShare.getVideoTracks()[0], streamForShare)
        //   userVideo.current.srcObject = streamForShare
        // }
      });
  };

  /////////////////////////////////////////////////////////////////////////////////////////// CHAT
  const [message, setMessage] = useState('');
  const [sendTo, setSendTo] = useState('');
  const targetMessage = mode === PUBLIC_CHAT ? messageList : secretMessageList;

  console.log("MODE", mode);
  console.log("PUBLIC MESSAGE", messageList);
  console.log("SECRET MESSAGE", secretMessageList);

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
    // socket.off('message-secret');
    //console.log('!!!!!!!secret message data', data);//socket io의 callbak 문제....
  };

  const sendMessage = mode === PUBLIC_CHAT ? sendMessagePublic : sendMessageSecretly;
  ////////////////////////////////////////////////////////////////////////// Mute
  const [audioMuted, setAudioMuted] = useState(false);

  const toggleAudio = () => {
    if (streamRef.current) {
      streamRef.current
        .getAudioTracks()
        .forEach(track => track.enabled = audioMuted);
    }

    setAudioMuted(!audioMuted);
  };
  //////////////////////////////////////////////////////////////////////////  right side bar
  const showMenuOnMode = () => {
    switch (mode) {
      case MIC:
        return toggleAudio();

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

      case NOTE:
        return setMode(NOTE);

      case INVITE:
        return (
          <GroupListInVideoRoom
            id={styles.Invite}
            groups={currentUser.groups}
            sender={currentUser.email} />
        );

      case STUDENTS:
      default:
        isHost
          ? peers.map((peer, index) => {
            return <PeerVideo key={index} peer={peer} />;
          })
          : <>
            <MyVideo videoRef={videoRef} />
            {
              peers.slice(1).map((peer, index) => {
                return <PeerVideo key={index} peer={peer} />;
              })
            }
          </>;
    }
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
              {
                isHost
                  ? <MyVideo
                    mode={HOST}
                    videoRef={videoRef}
                    startDetectionOnCanvas={handleVideoPlay} />
                  : <HostVideo
                    peers={peers}
                    videoRef={videoRef}
                    startDetectionOnCanvas={handleVideoPlay}
                  />
              }
              <canvas
                className={styles.Canvas}
                ref={canvasRef}
              />
            </div>
            <div className={styles.MenuBar}>
              <MenuBar
                isMuted={isMuted}
                setMode={setMode} />
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

  //socket.emit('leave') -> leave 버튼

  // const Video = (props) => {
  //   const ref = useRef();
  //   const { targetPeer } = props;

  //   useEffect(() => {
  //     console.log("2@@@@@@", targetPeer);
  //     if (!targetPeer) return;

  //     targetPeer.peer.on("stream", stream => {
  //       ref.current.srcObject = stream;
  //     });
  //   }, []);

  //   return (
  //     <video muted playsInline autoPlay ref={ref} />
  //   );
  // }

  // const peervideoList = for (let key in memberInRoom) {
  //   const targetPeer =  peersRef.current.filter(peer => peer.peerID === key)[0];
  //   return (
  //     <Video key={index} targetPeer={targetPeer} />
  //   );
  // }