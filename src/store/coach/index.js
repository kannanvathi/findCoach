import axios from "axios";

const coachRoute = {
  namespaced: true,
  state: {
    coaches: [],
    coach: {},
    requests: [],
    fName: {
      val: "",
      isValid: true,
    },
    lName: {
      val: "",
      isValid: true,
    },
    email: {
      val: "",
      isValid: true,
    },
    skill: {
      val: "Frontend",
      isValid: true,
    },
    mobile: {
      val: "",
      isValid: true,
    },
  },
  mutations: {
    coaches(state, payload) {
      state.coaches = payload;
    },
    coach(state, payload) {
      state.coach = payload;
    },
    requests(state, payload) {
      state.requests = payload;
    },
    fName(state, payload) {
      state.fName = {
        val: payload,
        isValid: true,
      };
    },
    lName(state, payload) {
      state.lName = {
        val: payload,
        isValid: true,
      };
    },
    email(state, payload) {
      state.email = {
        val: payload,
        isValid: true,
      };
    },
    mobile(state, payload) {
      state.mobile = {
        val: payload,
        isValid: true,
      };
    },
    skill(state, payload) {
      state.skill = {
        val: payload,
        isValid: true,
      };
    },
  },
  getters: {
    coaches(state) {
      return state.coaches;
    },
  },
  actions: {
    getCoaches({ commit }) {
      axios
        .get(
          "https://vue-backend-e8de7-default-rtdb.firebaseio.com/coaches.json"
        )
        .then((res) => {
          const coaches = [];
          for (let key in res.data) {
            let coach = {
              key_id: key,
              fName: res.data[key].fName,
              lName: res.data[key].lName,
              email: res.data[key].email,
              mobile: res.data[key].mobile,
              skill: res.data[key].skill,
            };
            coaches.push(coach);
          }
          commit("coaches", coaches);
        });
    },
    CoachDetailReset(context) {
      context.commit("coach", {});
      context.commit("fName", "");
      context.commit("lName", "");
      context.commit("email", "");
      context.commit("mobile", "");
      context.commit("skill", "Frontend");
    },
    async getCoach(context, id) {
      await axios
        .get(
          "https://vue-backend-e8de7-default-rtdb.firebaseio.com/coaches/" +
            `${id}.json`
        )
        .then((res) => {
          context.commit("coach", res.data);
          context.commit("fName", res.data.fName);
          context.commit("lName", res.data.lName);
          context.commit("email", res.data.email);
          context.commit("mobile", res.data.mobile);
          context.commit("skill", res.data.skill);
        });
    },
    updateCoach(context, coach) {
      let idToken = context.rootGetters["authRoute/idToken"];
      axios
        .put(
          "https://vue-backend-e8de7-default-rtdb.firebaseio.com/coaches/" +
            `${coach.key_id}.json?auth=` +
            idToken,
          coach
        )
        .then((res) => {
          let coach = res.data;
          let coaches = context.state.coaches;
          coaches.forEach((c, index) => {
            if (c.key_id === coach.key_id) {
              coaches[index] = coach;
            }
          });
          context.commit("coaches", coaches);
        });
    },
    saveCoach(context, coach) {
      let key_id = null;
      let idToken = context.rootGetters["authRoute/idToken"];
      axios
        .post(
          "https://vue-backend-e8de7-default-rtdb.firebaseio.com/coaches.json?auth=" +
            idToken,
          coach
        )
        .then((res) => {
          key_id = res.data.name;
          axios
            .get(
              "https://vue-backend-e8de7-default-rtdb.firebaseio.com/coaches/" +
                `${res.data.name}.json`
            )
            .then((res) => {
              let coaches = context.state.coaches;
              let coach = {
                key_id: key_id,
                fName: res.data.fName,
                lName: res.data.lName,
                email: res.data.email,
                mobile: res.data.mobile,
                skill: res.data.skill,
              };
              coaches.push(coach);
              context.commit("coaches", coaches);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteCoach(context, id) {
      let idToken = context.rootGetters["authRoute/idToken"];
      axios
        .delete(
          "https://vue-backend-e8de7-default-rtdb.firebaseio.com/coaches/" +
            `${id}.json?auth=` +
            idToken
        )
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            context.state.coaches = context.state.coaches.filter(
              (coach) => coach.key_id !== id
            );
          }
        });
    },
    saveRequest(context, user) {
      let idToken = context.rootGetters["authRoute/idToken"];
      let key_id = "";
      axios
        .post(
          "https://vue-backend-e8de7-default-rtdb.firebaseio.com/requests.json?auth=" +
            idToken,
          user
        )
        .then((res) => {
          //https://vue-backend-e8de7-default-rtdb.firebaseio.com/coaches.json'
          console.log(res.data);
          key_id = res.data.name;
          axios
            .get(
              "https://vue-backend-e8de7-default-rtdb.firebaseio.com/requests/" +
                `${key_id}.json`
            )
            .then((res) => {
              let request = {
                id: key_id,
                name: res.data.name,
                email: res.data.email,
                comments: res.data.comments,
              };
              let requests = context.state.requests;
              requests.push(request);
              context.commit("requests", requests);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getRequests(context) {
      let idToken = context.rootGetters["authRoute/idToken"];
      axios
        .get(
          "https://vue-backend-e8de7-default-rtdb.firebaseio.com/requests.json?auth=" +
            idToken
        )
        .then((res) => {
          let requests = [];
          for (let key in res.data) {
            let request = {
              id: key,
              name: res.data[key].name,
              email: res.data[key].email,
              comments: res.data[key].comments,
            };
            requests.push(request);
          }
          console.log(requests);
          context.commit("requests", requests);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};

export default coachRoute;
