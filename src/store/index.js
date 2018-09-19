import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import getters from './getters';
import * as actions from './actions';
import user from './modules/user';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    user,
  },
  getters,
  actions,
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
