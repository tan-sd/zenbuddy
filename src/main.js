import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "../styling/main.min.css";
import "../styling/style.css";

const app = createApp(App);
app.use(router);
app.config.isCustomElement = tag => tag.startsWith('smart-');
app.mount("#app");
