import { authService, googleProvider } from '../config/firebase';
import { API_METHOD } from '../constants';

export const signInWithGoogle = () => {
  googleProvider.addScope('email');

  authService.signInWithPopup(googleProvider)
    .then(async (userInfo) => {
      const { POST } = API_METHOD;
      const postData = {
        email: userInfo.additionalUserInfo.profile.email,
        nickname: userInfo.additionalUserInfo.profile.name,
      };

      fetch('http://localhost:5000/login', {
        method: POST,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      }).then((result) => {
        return result.json();
      }).then((data) => {
        return data;
      }).catch((err) => {
        console.error(err);
      });
    }).catch((err) => {
      console.error(err);
    });
};
