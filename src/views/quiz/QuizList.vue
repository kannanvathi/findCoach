<template>
  <p>Quiz List</p>
  <div class="container mt-3">
    <router-view></router-view>
    <div class="row mt-3">
      <div class="col-lg-10 offset-lg-1">
        <div class="accordion" id="accordionQuiz">
          <quiz-item 
          :quiz-container="quizCollection"
          @viewQuizCollection="viewQuizCollection"
          @editQuizCollection="editQuizCollection"
          @deleteQuizCollection="deleteQuizCollection"
          ></quiz-item>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useStore } from "vuex";
import QuizItem from "./QuizItem.vue";
export default {
  components: {
    QuizItem,
  },
  data() {
    return {
      quizCollection: [],
      
    };
  },
  computed: {
    quizCollection() {
      return this.$store.state.quizRoute.quizzes;
    },
    
  },
  methods: {
    viewQuizCollection(db_key_id){
      this.$store.dispatch("quizRoute/getQuiz", db_key_id).then(res => {
        //this.quiz = this.$store.state.quizRoute.quiz;

        this.$router.push({name: 'quiz-view'});
      })
    }
  },
  created() {},
  setup() {},
};
</script>
<style scoped></style>
