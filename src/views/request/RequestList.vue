<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-3 offset-lg-9">
        <input type="text" class="form-control" v-model="searchQuery" />
      </div>
    </div>
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
import { ref, watch } from "vue";
import requestHooks from "../../hooks/RequestsHooks.js";
export default {
  /*computed: {
    requests() {
      return this.$store.state.coachRoute.requests;
    },
  },*/
  setup() {
    let { requests, searchQuery } = requestHooks();

    return {
      requests,
      searchQuery,
    };
  },
  created() {
    this.$store.dispatch("coachRoute/getRequests");
  },
};
</script>
<style scoped></style>
