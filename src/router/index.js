import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/page/index';
import Main from '@/page/post/main';
import Addpost from '@/page/post/addPost';
import PostDetail from '@/page/post/postDetail';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
    },
    {
      path: '/addPost',
      name: 'addpost',
      component: Addpost,
    },
    {
      path: '/postDetail/:postId',
      name: 'postDetail',
      component: PostDetail,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});

