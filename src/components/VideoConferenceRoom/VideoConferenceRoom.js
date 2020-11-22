import React, { useState, useEffect, useRef } from 'react';
import Peer from "simple-peer";
import { socket } from '../../utils/socket';
import * as faceapi from 'face-api.js';
import PeerVideo from '../PeerVideo/PeerVideo';
import styles from './VideoConferenceRoom.module.css';

const VideoConferenceRoom = ({ location, currentUser, ishost, memberInRoom, joinMember, deleteLeavingMember }) => {
  const videoRef = useRef();
  console.log(location.pathname);
  const ROOM_ID = location.pathname.split('/').pop();//'/room/여기'
  const videoHeight = 500;
  const videoWidth = 500;
  const { _id, nickname } = currentUser;
  const streamRef = useRef();
  const [initialized, setInitialized] = useState(false);
  const peersRef = useRef([]);
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

      setPeers(prev => ([...prev, peer]));
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
    <div>This is main video room
      <video ref={videoRef} autoPlay muted height={videoHeight} width={videoWidth} onPlay={console.log('handleVideoPlay')} />
      {peers.map((peer, index) => {
        return <PeerVideo key={index} peer={peer} />;
      })}
    </div>
  );
};

export default VideoConferenceRoom;
