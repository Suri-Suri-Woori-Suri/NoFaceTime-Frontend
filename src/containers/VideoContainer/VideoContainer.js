import React, { useState, useEffect, useCallback } from 'react';
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
  const roomId = location.pathname.split('/').pop();
  const [isHost, setIsHost] = useState(false);
  const [isJoinedRoom, setIsJoinedRoom] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const toggleAudio = useCallback(() => {
    setIsMuted(!isMuted);
  }, [isMuted]);

  useEffect(() => {
    (async () => {
      const hostId = await getRoomHost(roomId);

      if (currentUser._id === hostId) setIsHost(true);
    })();
  }, [roomId, currentUser._id]);

  return (
    !isJoinedRoom
      ? < SettingModal
        setIsJoinedRoom={setIsJoinedRoom}
        toggleAudio={toggleAudio}
        isMuted={isMuted} />
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
        isMuted={isMuted}
        toggleAudio={toggleAudio} />
  );
};

const mapStateToProps = (state) => {
  const { userReducer, memberInRoomReducer, messageListReducer } = state;

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
