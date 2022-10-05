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
    saveQuizzes(context, quizzesContainer) {
      let result;
      let idToken = context.rootGetters["authRoute/idToken"];
      let localId = context.rootGetters["authRoute/localId"];
      return new Promise((resolve, reject) => {
        axios
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
            let updatedQuizzes = context.state.quizzes;

            updatedQuizzes.push({
              db_key_id: res.data.name,
              name: quizzesContainer.name,
              quizzes: quizzesContainer.quizzes,
              userId: localId,
            });

            context.commit("quizzes", updatedQuizzes);

            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
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
    updateQuiz(context, updateData) {
      return new Promise((resolve, reject) => {
        let idToken = context.rootGetters["authRoute/idToken"];
        axios
          .put(
            `https://vue-backend-e8de7-default-rtdb.firebaseio.com/quizzes/${updateData.db_key_id}.json?auth=` +
              idToken,
            {
              name: updateData.name,
              quizzes: updateData.quizzes,
              userId: updateData.userId,
            }
          )
          .then((res) => {
            let updatedQuizzes = context.state.quizzes;
            updatedQuizzes.forEach((quiz, index) => {
              if (quiz.db_key_id === updateData.db_key_id) {
                updatedQuizzes[index] = {
                  name: res.data.name,
                  quizzes: res.data.quizzes,
                  db_key_id: updateData.db_key_id,
                  userId: res.data.userId,
                };
              }
            });
            context.commit("quizzes", updatedQuizzes);
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    deleteQuiz(context, db_key_id) {
      return new Promise((resolve, reject) => {
        let idToken = context.rootGetters["authRoute/idToken"];
        axios
          .delete(
            `https://vue-backend-e8de7-default-rtdb.firebaseio.com/quizzes/${db_key_id}.json?auth=` +
              idToken
          )
          .then((res) => {
            let quizzes = context.state.quizzes;
            quizzes = quizzes.filter((quizC) => quizC.db_key_id !== db_key_id);
            context.commit("quizzes", quizzes);
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
