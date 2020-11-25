import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import * as faceapi from 'face-api.js';
import styles from './VideoContainer.module.css';

import SettingModal from '../../components/SettingModal/SettingModal';
import VideoConferenceRoom from '../../components/VideoConferenceRoom/VideoConferenceRoom';

import {
  createActionForUserData,
  createActionToAddRoom,
  createActionToDeleteRoom,
  createActionToAddGroup,
  createActionToDeleteGroups,
  createActionToAddMembers,
  createActionToDeleteMembers,
  createActionToJoinMembersInRoom,
  createActionToDeleteMembersInRoom,
  createActionToSaveTargetGroupId,
  createActionToAddMessage,
  createActionToSecretMessage
} from '../../actions';
import { getRoomHost } from '../../api';

const VideoContainer = ({
  location,
  currentUser,
  memberInRoom,
  joinMember,
  deleteLeavingMember,
  messageList,
  secretMessageList,
  addMessage,
  addSecretMessage
}) => {
  const ROOM_ID = location.pathname.split('/').pop();
  const [isHost, setIsHost] = useState(false);
  const [isJoinedRoom, setIsJoinedRoom] = useState(false);

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

  useEffect(() => {
    const fetchToGetRoomHostData = async () => {
      const hostId = await getRoomHost(ROOM_ID);
      console.log("#####", hostId)
      console.log(currentUser._id)
      if (currentUser._id === hostId) {
        setIsHost(true);
      }
    };

    fetchToGetRoomHostData();
  }, []);

  const videoRef = useRef();
  const streamRef = useRef();
  const videoHeight = 200;
  const videoWidth = 200;
  const [audioMuted, setAudioMuted] = useState(false);

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
      catch (err) {
        console.error(err);
      }
    };

    startVideo();
  }, []);

  const toggleAudio = () => {
    if (streamRef.current) {
      streamRef.current
        .getAudioTracks()
        .forEach(track => track.enabled = audioMuted);
    }

    setAudioMuted(!audioMuted);
  };

  // const handleVideoPlay = () => {
  //   console.log('handle video Play!!!!');

  //   setInterval(async () => {

  //     canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
  //     const displaySize = {
  //       width: 500,
  //       height: 500
  //     };

  //     faceapi.matchDimensions(canvasRef.current, displaySize);

  //     const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
  //     const resizedDetections = faceapi.resizeResults(detections, displaySize);

  //     canvasRef.current.getContext('2d').clearRect(0, 0, 500, 500);
  //     faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
  //     faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
  //     faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);

  //     if (detections.length > 0) {
  //       const xCoord = resizedDetections[0]?.detection?._box?._x;
  //       const yCoord = resizedDetections[0]?.detection?._box?._y;

  //       console.log("X좌표", xCoord, "Y좌표", yCoord);

  //       detections.forEach(element => {
  //         console.log("HERE", element);
  //         let status = "";
  //         let valueStatus = 0.0;
  //         for (const [key, value] of Object.entries(element.expressions)) {
  //           console.log(element.expressions, '##', key, value, status);

  //           if (value > valueStatus) {
  //             status = key;
  //             valueStatus = value;
  //           }
  //         }

  //         //canvasRef.current.fillText = emojis.default;
  //         //anvasRef.current.innerHTML = emojis.default;

  //         const context = canvasRef.current.getContext('2d');
  //         const { _x, _y, _width, _height } = resizedDetections[0].detection._box;
  //         console.log("RESIZED", resizedDetections);


  //         console.log("HAPPY!!!");
  //         // context.drawImage(img, xCoord, yCoord, 100, 100);
  //         // context.font = '300px';
  //         // context.fillText('😎', xCoord, yCoord, 10000  );

  //         const img = new Image();
  //         img.src = 'https://no-face-time.s3.ap-northeast-2.amazonaws.com/Emoji/emoji-sleep-smiley-emoticon-fatigue-tired.jpg';
  //         context.drawImage(img, xCoord - xCoord * 0.25, yCoord - yCoord * 0.25, _width * 1.5, _height * 1.5);
  //       }
  //       );
  //     } else {
  //       console.log("No Faces");
  //       const context = canvasRef.current.getContext('2d');

  //       const img = new Image();
  //       img.src = 'https://no-face-time.s3.ap-northeast-2.amazonaws.com/Emoji/mask_emoji.jpeg';
  //       context.drawImage(img, 0, 0, 500, 500);

  //       //const { _x, _y, _width, _height } = resizedDetections[0].detection._box;
  //     }
  //   }, 1000);
  // };

  return (
    !isJoinedRoom
      ? < SettingModal
        setIsJoinedRoom={setIsJoinedRoom}
        videoRef={videoRef}
        toggleAudio={toggleAudio}
        isHost={isHost}
        audioMuted={audioMuted}
        />
      :
      <VideoConferenceRoom
        location={location}
        joinMember={joinMember}
        currentUser={currentUser}
        memberInRoom={memberInRoom}
        isHost={isHost}
        addMessage={addMessage}
        messageList={messageList}
        addSecretMessage={addSecretMessage}
        secretMessageList={secretMessageList}
        deleteLeavingMember={deleteLeavingMember}
        audioMuted={audioMuted}
        setAudioMuted={setAudioMuted}
      />
  );
};

const mapStateToProps = (state) => {
  const { userReducer, memberInRoomReducer, messageListReducer } = state;
  console.log("MEMBER", memberInRoomReducer)
  return {
    currentUser: userReducer,
    isLoggedIn: userReducer.isLoggedIn,
    memberInRoom: memberInRoomReducer,
    messageList: messageListReducer.public,
    secretMessageList: messageListReducer.secret
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserData: (userData) => { dispatch(createActionForUserData(userData)); },
    addRooms: (addedRoomData) => { dispatch(createActionToAddRoom(addedRoomData)); },
    deleteRooms: (id) => { dispatch(createActionToDeleteRoom(id)); },
    addGroups: (addedGroupData) => { dispatch(createActionToAddGroup(addedGroupData)); },
    deleteGroups: (arrayOfId) => { dispatch(createActionToDeleteGroups(arrayOfId)); },
    addMembers: (groupId, allMemberData) => { dispatch(createActionToAddMembers(groupId, allMemberData)); },
    deleteMembers: (groupId, arrayOfEmail) => { dispatch(createActionToDeleteMembers(groupId, arrayOfEmail)); },
    joinMember: (socketId) => { dispatch(createActionToJoinMembersInRoom(socketId)); },
    deleteLeavingMember: (socketId) => { dispatch(createActionToDeleteMembersInRoom(socketId)); },
    addMessage: (message) => { dispatch(createActionToAddMessage(message)); },
    addSecretMessage: (message) => { dispatch(createActionToSecretMessage(message)); },
    saveTargetGroupId: (groupId) => { dispatch(createActionToSaveTargetGroupId(groupId)); }

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoContainer);
