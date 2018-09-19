import axios from 'axios';
import { Message } from 'element-ui';
import router from '../router/index';
import api from '../api/index';
import * as types from './mutation_types';


export const login = async ({ commit }, req) => {
  const data = {
    userName: req.userName,
    password: req.password,
  };
  axios.post('/auth/loginByUserName', data).then((res) => {
    if (res.data.success) {
      sessionStorage.setItem('login-token', res.data.token);
      Message({
        type: 'success',
        message: '登录成功！',
      });
      commit(types.LOGIN, res.data.data);
      router.push('main');
    } else {
      Message.error(res.data.info);
      sessionStorage.setItem('login-token', null);
    }
  }, () => {
    Message.error('请求错误');
    sessionStorage.setItem('login-token', null);
  });
};

export const logout = async ({ commit }) => {
  commit(types.LOGOUT);
};

export const autoLogin = ({ commit }) => new Promise((resolve, reject) => {
  api.loginByToken().then((res) => {
    if (res.data.success) {
      commit(types.LOGIN, res.data.data);
      resolve('success');
    } else {
      reject('wrong');
    }
  }, () => {
    reject('wrong');
  });
});
