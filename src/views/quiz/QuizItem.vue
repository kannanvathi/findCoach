<template>
  <div
    class="accordion-item mt-2"
    v-for="(quizObject, index) in quizContainer"
    :key="quizObject.db_key_id"
  >
    <h2 class="accordion-header" :id="quizObject.db_key_id">
      <button
        class="accordion-button"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target="'collapse_' + index"
        aria-expanded="true"
        :aria-controls="'collapse_' + index"
      >
        <div class="d-flex align-item-center justify-content-between w-100">
          <h3>{{ quizObject.name }}</h3>
          <div class="d-flex">
            <a-button type="primary" class="me-2" @click="editQuizCollection(quizObject.db_key_id)">Edit</a-button>
            <a-button type="secondary" class="me-2" @click="viewQuizCollection(quizObject.db_key_id)">View</a-button>
             <a-button type="secondary" class="me-2" @click="deleteQuizCollection(quizObject.db_key_id)">Delete</a-button>
          </div>
        </div>
      </button>
    </h2>
    <!--<div
      :id="'collapse_' + quiz_index"
      class="accordion-collapse collapse show"
      :aria-labelledby="index"
      data-bs-parent="#accordionQuiz"
      v-for="(quiz, quiz_index) in quizObject.quizzes"
      :key="quiz_index"
    >
      <div class="accordion-body">
        <p class="font-size-16">{{ quiz.question }}</p>
        <ul>
          <li
            v-for="(option, option_index) in quiz.options"
            :key="option_index"
            style="list-style-type: disc"
          >
            {{ option.value }}
          </li>
        </ul>
      </div>
    </div>-->
  </div>
</template>
<script>
export default {
  props: ["quizContainer"],
  methods: {
    editQuizCollection(key){
      this.$emit('editQuizCollection', key);
    },
    viewQuizCollection(key){
      this.$emit('viewQuizCollection', key);
    },
    deleteQuizCollection(key){
      this.$emit('deleteQuizCollection', key);
    }
  },
  setup() {
  },
};
</script>
