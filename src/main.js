import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import { TroisJSVuePlugin } from "troisjs";

const app = createApp(App);
app.use(router).use(TroisJSVuePlugin);

app.mount("#app");
