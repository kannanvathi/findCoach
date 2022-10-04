import axios from "axios";
import router from "../../router/index.js";

const authRoute = {
  namespaced: true,
  state: {
    expiresIn: "",
    idToken: "",
    localId: "",
    expiresInTime: null,
    appName: "",
  },
  mutations: {
    setUser(state, payload) {
      state.expiresIn = payload.expiresIn;
      state.idToken = payload.idToken;
      state.localId = payload.localId;
      state.expiresInTime = payload.expiresInTime;
    },
    removeUser(state) {
      state.expiresIn = "";
      state.idToken = "";
      state.localId = "";
      state.appName = "coach-list";
      state.expiresInTime = null;
    },
    appName(state, appName) {
      state.appName = appName;
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
  },
  actions: {
    async saveUser(context, user) {
      await axios
        .post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDc3PunQfVuw1b21TW7Wp31KGr2Oc_twy4",
          {
            email: user.email,
            password: user.password,
            returnSecureToken: true,
          }
        )
        .then((res) => {
          let date = new Date();
          let expiresInTime = date.getTime() + res.data.expiresIn * 1000;
          const payload = {
            expiresIn: res.data.expiresIn,
            idToken: res.data.idToken,
            localId: res.data.localId,
            expiresInTime: expiresInTime,
          };
          context.commit("setUser", payload);
          localStorage.setItem("expiresIn", JSON.stringify(res.data.expiresIn));
          localStorage.setItem("idToken", JSON.stringify(res.data.idToken));
          localStorage.setItem("localId", JSON.stringify(res.data.localId));
          localStorage.setItem("expiresInTime", JSON.stringify(expiresInTime));
        })
        .catch((error) => {
          console.log(error);
        });
    },
    autoCredential(context) {
      context.commit("setUser", {
        expiresIn: JSON.parse(localStorage.getItem("expiresIn")),
        idToken: JSON.parse(localStorage.getItem("idToken")),
        localId: JSON.parse(localStorage.getItem("localId")),
        expiresInTime: JSON.parse(localStorage.getItem("expiresInTime")),
      });
    },
    logout(context) {
      localStorage.removeItem("expiresIn");
      localStorage.removeItem("idToken");
      localStorage.removeItem("localId");
      localStorage.removeItem("expiresInTime");
      localStorage.removeItem("appName_id");
      context.commit("removeUser");
    },
    autoLogout(context) {
      //console.log(context);
      setTimeout(() => {
        localStorage.removeItem("expiresIn");
        localStorage.removeItem("idToken");
        localStorage.removeItem("localId");
        localStorage.removeItem("expiresInTime");
        localStorage.removeItem("appName_id");
        context.commit("removeUser");
      }, Number(context.expiresIn) * 1000);
      /*let currentDate = new Date();
      let currentTime = currentDate.getTime();
      if (currentTime < expiresInTime) {
        context.actions("logout");
      }*/
    },
    login(context, user) {
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
              setTimeout(() => {
                localStorage.removeItem("expiresIn");
                localStorage.removeItem("idToken");
                localStorage.removeItem("localId");
                localStorage.removeItem("expiresInTime");
                localStorage.removeItem("appName_id");
                context.commit("removeUser");
                router.push({ name: "app-list" });
              }, Number(context.state.expiresIn) * 1000);
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
            context.commit("appName", appName);
          });
      } else {
        let id = JSON.parse(localStorage.getItem("appName_id"));
        await axios
          .get(
            "https://vue-backend-e8de7-default-rtdb.firebaseio.com/currentApp/" +
              `${id}.json`
          )
          .then((res) => {
            let appName = res.data.appName;
            context.commit("appName", appName);
          });
      }
    },
  },
  modules: {},
};
export default authRoute;
