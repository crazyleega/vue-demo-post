import Axios from 'axios';
import jwt from 'jwt-decode';

export default {
  login: data => Axios.post('/auth/loginByUserName', data),
  loginByToken: () => Axios.post('/auth/loginByToken', { userInfo: jwt(sessionStorage.getItem('login-token')) }),
};
