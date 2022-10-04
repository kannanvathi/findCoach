import { createStore } from "vuex";
import coachRoute from "./coach";
import authRoute from "./auth";
import quizRoute from "./quiz";

export default createStore({
  state: {},
  mutations: {},
  getters: {},
  modules: {
    coachRoute: coachRoute,
    authRoute: authRoute,
    quizRoute: quizRoute,
  },
});
