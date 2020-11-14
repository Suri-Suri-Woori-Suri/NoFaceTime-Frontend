import React from 'react';
import styles from './Room.module.css';
import Sidebar from '../Sidebar/Sidebar';
import ContentWrap from '../ContentWrap/ContentWrap';

const Room = () => {
  return (
    <div className={styles.Body}>
      <Sidebar />
      <ContentWrap />
    </div>
  );
};

export default Room;
