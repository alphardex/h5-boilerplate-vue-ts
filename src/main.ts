import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import directives from "./directives";

const app = createApp(App);
app
  .use(store)
  .use(router)
  .use(directives)
  .mount("#app");
