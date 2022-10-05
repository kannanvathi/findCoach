import { createRouter, createWebHistory } from "vue-router";
//import CoachList from "../views/coach/CoachList.vue";
//import CoachForm from "../views/coach/CoachForm.vue";
//import CoachView from "../views/coach/CoachView.vue";
//import RequestList from "../views/request/RequestList.vue";
//import Register from '../views/auth/Register.vue';
import store from "../store/index.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/register",
    },
    {
      path: "/register",
      name: "register",
      //component: Register
      component: () =>
        import(
          /*webpackChunkName: 'register-chunk'*/ "../views/auth/RegisterAnt.vue"
        ),
    },
    {
      path: "/app-list",
      name: "app-list",
      component: () =>
        import(/*webpackChunkName: 'app-list-chunk'*/ "../views/AppList.vue"),
    },
    {
      path: "/quiz-app",
      name: "quiz-app",
      beforeEnter(to, from, next) {
        const idToken = JSON.parse(localStorage.getItem("idToken"));
        const appName = store.state.authRoute.appName;
        if (
          idToken &&
          idToken != "" &&
          idToken != null &&
          appName === "quiz-app"
        ) {
          next(true);
        } else if (
          idToken &&
          idToken != "" &&
          idToken != null &&
          appName !== "quiz-app"
        ) {
          router.push({ name: "app-list" });
        } else {
          router.push({ name: "register" });
        }
      },
      component: () =>
        import(
          /*webpackChunkName: 'quiz-Base-chunk'*/ "../views/quiz/QuizBase.vue"
        ),
      children: [
        {
          path: "quiz-list",
          name: "quiz-list",
          component: () => import(/* */ "../views/quiz/QuizList.vue"),
          children: [
            {
              path: "edit/:id",
              name: "quiz-edit",
              component: () =>
                import(
                  /*webpackChunkName: 'quiz-form-chunk'*/ "../views/quiz/QuizForm.vue"
                ),
            },
            {
              path: "view/:id",
              name: "quiz-view",
              component: () =>
                import(
                  /*webpackChunkName: 'quiz-view-chunk'*/ "../views/quiz/QuizView.vue"
                ),
            },
          ],
        },
        {
          path: "create",
          name: "quiz-create",
          component: () =>
            import(
              /*webpackChunkName: 'quiz-form-chunk'*/ "../views/quiz/QuizForm.vue"
            ),
        },
      ],
    },
    {
      path: "/coaches",
      name: "coach-list",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(
          /* webpackChunkName: 'coach-list-chunk' */ "../views/coach/CoachList.vue"
        ),
      beforeEnter(to, from, next) {
        const idToken = JSON.parse(localStorage.getItem("idToken"));
        const appName = store.state.authRoute.appName;
        console.log(appName);
        if (
          idToken &&
          idToken != "" &&
          idToken != null &&
          appName === "coach-list"
        ) {
          next(true);
        } else if (
          idToken &&
          idToken != "" &&
          idToken != null &&
          appName !== "coach-list"
        ) {
          router.push({ name: "app-list" });
        } else {
          router.push({ name: "register" });
        }
      },
      children: [
        {
          path: "coach-form",
          name: "coach-form",
          //component: CoachForm,
          component: () =>
            import(
              /*webpackChunkName: 'coach-form-chunk'*/ "../views/coach/CoachForm.vue"
            ),
        },
        {
          path: "coach-edit/:id",
          name: "coach-edit",
          //component: CoachForm
          component: () =>
            import(
              /*webpackChunkName: 'coach-form-chunk'*/ "../views/coach/CoachForm.vue"
            ),
        },
        {
          path: ":id",
          name: "coach-view",
          //component: CoachView,
          component: () =>
            import(
              /*webpackChunkName: 'coach-form-chunk'*/ "../views/coach/CoachView.vue"
            ),
          props: { default: true },
        },
        {
          path: "/request-form/:id",
          name: "request-form",
          component: () =>
            import(
              /*webpackChunkName: 'request-form-chunk'*/ "../views/coach/RequestFormNew.vue"
            ),
        },
      ],
    },
    {
      path: "/requests",
      name: "request-list",
      //component: RequestList,
      component: () =>
        import(
          /* webpackChunkName: 'request-list-chunk' */ "../views/request/RequestList.vue"
        ),
      beforeEnter(to, from, next) {
        const idToken = JSON.parse(localStorage.getItem("idToken"));
        console.log(to, from);
        if (idToken && idToken != "" && idToken != null) {
          next(true);
        } else {
          router.push({ name: "register" });
        }
      },
    },
    {
      path: "/google-calender",
      name: "google-calender",
      component: () =>
        import(
          /*webpackChunkName: 'google-calender-chunk'*/ "../views/calender/GoogleCalender.vue"
        ),
    },
  ],
});
router.beforeEach((to, from, next) => {
  next();
});
export default router;
