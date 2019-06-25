import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import axios from "@/axios";

export default new Vuex.Store({
  state: {
    verified: false,
    userInfo: {}
  },
  mutations: {
    disableVerfify(state) {
      state.verified = false;
    },
    SET_USERINFO(state, userInfo) {
      state.userInfo = userInfo;
    },
    SET_VERIFICATION(state, verified) {
      state.verified = verified;
    }
  },
  actions: {
    loadUserInfo({ commit }) {
      axios.get("/getUserData").then(async function(resp) {
        if (resp.data.verified) {
          console.log("verified beeing set", resp.data.verified);
          commit("SET_VERIFICATION", resp.data.verified);
        }
        commit("SET_USERINFO", resp.data.userInfo);
      });
    }
  },

  getters: {}
});
