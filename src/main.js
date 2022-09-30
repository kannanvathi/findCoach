import { createApp, defineAsyncComponent } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/main.css";
import store from "./store/index.js";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

const requestForm = defineAsyncComponent(() =>
  import(/*webpackChunkName: 'request-form'*/ "./views/coach/RequestForm.vue")
);

const someView = defineAsyncComponent(() =>
  import(/*webpackChunkName: 'some'*/ "./views/coach/someView.vue")
);

const app = createApp(App);
app.use(Antd);
app.component("request-form", requestForm);
app.component("some-view", someView);
app.use(router);
app.use(store);

app.mount("#app");
