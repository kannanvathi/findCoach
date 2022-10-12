import axios from "axios";
import router from "../../router/index.js";
import config from "../../config.js";

const authRoute = {
  namespaced: true,
  state: {
    expiresIn: "",
    idToken: "",
    localId: "",
    expiresInTime: null,
    appName: "",
    laravelUser: {},
    authorisation: {},
  },
  mutations: {
    setUser(state, payload) {
      state.expiresIn = payload.expiresIn;
      state.idToken = payload.idToken;
      state.localId = payload.localId;
      state.expiresInTime = payload.expiresInTime;
      state.authorisation = payload.authorisation;
      state.laravelUser = payload.laravelUser;
    },
    removeUser(state) {
      state.expiresIn = "";
      state.idToken = "";
      state.localId = "";
      state.appName = "coach-list";
      state.expiresInTime = null;
      state.laravelUser = {};
      state.authorisation = {};
    },
    appName(state, appName) {
      state.appName = appName;
    },
    laravelUser(state, payload) {
      state.laravelUser = payload;
    },
    authorisation(state, payload) {
      state.authorisation = payload;
    },
  },
  getters: {
    expiresIn(state) {
      return state.expiresIn;
    },
    idToken(state) {
      return state.idToken;
    },
    localId(state) {
      return state.localId;
    },
    token(state) {
      return state.authorisation.token;
    },
    bearer(state) {
      return state.authorisation.bearer;
    },
  },
  actions: {
    saveUser(context, user) {
      return new Promise((reslove, reject) => {
        axios
          .post(
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDc3PunQfVuw1b21TW7Wp31KGr2Oc_twy4",
            {
              email: user.email,
              password: user.password,
              returnSecureToken: true,
            }
          )
          .then((res) => {
            const expiresIn = res.data.expiresIn;
            const idToken = res.data.idToken;
            const localId = res.data.localId;
            let date = new Date();
            const expiresInTime = date.getTime() + res.data.expiresIn * 1000;
            reslove(res);
            return new Promise((resolve, reject) => {
              axios
                .post(import.meta.env.VITE_BASE_URL + "register", {
                  name: "dummy",
                  email: user.email,
                  password: user.password,
                })
                .then((res) => {
                  const authorisation = res.data.authorisation;
                  const laravelUser = res.data.laravelUser;
                  const payload = {
                    expiresIn: expiresIn,
                    idToken: idToken,
                    localId: localId,
                    expiresInTime: expiresInTime,
                    authorisation: authorisation,
                    laravelUser: laravelUser,
                  };
                  context.commit("setUser", payload);
                  localStorage.setItem(
                    "expiresIn",
                    JSON.stringify(res.data.expiresIn)
                  );
                  localStorage.setItem(
                    "idToken",
                    JSON.stringify(res.data.idToken)
                  );
                  localStorage.setItem(
                    "localId",
                    JSON.stringify(res.data.localId)
                  );
                  localStorage.setItem(
                    "expiresInTime",
                    JSON.stringify(expiresInTime)
                  );
                  localStorage.setItem(
                    "token",
                    JSON.stringify(authorisation.token)
                  );
                  localStorage.setItem(
                    "laravelUser",
                    JSON.stringify(laravelUser)
                  );
                  resolve(res);
                })
                .catch((error) => reject(error));
            });
          })
          .catch((error) => {
            reject(error);
            console.log(error);
          });
      });
    },
    setTime(context) {
      let timeOut;
      if (timeOut) clearTimeout(timeOut);

      timeOut = setTimeout(() => {
        localStorage.removeItem("expiresIn");
        localStorage.removeItem("idToken");
        localStorage.removeItem("localId");
        localStorage.removeItem("expiresInTime");
        localStorage.removeItem("appName_id");
        localStorage.removeItem("appName");
        localStorage.removeItem("laravelUser");
        localStorage.removeItem("authorisation");
        context.commit("removeUser");
        router.push({ name: "register" });
      }, Number(context.state.expiresIn) * 1000);
    },
    autoCredential(context) {
      context.commit("setUser", {
        expiresIn: JSON.parse(localStorage.getItem("expiresIn")),
        idToken: JSON.parse(localStorage.getItem("idToken")),
        localId: JSON.parse(localStorage.getItem("localId")),
        expiresInTime: JSON.parse(localStorage.getItem("expiresInTime")),
        authorisation: JSON.parse(localStorage.getItem("authorisation")),
        laravelUser: JSON.parse(localStorage.getItem("laravelUser")),
      });

      context.dispatch("setTime");
    },
    logout(context) {
      let token = context.state.authorisation.token;
      let bearer = context.state.authorisation.bearer;

      return new Promise((resolve, reject) => {
        axios
          .post(
            import.meta.env.VITE_BASE_URL + "logout",
            {},
            config.getHeaders(token, bearer)
          )
          .then((res) => {
            localStorage.removeItem("expiresIn");
            localStorage.removeItem("idToken");
            localStorage.removeItem("localId");
            localStorage.removeItem("expiresInTime");
            localStorage.removeItem("appName_id");
            localStorage.removeItem("appName");
            localStorage.removeItem("laravelUser");
            localStorage.removeItem("authorisation");
            context.commit("removeUser");
            resolve(res);
          })
          .catch((error) => reject(error));
      });
    },
    login(context, user) {
      console.log(import.meta.env.VITE_BASE_URL + "login");
      return new Promise((resolve, reject) => {
        axios
          .post(
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDc3PunQfVuw1b21TW7Wp31KGr2Oc_twy4",
            {
              email: user.email,
              password: user.password,
              returnSecureToken: true,
            }
          )
          .then((res) => {
            if (res.status === 200) {
              let date = new Date();
              let expiresInTime = date.getTime() + res.data.expiresIn * 1000;
              const payload = {
                expiresIn: res.data.expiresIn,
                idToken: res.data.idToken,
                localId: res.data.localId,
                expiresInTime: expiresInTime,
              };
              context.commit("setUser", payload);
              localStorage.setItem(
                "expiresIn",
                JSON.stringify(res.data.expiresIn)
              );
              localStorage.setItem("idToken", JSON.stringify(res.data.idToken));
              localStorage.setItem("localId", JSON.stringify(res.data.localId));
              localStorage.setItem(
                "expiresInTime",
                JSON.stringify(expiresInTime)
              );
              res.statusText = "Login Successfully";
              resolve(res);

              //set timeout for logout

              context.dispatch("setTime");

              return new Promise((resolve, reject) => {
                axios
                  .post(import.meta.env.VITE_BASE_URL + "login", {
                    email: user.email,
                    password: user.password,
                  })
                  .then((res) => {
                    //console.log(res.data.authorisation, res.data.user);
                    context.commit("laravelUser", res.data.user);
                    context.commit("authorisation", res.data.authorisation);
                    localStorage.setItem(
                      "laravelUser",
                      JSON.stringify(res.data.user)
                    );
                    localStorage.setItem(
                      "authorisation",
                      JSON.stringify(res.data.authorisation)
                    );

                    resolve(res);
                  })
                  .catch((error) => {
                    console.log(error);
                    reject(error);
                  });
              });
            }
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },

    async setApp(context, appName) {
      let key_id = null;
      let idToken = context.state.idToken;
      if (
        localStorage.getItem("appName_id") === null ||
        context.state.appName !== appName
      ) {
        await axios
          .post(
            "https://vue-backend-e8de7-default-rtdb.firebaseio.com/currentApp.json?auth=" +
              idToken,
            { appName: appName }
          )
          .then((res) => {
            key_id = res.data.name;
            localStorage.setItem("appName_id", JSON.stringify(key_id));
            localStorage.setItem("appName", JSON.stringify(appName));
            context.commit("appName", appName);
          });
      } else {
        let id = JSON.parse(localStorage.getItem("appName_id"));
        let lAppName = JSON.parse(localStorage.getItem("appName"));
        context.commit("appName", lAppName);

        /*await axios
          .get(
            "https://vue-backend-e8de7-default-rtdb.firebaseio.com/currentApp/" +
              `${id}.json`
          )
          .then((res) => {
            let appName = res.data.appName;
            context.commit("appName", appName);
          });*/
      }
    },
    getUsers(context) {
      return new Promise((resolve, reject) => {
        let token = context.state.authorisation.token;
        let bearer = context.state.authorisation.type;
        axios
          .get(
            import.meta.env.VITE_BASE_URL + "users",
            config.getHeaders(token, bearer)
          )
          .then((res) => {
            resolve(res);
          })
          .catch((error) => reject(error));
      });
    },
  },
  modules: {},
};
export default authRoute;
