import React from 'react';
import { signInWithGoogle } from '../../utils/firebase';
import styles from './Login.module.css';

const Login = () => {
  const showPopUpToSignIn = async () => {
    const loginResult = await signInWithGoogle();
  };

  return (
    <div className={styles.LoginWrap}>
      <div className={styles.Login}>
        <h1>Login</h1>
        <button
          className={styles.GoogleLoginButton}
          onClick={showPopUpToSignIn}>
          Google Login
        </button>
      </div>
    </div >
  );
};

export default Login;
