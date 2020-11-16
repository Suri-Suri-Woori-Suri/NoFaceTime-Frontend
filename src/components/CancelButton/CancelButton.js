import React from 'react';
import styles from '.CancelButton.module.css';

const CancelButton = ({
  buttonName,
  onClick
}) => {
  const fetchToServer = onClick;

  return (
    <button
      calssName={styles.CancelButton}
      onClick={fetchToServer}>
      {buttonName}
    </button>
  );
};

export default CancelButton;