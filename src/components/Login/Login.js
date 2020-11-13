import React from 'react';
import { signInWithGoogle } from '../../utils/firebase';
import styles from './Login.module.css';

const Login = () => {
  return (
    <div className={styles.Login}>
      <h1>Login</h1>
      <button
        className={styles.GoogleLoginButton}
        onClick={signInWithGoogle}>
        Google Login</button>
    </div>);
};

export default Login;
