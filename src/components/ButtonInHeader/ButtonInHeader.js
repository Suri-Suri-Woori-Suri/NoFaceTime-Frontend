import React from 'react';
import styles from './ButtonInHeader.module.css';

const ButtonInHeader = ({
  isLoggedIn,
  updateUserData
}) => {
  const buttonClickHandler = () => {
    if (!isLoggedIn) return;

    updateUserData({ isLoggedIn: false });
  };

  return (
    <div className={styles.ButtonInHeader}>
      <button
        className={styles.Button}
        onClick={buttonClickHandler}>
        {isLoggedIn ? 'Sign Out' : 'Sign In'}
      </button>
    </div>
  );
};

export default ButtonInHeader;
