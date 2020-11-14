import React from 'react';
import styles from './ContentWrap.module.css';
import RoomContent from '../RoomContent/RoomContent';

const ContentWrap = () => {
  return (
    <div className={styles.ContentWrap}>
      <h1 className={styles.Title}>Welcome!</h1>
      <RoomContent />
    </div>
  );
};

export default ContentWrap;
