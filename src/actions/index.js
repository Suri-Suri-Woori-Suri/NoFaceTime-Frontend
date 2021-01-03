import {
  GET_USER_DATA_FROM_DB,
  ADD_ROOM,
  DELETE_ROOM,
  ADD_GROUP,
  DELETE_GROUPS,
  ADD_MEMBERS,
  DELETE_MEMBERS,
  JOIN_ROOM,
  LEAVE_ROOM,
  ADD_MESSAGE,
  ADD_SECRET_MESSAGE,
  SAVE_TARGET_GROUP_ID
} from '../constants/actionTypes';

export const createActionForUserData = (userData) => {

  return {
    type: GET_USER_DATA_FROM_DB,
    payload: userData
  };
};

export const createActionToAddRoom = (addedRoomData) => {
  return {
    type: ADD_ROOM,
    payload: addedRoomData
  };
};

export const createActionToDeleteRoom = (id) => {
  return {
    type: DELETE_ROOM,
    payload: id
  };
};

export const createActionToAddGroup = (addedGroupData) => {
  return {
    type: ADD_GROUP,
    payload: addedGroupData
  };
};

export const createActionToDeleteGroups = (arrayOfId) => {
  return {
    type: DELETE_GROUPS,
    payload: arrayOfId
  };
};

export const createActionToAddMembers = (groupId, allMemberData) => {
  return {
    type: ADD_MEMBERS,
    payload: { groupId, allMemberData }
  };
};

export const createActionToDeleteMembers = (groupId, arrayOfEmail) => {
  return {
    type: DELETE_MEMBERS,
    payload: { groupId, arrayOfEmail }
  };
};

export const createActionToJoinMembersInRoom = (obj) => {
  return {
    type: JOIN_ROOM,
    payload: obj
  };
};

export const createActionToDeleteMembersInRoom = (members) => {
  return {
    type: LEAVE_ROOM,
    payload: members
  };
};

export const createActionToAddMessage = (message) => {
  return {
    type: ADD_MESSAGE,
    payload: message
  };
};

export const createActionToSecretMessage = (message) => {
  return {
    type: ADD_SECRET_MESSAGE,
    payload: message
  };
};

export const createActionToSaveTargetGroupId = (groupId) => {
  return {
    type: SAVE_TARGET_GROUP_ID,
    payload: groupId
  };
};
