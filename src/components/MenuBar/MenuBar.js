import React, { useCallback } from 'react';

import MenubarButton from '../MenubarButton/MenubarButton';
import { MENU_MODE } from '../../constants/index';
import styles from './MenuBar.module.css';

const MenuBar = ({
  isMuted,
  toggleAudio,
  onClickOutButton,
  setMode
}) => {
  const {
    MIC,
    OUT,
    INVITE,
    STUDENTS,
    PUBLIC_CHAT,
    SCREEN_SHARE,
    QUESTION_CHAT } = MENU_MODE;

  const handleMenubarButtonClick = useCallback((e) => {
    const targetName = e.currentTarget.name;

    switch (targetName) {
      case PUBLIC_CHAT:
        return setMode(PUBLIC_CHAT);

      case QUESTION_CHAT:
        return setMode(QUESTION_CHAT);

      case SCREEN_SHARE:
        return setMode(SCREEN_SHARE);

      case INVITE:
        return setMode(INVITE);

      case OUT:
        return setMode(OUT);

      default:
        return setMode(STUDENTS);
    }
  }, []);

  return (
    <div className={styles.MenuBarWrapper}>
      <button
        className={isMuted ? `${styles.MenuBar} ${styles.Muted}` : `${styles.MenuBar} ${styles.MicOn}`}
        name={MIC}
        onClick={toggleAudio}>
        {
          !isMuted
            ? <>
              <i className="fas fa-microphone"></i>
              <p className={styles.MenuTitle}>Mic</p>
            </>
            : <>
              <i className="fas fa-microphone-slash"></i>
              <p className={styles.MenuTitle}>Muted</p>
            </>
        }
      </button>
      <MenubarButton handleClick={handleMenubarButtonClick} />
    </div >
  );
};

export default MenuBar;
