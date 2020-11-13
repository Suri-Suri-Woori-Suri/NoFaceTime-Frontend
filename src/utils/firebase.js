import { authService, googleProvider } from '../config/firebase';
import { API_METHOD } from '../constants';

export const signInWithGoogle = () => {
  googleProvider.addScope('email');

  authService.signInWithPopup(googleProvider)
    .then(async (userInfo) => {
      console.log("GOOGLE", userInfo);
      const { POST } = API_METHOD;
      const postData = {
        email: userInfo.additionalUserInfo.profile.email,
        nickname: userInfo.additionalUserInfo.profile.name,
      };

      fetch('http://localhost:5000/login', {
        method: POST,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      }).then((result) => {
        console.log("LOGIN 된 후에 돌아온 데이터", result);
        console.log("그 데이터의 body", result.body);
        return result.json();
      }).then((data) => {
        console.log('제발', data);
      }).catch((err) => {
        console.error(err);
      });
    }).catch((err) => {
      console.error(err);
    });
};
