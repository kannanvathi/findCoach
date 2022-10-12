import axios from "axios";
import config from "../../config";

const randomQuiz = {
  namespaced: true,
  state: {
    isCompleted: false,
    marks: 0,
    quizCollection: [],
    quiz: {},
    completedQuizCollection: [],
    selectAnswer: "",
  },
  mutations: {
    isCompleted(state, payload) {
      state.isCompleted = payload;
    },
    marks(state, payload) {
      state.marks += 1;
    },
    quizCollection(state, payload) {
      state.quizCollection = payload;
    },
    quiz(state, payload) {
      state.quiz = payload;
    },
    completedQuizCollection(state, payload) {
      state.completedQuizCollection = payload;
    },
    selectAnswer(state, payload) {
      state.selectAnswer = payload;
    },
  },
  getters: {},
  actions: {
    getRandomNum(length) {
      return Math.floor(Math.random() * length);
    },
    getTriviaApi(context) {
      return new Promise((resolve, reject) => {
        axios
          .get("https://the-trivia-api.com/api/questions")
          .then((res) => {
            context.state.quizCollection = res.data;
            let randomNum = Math.floor(
              Math.random() * context.state.quizCollection.length
            );
            console.log(randomNum);
            context.commit("quiz", context.state.quizCollection[randomNum]);
            context.state.completedQuizCollection.push(context.state.quiz);
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    selectAnswer(context, selected) {
      context.commit("selectAnswer", selected);
    },
    saveAnswers(context, answerData) {
      let token = context.rootGetters["authRoute/token"];
      let bearer = context.rootGetters["authRoute/bearer"];
      context.commit("marks");
      if (
        context.state.quizCollection.length ===
        context.state.completedQuizCollection.length
      ) {
        context.commit("isCompleted", 1);
      }
      if (context.state.isCompleted === 0) {
        let randomNum = Math.floor(
          Math.random() * context.state.quizCollection.length
        );
        context.commit("quiz", context.state.quizCollection[randomNum]);
        while (
          context.state.completedQuizCollection.find(
            (quiz) => quiz.id === context.state.quiz.id
          )
        ) {
          randomNum = Math.floor(
            Math.random() * context.state.quizCollection.length
          );
          context.state.quiz = context.state.quizCollection[randomNum];
        }
        context.state.completedQuizCollection.push(context.state.quiz);
      }

      return new Promise((resolve, reject) => {
        axios
          .post(
            import.meta.env.VITE_BASE_URL + "quiz",
            {
              quiz_id: "1",
              question_api_id: answerData.id,
              question: answerData.question,
              select_answer: context.state.selectAnswer,
              correct_answer: answerData.correctAnswer,
              incorrect_answers: answerData.incorrectAnswers,
              type: answerData.type,
              is_completed: context.state.isCompleted,
              marks: context.state.marks,
            },
            config.getHeaders(token, bearer)
          )
          .then((res) => {
            resolve(res);
          })
          .catch((error) => reject(error));
      });
    },
    autoCompletion(context, quiz_id = 1) {
      let token = context.rootGetters["authRoute/token"];
      let bearer = context.rootGetters["authRoute/bearer"];
      return new Promise((resolve, reject) => {
        axios
          .post(
            import.meta.env.VITE_BASE_URL + "quiz-status",
            { quiz_id: quiz_id },
            config.getHeaders(token, bearer)
          )
          .then((res) => {
            context.commit("isCompleted", res.data.is_completed);
            if (res.data.quiz_status) {
              context.commit("marks", res.data.quiz_status.marks);
            }
          });
      });
    },
  },
};

export default randomQuiz;
