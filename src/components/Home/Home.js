import React from 'react';
import styles from './Home.module.css';
import { BACKGROUND_IMG } from '../../constants';

const Home = () => {
  return (
    <div className={styles.Home}>
      <div className={styles.ServiceDescription}>
        <p>
          <b>Enjoy</b>
          <br />
          your vedeo meeting
          <br />
          with emojis
        </p>
      </div>
      <div className={styles.ServiceImage}>
        <img
          src={BACKGROUND_IMG.NOTEBOOK}
          alt="notebook"
          className={styles.NoteBook} />
      </div>
    </div>
  );
};

export default Home;
