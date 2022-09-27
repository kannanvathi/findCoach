<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <div class="card">
          <div class="card-header">
            <h2 class="text-center">Add Coach</h2>
          </div>
          <div class="card-body" v-if="coach || !coach">
            <form @submit.prevent="saveCoach" ref="coachForm" class="m-3">
              <div class="mb-2">
                <input
                  type="text"
                  class="form-control"
                  @blur="formValidate()"
                  placeholder="first name"
                  v-model="fName.val"
                />
              </div>
              <div class="mb-2">
                <input
                  type="text"
                  class="form-control"
                  @blur="formValidate()"
                  placeholder="last name"
                  v-model="lName.val"
                />
              </div>
              <div class="mb-2">
                <input
                  type="email"
                  class="form-control"
                  @blur="formValidate()"
                  placeholder="email"
                  v-model="email.val"
                />
              </div>
              <div class="mb-2">
                <input
                  type="tel"
                  class="form-control"
                  @blur="formValidate()"
                  placeholder="mobile"
                  v-model="mobile.val"
                />
              </div>
              <div class="mb-2">
                <select
                  name="skill"
                  id=""
                  class="form-control"
                  placeholder="Skill"
                  v-model="skill.val"
                >
                  <option v-for="skill in skills" :key="skill">
                    {{ skill }}
                  </option>
                </select>
              </div>
              <div class="mb-2">
                <button
                  type="submit"
                  class="btn btn-primary me-2"
                  :disabled="!isFormValid"
                >
                  Save
                </button>
                <button class="btn btn-secondary" @click="close()">
                  Cancel
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
  data() {
    return {
      isFormValid: false,
      skills: ["Frontend", "Backend", "Fullstack", "devops", "Automation"],
      message: "",
      mode: "create",
    };
  },
  computed: {
    coach() {
      return this.$store.state.coachRoute.coach;
    },
    fName() {
      return this.$store.state.coachRoute.fName;
    },
    lName() {
      return this.$store.state.coachRoute.lName;
    },
    email() {
      return this.$store.state.coachRoute.email;
    },
    mobile() {
      return this.$store.state.coachRoute.mobile;
    },
    skill() {
      return this.$store.state.coachRoute.skill;
    },
  },
  setup() {},
  created() {
    if (this.$route.query.mode) {
      this.mode = this.$route.query.mode;
      this.$store.dispatch("coachRoute/getCoach", this.$route.params.id);
    } else {
      this.$store.dispatch("coachRoute/CoachDetailReset");
    }
  },
  mounted() {
    console.log("coach form mounted");
  },
  unmounted() {},
  methods: {
    formValidate() {
      let falseCount = 0;
      if (this.fName.val === "") {
        this.fName.isValid = false;
        this.isFormValid = false;
        falseCount++;
      } else if (this.lName.val === "") {
        this.lName.isValid = false;
        this.isFormValid = false;
        falseCount++;
      } else if (this.mobile.val === null && this.mobile.val.length < 10) {
        this.mobile.isValid = false;
        this.isFormValid = false;
        falseCount++;
      } else if (
        this.email.val === "" &&
        !this.email.val.includes("@") &&
        !this.email.val.includes(".")
      ) {
        this.email.isValid = false;
        this.isFormValid = false;
        falseCount++;
      } else if (this.skill.val === "") {
        this.skill.isValid = false;
        this.isFormValid = false;
        falseCount++;
      } else if (falseCount === 0) {
        this.isFormValid = true;
      }
    },
    close() {
      this.$router.push({ name: "coach-list" });
    },
    saveCoach() {
      this.formValidate();
      if (!this.isFormValid) {
        this.message = "Form is invalid";
        return;
      }
      if (this.mode === "create") {
        console.log(this.mode);
        const formData = {
          id: new Date().toISOString(),
          fName: this.fName.val,
          lName: this.lName.val,
          mobile: this.mobile.val,
          email: this.email.val,
          skill: this.skill.val,
        };
        this.$store.dispatch("coachRoute/saveCoach", formData).then((res) => {
          console.log(res);
          this.$refs.coachForm.reset();
          this.$store.dispatch("coachRoute/CoachDetailReset");
          this.formValidate();
        });
      } else {
        const formData = {
          key_id: this.$route.params.id,
          fName: this.fName.val,
          lName: this.lName.val,
          mobile: this.mobile.val,
          email: this.email.val,
          skill: this.skill.val,
        };
        this.$store.dispatch("coachRoute/updateCoach", formData).then((res) => {
          console.log(res);
        });
      }
    },
  },
};
</script>
<style scoped></style>
