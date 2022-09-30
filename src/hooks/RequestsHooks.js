import { computed } from "@vue/runtime-core";
import { ref } from "vue";
//import useStore from '../../store/index.js';
import { useStore } from "vuex";

export default function requestHooks() {
  const searchQuery = ref("");
  const store = useStore();
  const requests = computed(() => {
    if (searchQuery.value === "") {
      return store.state.coachRoute.requests;
    } else {
      return store.state.coachRoute.requests.filter((request) => {
        return (
          request.name.includes(searchQuery.value) ||
          request.email.includes(searchQuery.value) ||
          request.comments.includes(searchQuery.value)
        );
      });
    }
  });

  return {
    requests,
    searchQuery,
  };
}
