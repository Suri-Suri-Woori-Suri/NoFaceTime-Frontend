import React from 'react';
import styles from './SmallSuccessButton.module.css';

const SmallButton = ({
  buttonName,
  link,
  clickEventFunction
}) => {

  return (
    <button
      className={styles.SmallSuccessButton}
      id={link}
      value={link}
      onClick={(e) => clickEventFunction(e)}>
      {buttonName}
    </button>
  );
};

export default SmallButton;
