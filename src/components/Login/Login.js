import React from 'react';
import { useHistory } from 'react-router-dom';

import { signInWithGoogle } from '../../utils/firebase';
import styles from './Login.module.css';

const Login = ({ updateUserData }) => {
  const isUserFromMailInvitation = localStorage.roomLink ? true : false;
  let history = useHistory();

  const showPopUpToSignIn = async () => {
    try {
      const userData = await signInWithGoogle();
      const { loginUserData } = userData;

      updateUserData({ ...loginUserData, isLoggedIn: true });

      if (isUserFromMailInvitation) {
        const roomLink = localStorage.roomLink;

        localStorage.removeItem("roomLink");
        localStorage.removeItem("roomUUID");

        history.push(roomLink);
      }
    } catch (err) {
      console.error(err);
      alert('로그인에 실패했습니다.');
    }
  };

  return (
    <div className={styles.LoginWrap}>
      <div className={styles.Login}>
        <h1>Login</h1>
        <div>
          <p>Two Face Time은</p>
          <p>로그인이 필요합니다.</p>
        </div>
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
