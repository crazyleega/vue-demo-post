import * as types from '../mutation_types';

const state = {
  userInfo: null,
};

const mutations = {
  [types.LOGIN](data, userInfo) {
    data.userInfo = userInfo;
  },
  [types.LOGOUT](data) {
    data.userInfo = null;
  },
};

export default {
  state,
  mutations,
};
