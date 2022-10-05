<template>
  <div class="container">
    <div class="center-container text-center">
      <a-radio-group v-model:value="appName">
        <a-radio-button value="coach-list">Find Coach</a-radio-button>
        <a-radio-button value="quiz-app">Quiz App</a-radio-button>
      </a-radio-group>
      <br /><br /><br />
      <a-button type="primary" class="text-center" @click="navigateApp"
        >Go to App</a-button
      >
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";
export default defineComponent({
  /*computed: {
     app() {
         return this.$store.state.authRoute.appName;
     }
 },
 created() {
     console.log(this.app, 'computed');
 },
 mounted() {
     setTimeout(() => {
         console.log(this.app, 'mounted');
     }, 200) 
     
 },*/
  setup() {
    const router = useRouter();
    const store = useStore();
    const app = computed(() => {
      return store.state.authRoute.appName;
    });
    const appName = ref(app.value === "" ? "coach-list" : app.value);
    function load() {
         let id = JSON.parse(localStorage.getItem("appName_id"));
         if(id !== null){
             axios.get("https://vue-backend-e8de7-default-rtdb.firebaseio.com/currentApp/" +
              `${id}.json`).then(res => {
                   console.log(res.data.appName);
                  appName.value = res.data.appName;
            })
         }
    };
    load();
    function navigateApp() {
        store.dispatch("authRoute/setApp", appName.value).then((res) => {
          if (appName.value === "quiz-app") {
            //store.dispatch("quizRoute/getQuizzes").then((res) => {
              router.push({ name: "quiz-list" });
            //});
          } else router.push({ name: appName.value });
        });
      
    }
    return {
      appName,
      navigateApp,
    };
  },
});
</script>
<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
}
.center-container {
  position: absolute;
  width: 200px;
  height: 100px;
  margin-left: -100px;
  margin-top: -50px;
  top: 50%;
  left: 50%;
}
</style>
