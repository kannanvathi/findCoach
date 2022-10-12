<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">FIND {{appName.split("-")[0].toUpperCase()}}</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <template
            v-if="appName === 'coach-list'"
          >
             <li class="nav-item">
              <router-link class="nav-link" to="/coaches" aria-current="page"
                >Coach</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/requests" aria-current="page"
                >Request</router-link
              >
            </li>
          </template>

          
          <template
            v-else-if="appName=== 'quiz-app'"
          >
            <li class="nav-item">
              <router-link class="nav-link" to="/quiz-app/quiz-list" aria-current="page"
                >Quiz List</router-link
              >
            </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/quiz-app/create" aria-current="page"
                  >Create Quiz</router-link
                >
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/quiz-app/random-quiz" aria-current="page"
                  >Play Random Quiz</router-link
                >
              </li>
          </template>
          <li class="nav-item">
            <button class="btn btn-link" @click="getUsers()">Get users</button>
          </li>
        </ul>
        <ul class="d-flex">
          <li class="nav-link">
            <button
              class="btn btn-link"
              @click="logout()"
              v-if="isLoggedIn"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <sidebar-view></sidebar-view>
</template>
<script >
import { computed } from '@vue/runtime-core';
import isLoggedInHooks from "../hooks/IsLoggedInHooks.js";
import { useStore } from "vuex"

export default {
  name: "HeaderView",
  components: {

  },
  setup() {
    const store = useStore();
    const { isLoggedIn } = isLoggedInHooks();
    const appName = computed(() => {
      return store.state.authRoute.appName;
    })

   
    return {
      isLoggedIn,
      appName,
    
    };
  },
  data() {
    return {
      //isLoggedIn: false
    };
  },

  created() {
    /*let idToken = JSON.parse(localStorage.getItem('idToken'));
        if(idToken && idToken !== null && idToken !== ''){
            this.isLoggedIn = true
        }*/
    console.log(this.isLoggedIn);
  },
  methods: {
    getUsers() {
      this.$store.dispatch("authRoute/getUsers").then(res => {
        console.log(res);
      }).catch(error => console.log(error));
    },  
    logout() {
      this.$store.dispatch("authRoute/logout").then((res) => {
        console.log(res);
        this.$router.push({ name: "register" });
      });
    },
  },
};
</script>
<style>
nav {
  margin-top: 0 !important;
  margin-left: 0 !important;
}
</style>
