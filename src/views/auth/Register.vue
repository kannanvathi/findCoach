<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <div class="card">
          <div class="card-header text-center">
            <h2>{{ actionName }}</h2>
          </div>
          <div class="card-body">
            <form @submit.prevent="formSubmit()" ref="userForm">
              <div class="mb-2">
                <input type="email" class="form-control" v-model="user.email" />
              </div>
              <div class="mb-2">
                <input
                  type="password"
                  class="form-control"
                  v-model="user.password"
                />
              </div>
              <div class="mb-2">
                <button type="submit" class="btn btn-primary me-2">
                  {{ actionName }}
                </button>
                <button
                  type="button"
                  class="btn btn-link"
                  @click="toggleAction()"
                >
                  {{ toggleText }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "RegisterView",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      toggleText: "Switch to Login",
      actionName: "Register",
    };
  },
  methods: {
    formSubmit() {
      if (
        this.user.email === "" ||
        !this.user.email.includes("@") ||
        !this.user.email.includes(".") ||
        this.user.password.length < 6
      ) {
        alert("form input invalid");
        return;
      }
      if (this.actionName === "Register") {
        this.$store
          .dispatch("authRoute/saveUser", {
            email: this.user.email,
            password: this.user.password,
          })
          .then((res) => {
            console.log(res);
            this.$refs.userForm.reset();
            this.$router.push({ name: "coach-list" });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.$store
          .dispatch("authRoute/login", {
            email: this.user.email,
            password: this.user.password,
          })
          .then((res) => {
            console.log(res);
            this.$refs.userForm.reset();
            this.$router.push({ name: "coach-list" });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    toggleAction() {
      if (this.actionName === "Register") {
        (this.actionName = "Login"), (this.toggleText = "Switch to Register");
      } else {
        this.actionName = "Register";
        this.toggleText = "Swtich to Login";
      }
    },
  },
};
</script>
<style scoped></style>
