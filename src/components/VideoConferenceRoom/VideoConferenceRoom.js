import React, { useState, useEffect, useRef } from 'react';
import Peer from "simple-peer";
import * as faceapi from 'face-api.js';

import Logo from '../Logo/Logo';
import MenuBar from '../MenuBar/MenuBar';
import PeerVideo from '../PeerVideo/PeerVideo';

import { socket } from '../../utils/socket';
import styles from './VideoConferenceRoom.module.css';
import { deleteGroup } from '../../api';

const VideoConferenceRoom = ({
  location,
  currentUser,
  memberInRoom,
  joinMember,
}) => {
  console.log("CURRENT USER", currentUser);
  const videoRef = useRef();
  const canvasRef = useRef();

  const streamRef = useRef();
  const peersRef = useRef([]);
  const ROOM_ID = location.pathname.split('/').pop();//'/room/여기'

  const videoWidth = 700;
  const videoHeight = 500;

  const { _id, nickname } = currentUser;
  const [initialized, setInitialized] = useState(false);
  const [peers, setPeers] = useState([]);//체크

  useEffect(() => {
    socket.emit('join-room', { roomId: ROOM_ID, userId: _id, nickname });//나중에 꼭 host 데이터 추가하기 host: true 아니면 호스트 아이디?

    socket.on('joined', ({ members, newMember }) => {
      console.log('원래 있던 맴버!!!!', members);
      console.log('새로운 맴버', newMember);
      if (newMember) joinMember(newMember);
      if (members) joinMember(members);
      //joinMember(members);
    });

    socket.on('user left', ({ socketId }) => {
      console.log(socketId);
      console.log('user left');
      deleteLeavingMember(socketId);

      setPeers(peers => {//확실하지 않음...
        const targetPeer = peers.filter(peer => peer.socketId === socketId);
        const rest = peers.filter(peer => peer.socketId !== socketId);
        if (targetPeer) targetPeer.destroy();
        return [ ...rest];
      });

      //if (peers[socketId]) peers[] //확실하지 않음. 나중에 확인
      //if (peers[socketId]) peers[userId].close()
    });

    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setInitialized(true);
      }
      catch (err) {
        console.log(err);
        alert('현재 비디오를 사용하실 수 없습니다.');
      }
    };
    startVideo();

    return () => { //unmountung
      socket.emit('disconnect');
      socket.off();
    }
  }, []);

  useEffect(() => {
    if (!initialized) return;
    console.log("원래 있던 맴버를 돈다. 처음에 딱 한 번만 시행돼야한다.");
    const peers = [];
    for (let key in memberInRoom) {

      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: streamRef.current
      });

      peersRef.current.push({
        peerID: key,
        peer,
      });

      peers.push(peer);
      console.log("dlrp ehla???", peers);

      peer.on('signal', signal => {
        socket.emit('send signal', { signal, to: memberInRoom[key] });
      });

      setPeers(users => ([...users, peer]));
    }
    //console.log("CHECK PEERS", peers);
    //setPeers(peers); ///체크

    ////////////////////////// Reciever

    socket.on('return signal', ({ signal, from }) => {
      console.log('get signal from server');
      const initiator = from;
      console.log("INITIATOR", initiator);
      console.log("RECIVER", socket.id);

      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: streamRef.current,
      });

      peersRef.current.push({
        peerID: from.socketId,
        peer,
      });

      peer.signal(signal);

      peer.on('signal', signal => {

        socket.emit('respond signal', { signal, to: initiator });
      });
      console.log('여기서 새로운 사람이 조인했을 때 반응하고 peer에 추가해야한다.');
      console.log(peersRef.current, "initiator === ", peer);
      console.log('기존 peers', peers);
      setPeers(users => [...users, peer]);
    });

    socket.on('respond signal', ({ signal, from }) => {
      const targetPeer = peersRef.current.find(p => p.peerID === from.socketId);
      console.log(targetPeer, ' === RECIVER');
      console.log(targetPeer.peer);
      targetPeer.peer.signal(signal);
    });

    return () => socket.off();

  }, [initialized]);

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

  return (
    <>
      <div className={styles.Video}>
        <div className={styles.LogoWrapper}>
          <Logo />
        </div>
        <div className={styles.Content}>
          <div className={styles.LeftSide}>
            <div className={styles.CanvasOnVideo}>
              <video id={styles.MyVideo} ref={videoRef} autoPlay muted height={videoHeight} width={videoWidth} onPlay={console.log('handleVideoPlay')} />
              <canvas
                ref={canvasRef}
                className='canvas'
                width={videoWidth}
                height={videoHeight} />
            </div>
            <div className={styles.MenuBar}>
              <MenuBar />
            </div>
          </div>
          <div className={styles.RightSide}>
            {
              peers.map((peer, index) => {
                return <PeerVideo key={index} peer={peer} />;
              })
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoConferenceRoom;
