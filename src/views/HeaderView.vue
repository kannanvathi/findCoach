<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Find Coach</a>
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
          <!--<li class="nav-item">
            <router-link class="nav-link" to="/google-calender" aria-current="page"
              >Calender</router-link
            >
          </li>-->
        </ul>
        <ul class="d-flex">
          <li class="nav-link">
            <button
              class="btn btn-secondary"
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
</template>
<script>
export default {
  name: "HeaderView",
  setup() {},
  data() {
    return {
      //isLoggedIn: false
    };
  },
  computed: {
    isLoggedIn() {
      if (
        this.$store.state.authRoute.idToken &&
        this.$store.state.authRoute.idToken !== null &&
        this.$store.state.authRoute.idToken !== ""
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  created() {
    /*let idToken = JSON.parse(localStorage.getItem('idToken'));
        if(idToken && idToken !== null && idToken !== ''){
            this.isLoggedIn = true
        }*/
    console.log(this.isLoggedIn);
  },
  methods: {
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
