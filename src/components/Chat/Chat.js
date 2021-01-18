import React from 'react';
import styles from './Chat.module.css';
import { MENU_MODE } from '../../constants/index';

const Chat = ({
  mode,
  nickname,
  message,
  setMessage,
  publicMessage,
  secretMessage,
  sendMessagePublic,
  sendMessageSecretly,
  setSendTo
}) => {
  const { PUBLIC_CHAT } = MENU_MODE;
  const sendMessage = mode === PUBLIC_CHAT ? sendMessagePublic : sendMessageSecretly;
  const targetMessage = mode === PUBLIC_CHAT ? publicMessage : secretMessage;

  const handleTextInputKeyPress = (e) => {
    if (e.key !== 'Enter') return;

    sendMessage(e);
    setMessage('');
    return;
  };

  const handleSendButtonClick = (e) => {
    sendMessage(e);
    setMessage('');
    return;
  };


  const messageList = targetMessage.map((message, index) => {
    const { from, text, to } = message;
    const isSentByUser = nickname === from;

    return (
      isSentByUser
        ? (
          <div key={index} className={styles.MyMessageWrapper}>
            {to
              && <div className={styles.AnswerDescription}>
                <p>host '{from}'님께서 </p>
                <p>'{to}'님께 답변했습니다.</p>
              </div>
            }
            <p className={styles.MyMessage}>{text}</p>
          </div>
        )
        : (
          <div key={index} className={styles.NotMyMessage}>
            <div className={styles.Nickname}>{from}</div>
            <div className={styles.Message} onClick={() => setSendTo(from)}>
              <p className={styles.text}>{text}</p>
            </div>
          </div>
        )
    );
  });

  return (
    <div className={styles.Chat}>
      <div className={styles.Mode} >
        {mode === PUBLIC_CHAT ? 'PUBLIC CHAT' : 'QUESTION CHAT'}
      </div>
      <div className={styles.ChatBox}>
        <div className={styles.MessageList}>{messageList}</div>
        <div className={styles.ChatInputBox}>
          <input
            className={styles.MessageBox}
            type='text'
            value={message}
            placeholder='Type a message...'
            onChange={e => setMessage(e.target.value)}
            onKeyPress={e => handleTextInputKeyPress(e)} />
          <button
            className={styles.SendButton}
            onClick={e => handleSendButtonClick(e)}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
