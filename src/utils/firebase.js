import axios from 'axios';

import { authService, googleProvider } from '../config/firebase';
import { API_METHOD } from '../constants';

export const signInWithGoogle = () => {
  googleProvider.addScope('email');

  return authService.signInWithPopup(googleProvider)
    .then(async (userInfo) => {
      const { POST } = API_METHOD;
      const postData = {
        email: userInfo.additionalUserInfo.profile.email,
        nickname: userInfo.additionalUserInfo.profile.userName,
      };

      const authorizedUserWithToken = await axios.post({
        method: POST,
        url: 'http://localhost:5000/login',
        data: postData
      }).then((response) => {
        console.log("token?", response);
      });

      return authorizedUserWithToken;
    }).catch((error) => {
      console.error(error);
    });
};
