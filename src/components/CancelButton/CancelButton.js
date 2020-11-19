import React from 'react';
import styles from './CancelButton.module.css';

const CancelButton = ({
  buttonName,
  onClick
}) => {
  const cancel = onClick;
  console.log("$$$$$$$", cancel);

  return (
    <button
      className={styles.CancelButton}
      onClick={cancel}>
      {buttonName}
    </button>
  );
};

export default CancelButton;
