<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-4 mt-3" v-for="request in requests" :key="request.id">
        <div class="card">
          <div class="card-header">
            {{ request.name }}
          </div>
          <div class="card-body">
            <ul>
              <li>
                <p>Email: {{ request.email }}</p>
              </li>
              <br />
              <li>
                <p>Comments: {{ request.comments }}</p>
              </li>
            </ul>
          </div>
          <div class="card-footer"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    requests() {
      return this.$store.state.coachRoute.requests;
    },
  },
  setup() {},
  created() {
    this.$store.dispatch("coachRoute/getRequests");
  },
};
</script>
<style scoped></style>
