import io from 'socket.io-client';
export const socket = io('localhost:5000');

// export const joinRoom = (data) => {
//   socket.emit('join-room', data);
// }

// export const joinedRoom = (callback) => {
//   socket.on('joined', ({ members, host }) => {
//     console.log('원래 있던 맴버!!!!', members);
//     callback(members);
//     console.log('socket Id of host', host);
//   });
// };

// export const joinedNewMember = (callback) => {
//   socket.on('joined-newMember', newMember => {
//     console.log('새로운 맴버', newMember);
//     callback(newMember);
//   });
// };

// export const getPublicMessage = (messages, setMessages) => {
//   console.log('public messages')
//   socket.on('message-public', message => {//from -> user's nickname, text
//     console.log("@@@@@@@,", message); // ex) { from: "woori", text: "sasaasasassss" }
//     setMessages([...messages, message]);
//   });
// };

// export const getSecretMessage = (secretMessages, setSecretMessages) => {
//   console.log("SOCKET secret messages", secretMessages)
//   console.log(setSecretMessages)
//   socket.on('message-secret', message => {
//     setSecretMessages([...secretMessages, message]);
//   });
// };



