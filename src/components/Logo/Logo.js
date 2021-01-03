import React from 'react';

import styles from './Logo.module.css';
import logoImage from '../../assets/TwoFaceTime.gif';

const Logo = () => {
  return (
    <div className={styles.Logo}>
      <img
        src={logoImage}
        alt='Two Face Time gif'
        className={styles.LogoImage} />
    </div>
  );
};

export default Logo;
