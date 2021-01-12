import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../Logo/Logo';
import ButtonInHeader from '../ButtonInHeader/ButtonInHeader';
import Sidebar from '../Sidebar/Sidebar';

import styles from './Header.module.css';

const Header = ({
  isLoggedIn,
  updateUserData
}) => {
  return (
    <div className={styles.Header}>
      <Link to='/'>
        <Logo />
      </Link>
      <div className={styles.MenuInHeder}>
        <Sidebar />
        <Link to='/login'>
          <ButtonInHeader
            isLoggedIn={isLoggedIn}
            updateUserData={updateUserData} />
        </Link>
      </div>
    </div>
  );
};

export default Header;
