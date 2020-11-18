import React, { useState, useEffect } from 'react';
import ConfigureModal from '../ConfigureModal/ConfigureModal';
import styles from './Cam.module.css';

const Cam = () => {
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {

  }, [isConfigured]);

  return (
    <div className={styles.CamBackgrond}>
      <ConfigureModal />
    </div>
  );
};

export default Cam;
