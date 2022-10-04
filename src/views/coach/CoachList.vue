<template>
  <div class="container mt-3">
    <div
      class="d-flex align-items-center justify-content-between w-100 mt-2 mb-2"
    >
      <h2>Coaches</h2>
      <nav>
        <router-link to="/coaches/coach-form">Add Coach</router-link>
      </nav>
    </div>
    <router-view> </router-view>

    <div class="row">
      <div class="card p-0 mt-3">
        <div class="card-header">
          <h3>Coach List</h3>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-lg-3 offset-lg-9">
              <input type="text" class="form-control" v-model="searchQuery" />
            </div>
          </div>
          <div class="row">
            <coach-item
              v-for="coach in coaches"
              :key="coach.key_id"
              :coach="coach"
              @coach-view="coachView"
              @coach-edit="coachEdit"
              @coach-delete="coachDelete"
              @open-modal="openModal"
            >
            </coach-item>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CoachItem from "./CoachItem.vue";
import coachesHooks from "../../hooks/CoachesHooks.js";
export default {
  components: {
    CoachItem,
  },
  data() {
    return {
      message: "something",
    };
  },
  setup() {
    const {
      coachView,
      coachEdit,
      coachDelete,
      openModal,
      coaches,
      searchQuery,
    } = coachesHooks();
    return {
      coachView,
      coachEdit,
      coachDelete,
      openModal,
      coaches,
      searchQuery,
    };
  },
  created() {
    this.$store.dispatch("coachRoute/getCoaches");
  },
};
</script>
<style scoped></style>
