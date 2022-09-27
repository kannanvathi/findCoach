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

export default {
  components: {
    CoachItem,
  },
  setup() {},
  data() {
    return {
      message: "something",
    };
  },
  computed: {
    coaches() {
      return this.$store.state.coachRoute.coaches;
    },
  },
  created() {
    this.$store.dispatch("coachRoute/getCoaches");
  },
  methods: {
    coachView(keyId) {
      this.$store.dispatch("coachRoute/getCoach", keyId);
      this.$router.push({ name: "coach-view", params: { id: keyId } });
    },
    coachEdit(keyId) {
      this.$store.dispatch("coachRoute/getCoach", keyId);
      this.$router.push({
        name: "coach-edit",
        params: { id: keyId },
        query: { mode: "edit" },
      });
    },
    coachDelete(keyId) {
      this.$store.dispatch("coachRoute/deleteCoach", keyId).then((res) => {
        console.log(res);
        this.message = "Coach was deleted";
      });
    },
    openModal(id) {
      this.$router.push({
        name: "request-form",
        params: { id: id },
        query: { show: true },
      });
    },
  },
};
</script>
<style scoped></style>
