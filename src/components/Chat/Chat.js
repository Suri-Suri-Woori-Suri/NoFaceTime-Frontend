import React, { useState, useEffect } from 'react';
import styles from './Chat.module.css';
import { socket } from '../../utils/socket';
import ScrollToBottom from 'react-scroll-to-bottom';

const Chat = ({ currentUser }) => {//mode를 prop으로 받아야함.
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [secretMessages, setSecretMessages] = useState([]);
  let mode = 'public';
  let nickname = 'woori';

  useEffect(() => {
    socket.on('message-public', message => {//from -> user's nickname, text
      console.log("@@@@@@@,", message); // ex) { from: "woori", text: "sasaasasassss" }
      setMessages([...messages, message]);
    });

    socket.on('message-secret', message => {
      setSecretMessages([...secretMessages, message]);
    });

    return () => { //unmountung
      socket.emit('outof-chat');
      // socket.off(); -> 아마 videoconference Room 에다가 걸어놓으면
      // 따로 할 필요는 없을 것 같은데.. 나중에 시험해야 알 것 같다.
    };
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (!messages) return;

    if (mode === 'public') {
      socket.emit('message-public', message, () => setMessage(''));
    } else {
      socket.emit('message-secret', message, () => setMessage(''));
    }
  };

  const targetMessage = mode === 'public' ? messages : secretMessages;

  const messageList = targetMessage.map((message, i) => {
    const { from, text } = message;
    console.log(from, text);

    const isSentByUser = currentUser.nickname === from ? true : false;
    //isSentByUser를 'MyMessage', 'Message'로 해서 styles이름으로 주고 싶었는데
    // css module에서는 이를 권장하지 않는다고 한다..

    return (
      isSentByUser
        ? (
          <div key={i} className={styles.MyMessage}>
            <p className={styles.text}>{text}</p>
            <p className={styles.Nickname}>{from}</p>
          </div>
        )
        : (
          <div key={i} className={styles.Message}>
            <p className={styles.text}>{text}</p>
            <p className={styles.Nickname}>{from}</p>
          </div>
        )
    );
  })
  console.log(message, messages)

  return (
    <div className={styles.Chat}>
      <div className={styles.ChatBox}>
        <ScrollToBottom className={styles.Messages}>
          {messageList}
        </ScrollToBottom>
        <input
          className={styles.MessageBox}
          type='text'
          value={message}
          placeholder='Type a message...'
          onChange={event => setMessage(event.target.value)}
          onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
        />
        <button
          className={styles.sendButton}
          onClick={(event) => sendMessage(event)}
        >Send</button>
      </div>
    </div>
  );
};

export default Chat;
