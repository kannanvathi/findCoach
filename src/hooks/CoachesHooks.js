import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { clearConfigCache } from "prettier";

export default function coachesHooks() {
  const store = useStore();
  const router = useRouter();
  const searchQuery = ref("");
  const coaches = computed(() => {
    if (searchQuery.value === "") return store.state.coachRoute.coaches;
    else
      return store.state.coachRoute.coaches.filter(
        (coach) =>
          coach.fName.includes(searchQuery.value) ||
          coach.email.includes(searchQuery.value) ||
          coach.lName.includes(searchQuery.value)
      );
  });
  function coachView(keyId) {
    store.dispatch("coachRoute/getCoach", keyId);
    router.push({ name: "coach-view", params: { id: keyId } });
  }
  function coachEdit(keyId) {
    store.dispatch("coachRoute/getCoach", keyId);
    router.push({
      name: "coach-edit",
      params: { id: keyId },
      query: { mode: "edit" },
    });
  }
  function coachDelete(keyId) {
    store.dispatch("coachRoute/deleteCoach", keyId).then((res) => {
      console.log(res);
    });
  }
  function openModal(id) {
    router.push({
      name: "request-form",
      params: { id: id },
      query: { show: true },
    });
  }
  return {
    coachView,
    coachEdit,
    coachDelete,
    openModal,
    coaches,
    searchQuery,
  };
}
