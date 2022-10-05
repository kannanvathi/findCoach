<template>
  
  <div class="container mt-3">
    <h4 class="text-center w-100 mb-2 mt-2">Quiz List</h4>
    <a-alert
    v-if="message"
    :message="message"
    type="warning"
    closable
    @close="onClose"
  />
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
      message: null
    };
  },
  mounted() {
     this.$store.dispatch("quizRoute/getQuizzes")
  },
  computed: {
    quizCollection() {
      return this.$store.state.quizRoute.quizzes;
    },
  },
  methods: {
    viewQuizCollection(db_key_id){
      //this.$store.dispatch("quizRoute/getQuiz", db_key_id).then(res => {
        //this.quiz = this.$store.state.quizRoute.quiz;
        this.$router.push({name: 'quiz-view', params: {id: db_key_id}});
      //})
    },
    editQuizCollection(db_key_id){
      this.$store.dispatch("quizRoute/getQuiz", db_key_id).then(res => {
        //this.quiz = this.$store.state.quizRoute.quiz;
        this.$router.push({name: 'quiz-edit', params: {id:db_key_id}});
      })
    },
    deleteQuizCollection(db_key_id){
      this.$store.dispatch("quizRoute/deleteQuiz", db_key_id).then(res => {
        if(res.statusText == 'OK'){
          this.message = 'Quiz collection deleted';
        }
      })
    },
    onClose (e){
      this.message = null;
    }
  },
  created() {},
  setup() {},
};
</script>
<style scoped></style>
