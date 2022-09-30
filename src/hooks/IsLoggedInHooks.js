import { computed } from "vue";
import { useStore } from "vuex";

export default function isLoggedInHooks() {
  const store = useStore();
  const isLoggedIn = computed(() => {
    if (
      store.state.authRoute.idToken &&
      store.state.authRoute.idToken !== null &&
      store.state.authRoute.idToken !== ""
    ) {
      return true;
    } else {
      return false;
    }
  });
  return {
    isLoggedIn,
  };
}
