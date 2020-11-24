import React, { useState, useEffect, useRef } from 'react';
import Peer from "simple-peer";
import * as faceapi from 'face-api.js';

import Logo from '../Logo/Logo';
import MenuBar from '../MenuBar/MenuBar';
import PeerVideo from '../PeerVideo/PeerVideo';
import Chat from '../../components/Chat/Chat';
import HostVideo from '../../components/HostVideo/HostVideo';
import GroupContainer from '../../containers/GroupContainer/GroupContainer';
import Group from '../../components/Group/Group';
import GroupList from '../../components/GroupList/GroupList';
import GroupListInVideoRoom from '../GroupListInVideoRoom/GroupListInVideoRoom';

import { socket } from '../../utils/socket';
import styles from './VideoConferenceRoom.module.css';

const VideoConferenceRoom = ({
  location,
  currentUser,
  isHost,
  memberInRoom,
  joinMember,
  deleteLeavingMember,
  messageList,
  secretMessageList,
  addMessage,
  addSecretMessage,
  setMuted,
  setIsClickedEmoji,
  isClickedInvite,
  setIsClickedInvite,
  setIsClickedPublicChat,
  setIsClickedQuestionChat
}) => {
  console.log("ISHOST???", isHost);
  console.log(messageList);
  console.log(secretMessageList);

  console.log("CURRENT Video USER", currentUser);
  console.log("INVITE CLick??", isClickedInvite);

  const videoRef = useRef();
  const canvasRef = useRef();
  const streamRef = useRef();

  let peersRef = useRef([]);

  const myPeer = useRef();//share
  const [streamForShare, setstreamForShare] = useState();

  const videoWidth = 500;
  const videoHeight = 500;

  const { _id, nickname } = currentUser;
  const [initialized, setInitialized] = useState(false);
  const [peers, setPeers] = useState([]);//체크
  const [mode, setMode] = useState('Emoji');
  const ROOM_ID = location.pathname.split('/').pop();
  console.log("MEMBERIN ROOM", memberInRoom);

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

    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        videoRef.current.srcObject = stream;
        streamRef.current = stream;

        setstreamForShare(stream);//share

        setInitialized(true);
      }
      catch (err) {
        console.log(err);
        alert('현재 비디오를 사용하실 수 없습니다.');
      }
    };

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

  /////////////////////////////////////////////////////////////////// CHAT
  const [message, setMessage] = useState('');
  const targetMessage = mode === 'PublicChat' ? messageList : secretMessageList;
  const [sendTo, setSendTo] = useState('');
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

  const sendMessage = mode === 'PublicChat' ? sendMessagePublic : sendMessageSecretly;

  const myVideo = (<video
    id={styles.HostVideo}
    ref={videoRef} autoPlay//videoRef => user's
    muted
    height={videoHeight}
    width={videoWidth}
    onPlay={console.log('handleVideoPlay')}
  />);

  const [audioMuted, setAudioMuted] = useState(false);
  function toggleAudio() {
    if (streamRef.current) {
      streamRef.current
        .getAudioTracks()
        .forEach(track => track.enabled = audioMuted);
    }
    setAudioMuted(!audioMuted);
  }

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
                myVideo :
                peers.length && <HostVideo peer={peers} />
              }
              <canvas
                ref={canvasRef}
                className={styles.Canvas}
                width={videoWidth}
                height={videoHeight} />
            </div>
            <div className={styles.MenuBar}>
              <MenuBar setMode={setMode} toggleAudio={toggleAudio} />
              <button onClick={() => shareScreen()}> SHARE </button>
            </div>
          </div>
          <div className={styles.RightSide}>
            {mode === 'Emoji' && (
              <>{isHost ?
                peers.map((peer, index) => {
                  return <PeerVideo key={index} peer={peer} />;
                }) :
                <>
                  {myVideo}
                  {peers.slice(1).map((peer, index) => {
                    return <PeerVideo key={index} peer={peer} />;
                  })}
                </>
              }</>
            )}
            {(mode === 'PublicChat' || mode === 'QuestionChat') &&
              <Chat
                mode={mode}
                message={message}
                setMessage={setMessage}
                sendMessage={sendMessage}
                targetMessage={targetMessage}
                nickname={nickname}
                setSendTo={setSendTo}
              />
            }
            {
              isClickedInvite
                ? <>
                  <GroupListInVideoRoom
                    id={styles.Invite}
                    groups={currentUser.groups}
                    host={currentUser.email} />
                </>
                : <></>
            }
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