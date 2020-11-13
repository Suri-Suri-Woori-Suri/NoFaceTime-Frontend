import React from 'react';
import { Link } from 'react-router-dom';

import ButtonInHeader from '../ButtonInHeader/ButtonInHeader';
import styles from './Header.module.css';

const Header = () => {
  return (
    <div className={styles.Header}>
      <div className={styles.Logo}>
        <span className={styles.letter}>N</span>
        <span className={styles.letter}>o</span>
        <span className={styles.letter}>F</span>
        <span className={styles.letter}>a</span>
        <span className={styles.letter}>c</span>
        <span className={styles.letter}>e</span>
        <span className={styles.letter}>T</span>
        <span className={styles.letter}>i</span>
        <span className={styles.letter}>m</span>
        <span className={styles.letter}>e</span>
      </div>
      <Link to='/login'>
        <ButtonInHeader />
      </Link>
    </div>);
};

export default Header;
