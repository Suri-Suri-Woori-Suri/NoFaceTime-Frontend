import { API_METHOD } from '../constants';
import queryString from 'query-string';

export const createGroup = async (userId, groupName, members) => {
  const { POST } = API_METHOD;
  if (groupName.length === 0) return;

  const response = await fetch('http://localhost:5000/groups', {
    method: POST,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ userId, groupName, members })
  });

  const data = await response.json();
  return data;
};

export const addMember = async (groupId, members) => {
  const { POST } = API_METHOD;
  const response = await fetch(`http://localhost:5000/groups/${groupId}/members/`, {
    method: POST,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ members })
  });

  const data = await response.json();
  return data;
};

export const createRoom = async (currentUser, roomName) => {
  const { POST } = API_METHOD;
  if (roomName.length === 0) return;

  const response = await fetch('http://localhost:5000/rooms', {
    method: POST,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ currentUser, roomName })
  });

  const data = await response.json();
  return data;
};

export const deleteGroups = async (userId, selectedGroup) => {
  const { DELETE } = API_METHOD;
  const groupIdToDelete = queryString.stringify({ group: selectedGroup });
  const response = await fetch(`http://localhost:5000/groups/${groupIdToDelete}`, {
    method: DELETE,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ userId })
  });

  return await response.json();
};

export const deleteMember = async (groupId, selectedMember) => {
  const { DELETE } = API_METHOD;
  const membersEmailToDelete = queryString.stringify({ member: selectedMember });

  const response = await fetch(`http://localhost:5000/groups/${groupId}/members/${membersEmailToDelete}`, {
    method: DELETE,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });

  return await response.json();
};

export const getMembers = async (groupId) => {
  const { GET } = API_METHOD;
  const response = await fetch(`http://localhost:5000/groups/${groupId}`, {
    method: GET,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });

  const data = await response.json();
  const { members } = data;
  return members;
};

export const deleteRoom = async (userId, roomId) => {
  const { DELETE } = API_METHOD;

  const response = await fetch(`http://localhost:5000/rooms/${roomId}`, {
    method: DELETE,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ userId })
  });

  const data = await response.json();
  return data;
};
