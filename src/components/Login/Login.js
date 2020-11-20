import React from 'react';
import { useHistory } from 'react-router-dom';

import { signInWithGoogle } from '../../utils/firebase';
import { getRoomHost, getUser } from '../../api/index';
import styles from './Login.module.css';

const Login = ({ updateUserData }) => {
  const isUserFromMailInvitation = localStorage.roomLink ? true : false;
  let history = useHistory();

  const showPopUpToSignIn = async () => {
    try {
      const userData = await signInWithGoogle();
      const { loginUserData } = userData;

      updateUserData({ ...loginUserData });

      if (isUserFromMailInvitation) {
        const roomLink = localStorage.roomLink;
        /* 여기에 초대 받은 사람이 들어오려는 건지 인증 절차가 들어가야 함! 아직 구현 안됨  */
        const hostId = await getRoomHost(localStorage.roomUUID);
        await getUser(hostId);

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
