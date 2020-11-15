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

export const deleteGroup = async (currentUser, checkedGroup) => {
  //checkedGroup 은 선택한 그룹의 아이디가 담긴 배열

  const { DELETE } = API_METHOD;
  const groupIdToDelete = checkedGroup.length === 1 ? checkedGroup[0] : 'multiplegroups';
  const response = await fetch(`http://localhost:5000/groups/${groupIdToDelete}`, {
    method: DELETE,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ currentUser, checkedGroup })
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

  console.log(response);
};

export const deleteRoom = async (currentUser, roomId) => {
  const { DELETE } = API_METHOD;

  const response = await fetch(`http://localhost:5000/rooms/${roomId}`, {
    method: DELETE,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ currentUser, roomId })
  });

  console.log(response);
};
