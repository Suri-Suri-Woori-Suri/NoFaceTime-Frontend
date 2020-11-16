import React from 'react';
import styles from '.CompleteButton.module.css';

const CompleteButton = ({
  buttonName,
  fetchToServer
}) => {

  return (
    <button
      calssName={styles.CompleteButton}
      onClick={fetchToServer}>
      {buttonName}
    </button>
  );
};

export default CompleteButton;