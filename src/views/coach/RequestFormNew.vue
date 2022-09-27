<template>
  <div :id="id" class="modalDialog" :class="show ? 'show' : ''">
    <div>
      <a class="close" @click="close()" title="Close">X</a>
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="">Request Form</h5>
        </div>
        <div class="modal-body">
          <form @submit.prevent="formSubmit()">
            <div class="mb-2">
              <input type="text" class="form-control" v-model="user.name" />
            </div>
            <div class="mb-2">
              <input type="email" class="form-control" v-model="user.email" />
            </div>
            <div class="mb-2">
              <textarea v-model="user.comments" class="w-100"></textarea>
            </div>
            <div class="mb-2">
              <div
                class="d-flex align-items-center justify-content-center w-100"
              >
                <button
                  type="button"
                  class="btn btn-secondary me-2"
                  @click="close()"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-primary">Request</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {},
  setup() {},
  data() {
    return {
      id: "",
      show: false,
      user: {
        name: "",
        email: "",
        comments: "",
        coach_id: this.id,
      },
    };
  },
  created() {
    this.id = this.$route.params.id;
    console.log(this.id);
    this.show = this.$route.query.show;
  },
  methods: {
    close() {
      this.user = {
        name: "",
        email: "",
        comments: "",
        coach_id: this.id,
      };
      this.$router.push({ name: "coach-list" });
    },
    formSubmit() {
      if (
        this.user.name === "" ||
        this.user.email === "" ||
        this.user.comments === ""
      ) {
        alert("form invalid");
        return;
      }
      this.$store.dispatch("coachRoute/saveRequest", this.user).then((res) => {
        console.log(res);
        this.user = {
          name: "",
          email: "",
          comments: "",
          coach_id: this.id,
        };
        this.$router.push({ name: "coach-list" });
      });
    },
  },
};
</script>
<style scoped>
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.modalDialog {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 99999;
  opacity: 0;
  -webkit-transition: opacity 100ms ease-in;
  -moz-transition: opacity 100ms ease-in;
  transition: opacity 100ms ease-in;
  pointer-events: none;
}
.modalDialog.show {
  opacity: 1;
  pointer-events: auto;
}
.modalDialog > div {
  max-width: 800px;
  width: 90%;
  position: relative;
  margin: 10% auto;
  padding: 20px;
  border-radius: 3px;
  background: #fff;
}
.close {
  font-family: Arial, Helvetica, sans-serif;
  background: #f26d7d;
  color: #fff;
  line-height: 25px;
  position: absolute;
  right: -12px;
  text-align: center;
  top: -10px;
  width: 34px;
  height: 34px;
  text-decoration: none;
  font-weight: bold;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  -moz-box-shadow: 1px 1px 3px #000;
  -webkit-box-shadow: 1px 1px 3px #000;
  box-shadow: 1px 1px 3px #000;
  padding-top: 5px;
}
.close:hover {
  background: #fa3f6f;
}
</style>
