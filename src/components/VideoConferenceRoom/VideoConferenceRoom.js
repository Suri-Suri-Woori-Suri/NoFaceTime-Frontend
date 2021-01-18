import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Peer from "simple-peer";

import Logo from '../Logo/Logo';
import MenuBar from '../MenuBar/MenuBar';
import Chat from '../../components/Chat/Chat';
import MyVideo from '../../components/MyVideo/MyVideo';
import HostVideo from '../../components/HostVideo/HostVideo';
import PeerVideoWrapper from '../PeerVideoWrapper/PeerVideoWrapper';
import GroupListInVideoRoom from '../GroupListInVideoRoom/GroupListInVideoRoom';

import { MENU_MODE, SOCKET_EVENT, BACKGROUND_IMG } from '../../constants';
import { socket } from '../../utils/socket';
import { getStream } from '../../utils';
import { loadModels, analyzeFacialExpression, clearAnalyzeFacialExpression } from '../../utils/face-api';
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
  isMuted,
  toggleAudio
}) => {
  const { INVITE, STUDENTS, PUBLIC_CHAT, QUESTION_CHAT, SCREEN_SHARE, OUT } = MENU_MODE;
  const members = Object.values(memberInRoom);
  const currentVideoRoomId = location.pathname.split('/').pop();
  const { _id, nickname } = currentUser;
  const userId = _id;

  const [isStreaming, setIsStreaming] = useState(false);
  const [isLoadedModels, setIsLoadedModels] = useState(false);

  const [mode, setMode] = useState(STUDENTS);
  const [stream, setStream] = useState('');
  const [mySocketId, setMysocketId] = useState('');
  const [hostSocketId, setHostSocketId] = useState('');
  const [peers, setPeers] = useState({});
  const [intervalName, setIntervalName] = useState([]);
  const [socketIdAndIntervalName, setSocketIdAndIntervalName] = useState({});
  const [message, setMessage] = useState('');
  const [sendTo, setSendTo] = useState('');
  const [isNewMember, setIsNewMember] = useState(false);

  const myVideoRef = useRef();
  const myCanvasRef = useRef();
  const peersVideoRef = useRef({});
  const rightSideRef = useRef();

  const init = useCallback(async () => {
    try {
      const stream = await getStream(isMuted);
      myVideoRef.current.srcObject = stream;
      myVideoRef.current.play();

      setStream(stream);
      setIsStreaming(true);
    } catch (err) {
      console.error(err);
    }
  }, [isMuted]);

  const handleStreamSuccess = useCallback(() => {
    init();
    setMode(STUDENTS);
  }, [init, STUDENTS]);

  const handleStreamError = useCallback((err) => {
    console.error("stream error", err);
  }, []);

  const handleScreenShareButtonClick = useCallback(() => {
    navigator.mediaDevices.getDisplayMedia({ video: true })
      .then(stream => {
        myVideoRef.current.srcObject = stream;
        stream.getVideoTracks()[0].addEventListener('ended', handleStreamSuccess, handleStreamError);
      }).catch(err => {
        setMode(STUDENTS);
        handleStreamError(err);
      });
  }, [STUDENTS, handleStreamSuccess, handleStreamError]);

  const sendMessagePublic = () => {
    if (!message) return;

    const data = { text: message, from: nickname };
    setMessage('');

    socket.emit(SOCKET_EVENT.MESSAGE_PUBLIC, data);
  };

  const sendMessageSecretly = () => {
    if (!message) return;

    const data = { text: message, from: nickname, to: sendTo };
    setMessage('');
    addSecretMessage(data);

    socket.emit(SOCKET_EVENT.MESSAGE_SECRET, data);
  };

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (!isStreaming) return;

    loadModels();
    setIsLoadedModels(true);
  }, [isStreaming]);

  useEffect(() => {
    if (!isStreaming || !isLoadedModels) return;

    const canvas = {
      canvasRef: myCanvasRef,
      width: myCanvasRef.current.width,
      height: myCanvasRef.current.height
    };

    const video = {
      videoRef: myVideoRef,
      width: myVideoRef.current.width,
      height: myVideoRef.current.height
    };

    analyzeFacialExpression(canvas, video, setIntervalName);
    setIsLoadedModels(false);
  }, [isStreaming, isLoadedModels, stream, intervalName]);

  useEffect(() => {
    if (!isStreaming) return;

    socket.emit(SOCKET_EVENT.JOIN_ROOM, {
      roomId: currentVideoRoomId,
      userId,
      nickname,
      isHost
    });

    socket.on(SOCKET_EVENT.DUPLICATE, () => {
      alert(' 이미 다른 방에 입장해있습니다!');
      setMode(OUT);
    });

    socket.on(SOCKET_EVENT.JOIN_MYSELF, ({ members, hostSocketId, mySocketId }) => {
      joinMember(members);

      setHostSocketId(hostSocketId);
      setMysocketId(mySocketId);
      setIsNewMember(true);
    });

    socket.on(SOCKET_EVENT.JOIN_NEW_MEMBER, ({ newMember }) => {
      joinMember(newMember);
    });

    socket.on(SOCKET_EVENT.MEMBER_LEFT, ({ leftMemberSocketId }) => {
      delete peersVideoRef.current[leftMemberSocketId];

      setPeers(peers => {
        const { [leftMemberSocketId]: targetPeer, ...restPeers } = peers;
        if (targetPeer) targetPeer.destroy();

        return restPeers;
      });
      deleteLeavingMember(leftMemberSocketId);
    });

    return (() => {
      socket.off(SOCKET_EVENT.DUPLICATE);
      socket.off(SOCKET_EVENT.JOIN_MYSELF);
      socket.off(SOCKET_EVENT.JOIN_NEW_MEMBER);

      socket.emit(SOCKET_EVENT.LEAVE_ROOM);
    });
  }, [
    isStreaming,
    userId,
    nickname,
    isHost,
    currentVideoRoomId,
    joinMember,
    deleteLeavingMember,
  ]);

  useEffect(() => {
    if (!intervalName[0]) return;

    const socketIdPeers = Object.keys(peers);
    if (!socketIdPeers.length) return;


    const socketIds = Object.keys(socketIdAndIntervalName);
    const lastIndex = socketIdPeers.length - 1;
    const socketIdNewPeer = socketIdPeers[lastIndex];
    if (socketIds.includes(socketIdNewPeer)) return;

    const intervalNames = Object.values(socketIdAndIntervalName);
    const newIntervalName = intervalName[intervalName?.length - 1];
    if (intervalNames.includes(newIntervalName)) return;

    const newPeer = { [socketIdNewPeer]: newIntervalName };
    setSocketIdAndIntervalName({ ...socketIdAndIntervalName, ...newPeer });
  }, [peers, intervalName]);

  useEffect(() => {
    if (!hostSocketId) return;
    if (!intervalName[0]) return;

    const socketIds = Object.keys(socketIdAndIntervalName);
    if (socketIds.includes(hostSocketId)) return;

    const intervalNames = Object.values(socketIdAndIntervalName);
    if ((intervalNames).includes(intervalName)) return;

    const newIntervalName = intervalName[intervalName?.length - 1];
    const hostSocketIdAndIntervalName = { [hostSocketId]: newIntervalName };
    setSocketIdAndIntervalName({ ...socketIdAndIntervalName, ...hostSocketIdAndIntervalName });
  }, [hostSocketId, intervalName]);

  useEffect(() => {
    if (!mySocketId) return;
    if (!intervalName[0]) return;

    const socketIds = Object.keys(socketIdAndIntervalName);
    if (socketIds.includes(mySocketId)) return;

    const intervalNames = Object.values(socketIdAndIntervalName);
    if ((intervalNames).includes(intervalName)) return;

    const myIntervalName = intervalName[intervalName?.length - 1];
    const mySocketIdAndIntervalName = { [mySocketId]: myIntervalName };
    setSocketIdAndIntervalName({ ...socketIdAndIntervalName, ...mySocketIdAndIntervalName });
  }, [mySocketId, intervalName]);

  useEffect(() => {
    if (!isNewMember) return;
    if (!isStreaming || !hostSocketId) return;

    for (const key in memberInRoom) {
      const memberSocketId = key;

      if (userId === memberInRoom[key].userId) continue;

      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: stream
      });

      peer.on('signal', signal => {
        socket.emit(SOCKET_EVENT.SEND_SIGNAL_FROM_NEW_MEMBER, { signal, 'receiver': memberSocketId });
      });

      peersVideoRef.current[memberSocketId] = peer;
      setPeers(prev => ({ ...prev, [memberSocketId]: peer }));
    }

    setIsNewMember(false);
  }, [isNewMember, isStreaming, userId, hostSocketId, memberInRoom, stream]);

  useEffect(() => {
    if (!isStreaming || !hostSocketId) return;
    if (isNewMember) return;

    socket.on(SOCKET_EVENT.CONVEY_SIGNAL_FROM_NEW_MEMBER, ({ signal, from }) => {
      const initiator = from;
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: stream
      });

      peer.signal(signal);

      peer.on('signal', signal => {
        socket.emit(SOCKET_EVENT.SENDBACK_SIGANL_FROM_EXISTING_MEMBER, { signal, 'to': from });
      });

      peersVideoRef.current[initiator] = peer;
      setPeers(prev => ({ ...prev, [initiator]: peer }));
    });

    socket.on(SOCKET_EVENT.CONVEY_SIGNAL_FROM_EXISTING_MEMBER, ({ signal, receiver }) => {
      const peer = peersVideoRef.current[receiver];
      peer.signal(signal);
    });

    return (() => {
      socket.off(SOCKET_EVENT.CONVEY_SIGNAL_FROM_NEW_MEMBER);
      socket.off(SOCKET_EVENT.CONVEY_SIGNAL_FROM_EXISTING_MEMBER);
    });
  }, [
    memberInRoom,
    isStreaming,
    isNewMember,
    userId,
    hostSocketId,
    stream
  ]);

  useEffect(() => {
    if (mode === OUT) {
      const stream = myVideoRef.current.srcObject;
      const tracks = stream.getTracks();

      tracks.forEach((track) => {
        track.stop();
        track.enabled = false;
      });

      myVideoRef.current.srcObject = null;

      socket.emit(SOCKET_EVENT.LEAVE_ROOM);
      clearAnalyzeFacialExpression(intervalName);
      setIsStreaming(false);
      window.history.back();
    }
  }, [mode, intervalName]);

  useEffect(() => {
    if (!myCanvasRef.current) return;

    if (mode === SCREEN_SHARE) {
      myCanvasRef.current.style.display = 'none';
      return handleScreenShareButtonClick();
    } else {
      myCanvasRef.current.style.display = 'block';
    }
  }, [mode, SCREEN_SHARE, handleScreenShareButtonClick]);

  useEffect(() => {
    socket.on(SOCKET_EVENT.MESSAGE_PUBLIC, message => {
      addMessage(message);
    });

    socket.on(SOCKET_EVENT.MESSAGE_SECRET, message => {
      addSecretMessage(message);
    });

    return () => {
      socket.off(SOCKET_EVENT.MESSAGE_PUBLIC);
      socket.off(SOCKET_EVENT.MESSAGE_SECRET);
    };
  }, [
    messageList,
    secretMessageList,
    addMessage,
    addSecretMessage,
    nickname
  ]);

  return (
    <div className={styles.VideoConferenceRoom}>
      <div className={styles.LogoWrapper}>
        <Logo />
      </div>
      <div className={styles.Content}>
        <div className={styles.LeftSide}>
          <div className={styles.CanvasOnVideo}>
            {isHost
              ? <MyVideo
                isHost={isHost}
                videoRef={myVideoRef}
                canvasRef={myCanvasRef}
                isMuted={isMuted} />
              : members.map((member, index) => {
                if (member.socketId === hostSocketId) {
                  const host = peersVideoRef.current[hostSocketId];

                  return <HostVideo key={index} host={host} setIntervalName={setIntervalName} />;
                }
                return null;
              })
            }
          </div>
          <div className={styles.MenuBar}>
            <MenuBar
              setMode={setMode}
              isMuted={isMuted}
              toggleAudio={toggleAudio} />
          </div>
        </div>
        <div className={styles.RightSide}>
          <img src={BACKGROUND_IMG.RIGHTSIDE} alt="background" className={styles.BackgroundImage} />
          {
            isHost
              ? <PeerVideoWrapper
                members={members}
                peersVideoRef={peersVideoRef}
                userId={userId}
                mySocketId={mySocketId}
                hostSocketId={hostSocketId}
                setIntervalName={setIntervalName}
                currentVideoRoomId={currentVideoRoomId} />
              : <>
                <MyVideo
                  isHost={isHost}
                  videoRef={myVideoRef}
                  canvasRef={myCanvasRef}
                  isMuted={isMuted} />
                <PeerVideoWrapper
                  members={members}
                  peersVideoRef={peersVideoRef}
                  userId={userId}
                  mySocketId={mySocketId}
                  hostSocketId={hostSocketId}
                  setIntervalName={setIntervalName}
                  currentVideoRoomId={currentVideoRoomId} />
              </>
          }
          <div
            className={styles.RightSideInnerOnMode}
            ref={rightSideRef} >
            {
              (() => {
                switch (mode) {
                  case PUBLIC_CHAT:
                  case QUESTION_CHAT:
                    rightSideRef.current.style.display = "block";
                    return (
                      <Chat
                        mode={mode}
                        nickname={nickname}
                        message={message}
                        setMessage={setMessage}
                        publicMessage={messageList}
                        secretMessage={secretMessageList}
                        sendMessagePublic={sendMessagePublic}
                        sendMessageSecretly={sendMessageSecretly}
                        setSendTo={setSendTo} />
                    );
                  case SCREEN_SHARE:
                    rightSideRef.current.style.display = "none";
                    return;
                  case INVITE:
                    rightSideRef.current.style.display = "block";
                    return (
                      <GroupListInVideoRoom
                        className={styles.Invite}
                        groups={currentUser.groups}
                        sender={currentUser.email} />
                    );
                  case STUDENTS:
                  default:
                    if (rightSideRef.current) return rightSideRef.current.style.display = "none";
                }
              })()
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoConferenceRoom;
