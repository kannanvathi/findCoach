import { createStore } from "vuex";
import coachRoute from "./coach";
import authRoute from "./auth";

export default createStore({
  state: {},
  mutations: {},
  getters: {},
  modules: {
    coachRoute: coachRoute,
    authRoute: authRoute,
  },
});
