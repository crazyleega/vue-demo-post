// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import Axios from 'axios';
import { sync } from 'vuex-router-sync';
import 'element-ui/lib/theme-default/index.css';
import Light from './vue-light/vue-light';
import store from './store';
import App from './App';
import router from './router';
import './filter';

Vue.config.productionTip = false;

Vue.prototype.$http = Axios; // 类似于vue-resource的调用方法
Vue.use(ElementUI);
sync(store, router);

function autoLogin(page, next, token) {
  if (page !== '/' && token) {
    Vue.prototype.$http.defaults.headers.common.Authorization = `Bearer ${token}`; // 注意Bearer后有个空格
  }
  store.dispatch('autoLogin').then(() => {
    next(page);
  }, () => {
    next('/');
  });
}

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('login-token');
  const userInfo = store.state.user.userInfo;  // 手动修改url的时候就没了
  if (!userInfo) {  // 没有登录状态
    if (!token) { // 也没有token
      to.path === '/' ? next() : next('/');
    } else {
      autoLogin(to.path, next, token);
    }
  }
  if (userInfo) {
    if (!token) {
      next('/');
    } else {
      Vue.prototype.$http.defaults.headers.common.Authorization = `Bearer ${token}`; // 注意Bearer后有个空格
      to.path === '/' ? next('/main') : next();
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
});

new Light({
  data: {
    a: 1,
    b: 2,
  },
});
