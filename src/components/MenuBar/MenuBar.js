import React, { useState } from 'react';
import styles from './MenuBar.module.css';

const MenuBar = ({
  isMuted,
  setAudio,
  toggleAudio,
  setMode
}) => {
  // const [muted, setMuted] = useState(isMuted); // isMuted === true -> 음소거!
  // const [isClickedPublicChat, setIsClickedPublicChat] = useState(false);
  // const [isClickedQuestionChat, setIsClickedQuestionChat] = useState(false);
  // const [isClickedNote, setIsClickedNote] = useState(false);
  // const [isClickedEmoji, setIsClickedEmoji] = useState(true);
  // const [isClickedInvite, setIsClickedInvite] = useState(false);


  const handleClick = (e) => {
    console.log("Target", e.currentTarget.name);

    if (e.currentTarget.name === "mic") {
      //setIsMuted(!isMuted); //상위 컴포넌트에서 받은 프랍, 실제로 음소거 시킬 수 있도록-> 추후에 프랍 받으면 주석 풀기
      toggleAudio();
    }
    else if (e.currentTarget.name === "PublicChat") {
      // setIsClickedPublicChat(!isClickedPublicChat);
      setMode('PublicChat');
    } else if (e.currentTarget.name === "QuestionChat") {
      // setIsClickedQuestionChat(!isClickedQuestionChat);
      setMode('QuestionChat');
    } else if (e.currentTarget.name === "Note") {
      // setIsClickedNote(!isClickedNote);
      setMode('Note');
    } else if (e.currentTarget.name === "Emoji") {
      // setIsClickedEmoji(!isClickedEmoji);
      setMode('Emoji');
    } else if (e.currentTarget.name === "Invite") {
      // setIsClickedInvite(!isClickedInvite);
      setMode('Invite');
    }
  };

  return (
    <div className={styles.MenuBar}>
      <button className={styles.MenuButton} name="mic" onClick={(e) => handleClick(e)}>
        {
          isMuted
            ? <>
              <i class="fas fa-microphone"></i>
              <p className={styles.MenuTitle}>Mic</p>
            </>
            : <>
              <i class="fas fa-microphone-slash"></i>
              <p className={styles.MenuTitle}>Mute</p>
            </>
        }
      </button>
      <button className={styles.MenuButton} name="PublicChat" onClick={(e) => handleClick(e)}>
        <i class="fas fa-user-friends"></i>
        <p className={styles.MenuTitle}>Public Chat</p>
      </button>
      <button className={styles.MenuButton} name="QuestionChat" onClick={(e) => handleClick(e)}>
        <i class="fas fa-chalkboard-teacher" name="QuestionChat" onClick={(e) => handleClick(e)}></i>
        <p className={styles.MenuTitle} name="QuestionChat" onClick={(e) => handleClick(e)}>Question Chat</p>
      </button>
      <button className={styles.MenuButton} name="Note" onClick={(e) => handleClick(e)}>
        <i class="fas fa-book-open"></i>
        <p className={styles.MenuTitle}>Note</p>
      </button>
      <button className={styles.MenuButton} name="Emoji" onClick={(e) => handleClick(e)}>
        <i class="far fa-laugh"></i>
        <p className={styles.MenuTitle}>Students</p>
      </button>
      <button className={styles.MenuButton} name="Invite" onClick={(e) => handleClick(e)}>
        <i class="fas fa-user-plus"></i>
        <p className={styles.MenuTitle}>Invite</p>
      </button>
    </div >
  );
};

export default MenuBar;
