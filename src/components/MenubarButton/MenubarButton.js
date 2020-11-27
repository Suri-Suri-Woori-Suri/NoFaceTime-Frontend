import React from 'react';
import { MENU_MODE } from '../../constants/index';
import styles from './MenubarButton.module.css';

const MenubarButton = ({ handleClick, stopVideo }) => {
  const {
    NOTE,
    INVITE,
    STUDENTS,
    PUBLIC_CHAT,
    SCREEN_SHARE,
    QUESTION_CHAT } = MENU_MODE;

  const menuIcons = [
    [PUBLIC_CHAT, "fas fa-user-friends"],
    [QUESTION_CHAT, "fas fa-chalkboard-teacher"],
    [SCREEN_SHARE, "fas fa-desktop"],
    [NOTE, "fas fa-book-open"],
    [STUDENTS, "far fa-laugh"],
    [INVITE, "fas fa-user-plus"],
  ];

  const goBack = () => {
    stopVideo();
    window.history.back();
  }

  const menus = menuIcons.map((icon, index) => {
    const [menuName, iconName] = icon;
    return (
      <button
        key={index}
        className={styles.MenuButton}
        name={menuName}
        onClick={(e) => handleClick(e)}>
        <i className={iconName}></i>
        <p className={styles.MenuTitle}>{menuName}</p>
      </button>
    );
  })

  return (
    <>
    {menus}
    <button onClick={goBack}>Leave</button>
    </>
  );
};

export default MenubarButton;
