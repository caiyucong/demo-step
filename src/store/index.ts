import { createStore } from "vuex";
export interface UserData {
  username: string;
  password: string;
  repPassword: string;
  nickname: string;
}
export default createStore({
  state: {
    userData: {
      username: "",
      password: "",
      repPassword: "",
      nickname: "",
    },
    userInfo: {},
  },
  getters: {},
  mutations: {
    updateUserData(state, newValue) {
      state.userData = newValue;
    },
    updateUserInfo(state, newValue) {
      state.userInfo = newValue;
    },
  },
  actions: {},
  modules: {},
});
