<template>
  <h2>Coach Details</h2>
  <div class="container">
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <div class="card">
          <div class="card-header">
            <h1>{{ coach.fName }} {{ coach.lName }}</h1>
          </div>
          <div class="card-body">
            <p>Email: {{ coach.email }}</p>
            <br />
            <p>
              Skill: <span class="badge bg-warning">{{ coach.skill }}</span>
            </p>
          </div>
          <div class="card-footer">
            <button class="btn btn-danger" @click="closeView()">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  setup() {},
  //props: ['id'],
  data() {
    return {};
  },
  computed: {
    coach() {
      return this.$store.state.coachRoute.coach;
    },
  },
  created() {
    this.id = this.$route.params.id;
    this.$store.dispatch("coachRoute/getCoach", this.id);
  },
  methods: {
    closeView() {
      this.$router.push({ name: "coach-list" });
    },
  },
};
</script>
<style scoped></style>
