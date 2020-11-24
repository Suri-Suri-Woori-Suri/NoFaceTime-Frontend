import queryString from 'query-string';
import { API_METHOD } from '../constants';

export const getUser = async (userId) => {
  const { GET } = API_METHOD;

  const response = await fetch(`https://localhost:5000/users/${userId}`, {
    method: GET,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
  });

  const data = response.json();

  return data;
};

export const createGroup = async (userId, groupName, members) => {
  const { POST } = API_METHOD;

  if (!groupName.length) return;

  const response = await fetch('https://localhost:5000/groups', {
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

  const response = await fetch(`https://localhost:5000/groups/${groupId}/members/`, {
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

  if (!roomName.length) return;

  const response = await fetch('https://localhost:5000/rooms', {
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

export const deleteGroup = async (userId, selectedGroup) => {
  const { DELETE } = API_METHOD;
  const groupIdToDelete = queryString.stringify({ group: selectedGroup });

  const response = await fetch(`https://localhost:5000/groups/${groupIdToDelete}`, {
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

  const response = await fetch(`https://localhost:5000/groups/${groupId}/members/${membersEmailToDelete}`, {
    method: DELETE,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });

  return await response.json();
};

export const deleteRoom = async (userId, roomId) => {
  const { DELETE } = API_METHOD;

  const response = await fetch(`https://localhost:5000/rooms/${roomId}`, {
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

export const getRoomHost = async (roomUUID) => {
  const { GET } = API_METHOD;

  const serverRoute = 'https://localhost:5000/rooms/' + roomUUID;

  const response = await fetch(serverRoute, {
    method: GET,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });

  const data = await response.json();
  const { roomData } = data;
  console.log("$$$$$$$", roomData);
  const roomHost = roomData[0].host;

  return roomHost;
};

export const sendMailToMembers = async (sender, receiver, roomLink, groupId) => {
  const { POST } = API_METHOD;

  const serverRoute = `https://localhost:5000/groups/${groupId}/members/mail`;

  const response = await fetch(serverRoute, {
    method: POST,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ sender, receiver, roomLink, groupId })
  });

  const result = await response.json();

  if (result.message === 'ok') {
    alert('초대 메일을 보냈습니다!');
  }

  return result;
};;

// export const getMember = async (groupId) => {
//   const { GET } = API_METHOD;
//   const response = await fetch(`http://localhost:5000/groups/${groupId}`, {
//     method: GET,
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     credentials: 'include'
//   });

//   const data = await response.json();
//   const { members } = data;
//   return members;
// };
