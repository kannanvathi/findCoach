import axios from "axios";

const quizRoute = {
  namespaced: true,
  state: {
    quizzes: [],
    quiz: {},
    q_a: [],
  },
  mutations: {
    quizzes(state, payload) {
      state.quizzes = payload;
    },
    quiz(state, payload) {
      state.quiz = payload;
    },
    q_a(state, payload) {
      state.q_a = payload;
    },
  },
  getters: {
    quizzes(state) {
      return state.quizzes;
    },
  },
  actions: {
    async saveQuizzes(context, quizzesContainer) {
      let result;
      let idToken = context.rootGetters["authRoute/idToken"];
      let localId = context.rootGetters["authRoute/localId"];
      await axios
        .post(
          "https://vue-backend-e8de7-default-rtdb.firebaseio.com/quizzes.json?auth=" +
            idToken,
          {
            name: quizzesContainer.name,
            quizzes: quizzesContainer.quizzes,
            userId: localId,
          }
        )
        .then((res) => {
          console.log(res.data);
          result = res.data;
        });
      return result;
    },
    getQuizzes(context) {
      axios
        .get(
          "https://vue-backend-e8de7-default-rtdb.firebaseio.com/quizzes.json"
        )
        .then((res) => {
          let quizzesContainer = [];
          let localId = context.rootGetters["authRoute/localId"];

          for (let key in res.data) {
            let quizContainer = {};
            if (res.data[key].userId === localId) {
              quizContainer = {
                db_key_id: key,
                name: res.data[key].name,
                quizzes: res.data[key].quizzes,
                userId: res.data[key].userId,
              };
            }
            quizzesContainer.push(quizContainer);
          }
          context.commit("quizzes", quizzesContainer);
        });
    },
    getQuiz(context, db_key_id) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            "https://vue-backend-e8de7-default-rtdb.firebaseio.com/quizzes/" +
              `${db_key_id}.json`
          )
          .then((res) => {
            context.commit("quiz", res.data);
            let q_a = [];
            res.data.quizzes.forEach((q) => {
              let QA = {
                key: q.key,
                question: q.question,
                answer: "",
              };
              let correctAnswer = q.options.filter(
                (option) => option.isCorrect === true
              );
              QA.correctAnswer = correctAnswer;
              q_a.push(QA);
            });
            context.commit("q_a", q_a);
            resolve(res.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    saveQuizAnswers(context, answers) {
      return new Promise((resolve, reject) => {
        let idToken = context.rootGetters["authRoute/idToken"];
        axios
          .post(
            "https://vue-backend-e8de7-default-rtdb.firebaseio.com/quizAnswers.json?auth=" +
              idToken,
            {
              userId: answers.userId,
              correctAnswerCount: answers.correctAnswerCount,
              qaCollection: answers.qaCollection,
            }
          )
          .then((res) => {
            console.log(res.data);
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  modules: {},
};
export default quizRoute;
