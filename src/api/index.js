import { API_METHOD } from '../constants';

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
