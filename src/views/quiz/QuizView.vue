<template>
  <div class="row">
    <div class="col-lg-8 offset-lg-2">
      <a-card :title="quiz.name">
        <template #extra
          ><router-link to="/quiz-app/quiz-list">Back</router-link></template
        >
        <div class="card-body">
          <form  @submit.prevent="quizSubmit" ref="quizAnswer">
            <template v-for="(q, index) in questionAnswer" :key="q.key">
                <h6 class=" mt-2 mb-2">{{q.question}} ?</h6>
              <input
                type="text"
                class="form-control mt-2 mb-2"
                disabled
                name="question"
                hidden
                v-model="q.question"
              />
              <a-radio-group v-model:value="q.answer" class="mb-3" :name="q.answer + '_answer'">
                <a-radio
                  v-for="option in quiz.quizzes[index].options"
                  :key="option.key"
                  :value="option.value"
                  >
                  {{ option.value }}
                  </a-radio
                >
              </a-radio-group>
            </template>
            <br />
            <div class="d-flex align-items-center justify-content-center w-100">
              <a-button html-type="submit" type="primary" class="me-2"
                >Submit</a-button
              >
              <a-button html-type="button" type="secondary" @click="backToList">Cancel</a-button>
            </div>
          </form>
        </div>
        <div class="card-footer"></div>
      </a-card>
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            formData: [],
            optionValue: ''
        }
    },
  computed: {
    quiz() {
      return this.$store.state.quizRoute.quiz;
    },
    questionAnswer() {
        return this.$store.state.quizRoute.q_a;
    }
  },
  mounted() {
    this.$store.dispatch("quizRoute/getQuiz", this.$route.params.id)
  },
  methods: {
    quizSubmit() {
        let correctAnswerCount = this.questionAnswer.filter(qa => {
                return (qa.answer === (qa.correctAnswer.find(ans => qa.answer === ans.value) ? qa.correctAnswer.find(ans => qa.answer === ans.value).value : undefined) && (qa.correctAnswer.find(ans => qa.answer === ans.value).isCorrect? qa.correctAnswer.find(ans => qa.answer === ans.value).isCorrect : false))
        }).length;
        let qaCollection = this.questionAnswer;
        let localId = JSON.parse(localStorage.getItem('localId'));
        let submitData = {
            correctAnswerCount: correctAnswerCount,
            qaCollection: qaCollection,
            userId: localId
        }
        this.$store.dispatch("quizRoute/saveQuizAnswers", submitData).then(res => {
            console.log(res);
            this.$router.push({name: 'quiz-list'});
        }).catch(error =>{
            console.log(error);
        })
    },
    backToList(){
        this.$router.push({name: 'quiz-list'});
    }
  },
  setup() {},
};
</script>
