import React from 'react';

import { signInWithGoogle } from '../../utils/firebase';
import styles from './Login.module.css';

const Login = ({ updateUserData }) => {
  const showPopUpToSignIn = async () => {

    try {
      const userData = await signInWithGoogle();
      console.log(userData)//최초가입시 배열이 아니다.
      const { loginUserData } = userData;

      updateUserData({ ...loginUserData });
    } catch (err) {
      console.log(err)
      alert('로그인에 실패했습니다.');
    }
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
    </div>
  );
};

export default Login;
