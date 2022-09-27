<template>
  <div class="col-lg-3 mb-3">
    <div class="card">
      <div class="card-header">
        <h4>{{ coach.fName }} {{ coach.lName }}</h4>
      </div>
      <div class="card-body">
        <ul>
          <li>
            <p>{{ coach.email }}</p>
          </li>
          <li>
            <span class="badge bg-primary">{{ coach.skill }}</span>
            <p></p>
          </li>
          <li>
            <p>{{ coach.mobile }}</p>
          </li>
        </ul>
      </div>
      <div class="card-footer">
        <button class="btn btn-warning me-2" @click="coachView(coach.key_id)">
          <view-icon></view-icon>
        </button>
        <button class="btn btn-primary me-2" @click="coachEdit(coach.key_id)">
          <edit-icon> </edit-icon>
        </button>
        <button class="btn btn-danger me-2" @click="coachDelete(coach.key_id)">
          <delete-icon></delete-icon>
        </button>
        <!--<request-form :id="coach.key_id"> </request-form>-->
        <button
          type="button"
          class="btn btn-link"
          @click="openModal(coach.key_id)"
        >
          Request
        </button>
        <!--modals-->
      </div>
    </div>
  </div>
</template>
<script>
//import RequestForm from './RequestForm.vue';
import EditIcon from "../icons/EditIcon.vue";
import DeleteIcon from "../icons/DeleteIcon.vue";
import ViewIcon from "../icons/ViewIcon.vue";

export default {
  components: {
    //RequestForm,
    EditIcon,
    DeleteIcon,
    ViewIcon,
  },
  setup() {},
  data() {
    return {
      show: false,
    };
  },
  props: ["coach"],
  methods: {
    showModal() {
      this.show = true;
    },
    coachView(id) {
      this.$emit("coachView", id);
    },
    coachEdit(id) {
      this.$emit("coachEdit", id);
    },
    coachDelete(id) {
      this.$emit("coachDelete", id);
    },
    openModal(id) {
      this.$emit("openModal", id);
    },
  },
};
</script>
<style scoped></style>
