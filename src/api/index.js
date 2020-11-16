import { API_METHOD } from '../constants';

export const createGroup = async (currentUser, groupName, members) => {
  const { POST } = API_METHOD;
  if (groupName.length === 0) return;

  const response = await fetch('http://localhost:5000/groups', {
    method: POST,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ currentUser, groupName, members })
  });

  console.log(response);
};

//변수명이 오해의 소지가 있지만 addMember라는 함수가 이미 있어서 일단 post 요청이니 create로 해두었습니다.
export const createMember = async (currentUser, groupId, members) => {
  const { POST } = API_METHOD;
  const response = await fetch(`http://localhost:5000/groups/${groupId}/members`, {
    method: POST,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ currentUser, members })
  });

  console.log(response);
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

  return data.rooms;
};

export const deleteGroup = async (currentUser, selectedGroup) => {
  // selectedGroup 은 선택한 그룹의 아이디가 담긴 배열
  // 삭제해야할 것이 여러개인 경우..
  // groups=[1,2,3]
  const { DELETE } = API_METHOD;
  const groupIdToDelete = selectedGroup.length === 1 ? selectedGroup[0] : 'multipleGroups';
  const response = await fetch(`http://localhost:5000/groups/${groupIdToDelete}`, {
    method: DELETE,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ currentUser, selectedGroup })
  });

  console.log(response);
};

export const deleteMember = async (currentUser, groupId, selectedMember) => {
  // members=[1,2,3]
  const { DELETE } = API_METHOD;
  const memberIdToDelete = selectedMember.length === 1 ? selectedMember[0] : 'multipleMembers';

  const response = await fetch(`http://localhost:5000/groups/${groupId}/members/${memberIdToDelete}`, {
    method: DELETE,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ currentUser, selectedMember })
  });

  console.log(response);
};

export const getMember = async (groupId) => {
  const { GET } = API_METHOD;
  const response = await fetch(`http://localhost:5000/groups/${groupId}`, {
    method: GET,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ groupId })
  });

  console.log(response);
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
  console.log('delete Room!!', data);
  return data.rooms;
};
