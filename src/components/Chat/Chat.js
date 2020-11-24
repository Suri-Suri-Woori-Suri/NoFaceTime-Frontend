import React, { useState, useEffect } from 'react';
import styles from './Chat.module.css';
// import { socket } from '../../utils/socket';
import ScrollToBottom from 'react-scroll-to-bottom';

const Chat = ({ message, setMessage, sendMessage, targetMessage, nickname, setSendTo }) => {


  console.log("%%%%", sendMessage);

  const messageList = targetMessage.map((message, i) => {
    const { from, text, to } = message;
    const isSentByUser = nickname === from;

    return (
      isSentByUser
        ? (
          <div key={i} className={styles.MyMessage}>
            <p className={styles.text}>{text}</p>
            {to && <p className={styles.Nickname}>{from}가 {to}에게..</p>}
          </div>
        )
        : (
          <div>
            <button key={i} className={styles.Message} onClick={() => setSendTo(from)}>
              <p className={styles.text}>{text}</p>
            </button>
            <p className={styles.Nickname}>{from}</p>
          </div>
        )
    );
  })

  return (
    <div className={styles.Chat}>
      <div className={styles.ChatBox}>
        {/* <ScrollToBottom className={styles.Messages}> */}
        {messageList}
        {/* </ScrollToBottom> */}
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
