import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
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

  return (
    !isJoinedRoom
      ? < SettingModal
        isJoinedRoom={isJoinedRoom}
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
