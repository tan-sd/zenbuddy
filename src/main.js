import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";

const app = createApp(App);
app.use(router);
app.config.isCustomElement = tag => tag.startsWith('smart-');
app.mount("#app");
