<template>
  <!-- Button trigger modal -->

  <button
    type="button"
    class="btn btn-primary"
    data-bs-toggle="modal"
    :data-bs-target="keyId"
  >
    Request
  </button>
  <!-- Modal -->
  <div
    class="modal fade"
    :id="id"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Request Form</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
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
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-primary">Request</button>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["id"],
  computed: {
    keyId() {
      return "#" + this.id;
    },
  },
  setup() {},
  data() {
    return {
      user: {
        name: "",
        email: "",
        comments: "",
        coach_id: this.id,
      },
    };
  },
  methods: {
    formSubmit() {
      if (
        this.user.name === "" ||
        this.user.email === "" ||
        this.user.comments === ""
      ) {
        alert("form invalid");
        return;
      }
      this.$store.dispatch("coachRoute/saveRequest", this.user);
    },
  },
};
</script>
<style scoped></style>
