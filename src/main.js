import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "../src/style/global.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "./plugins/vee-validate.js";

createApp(App).use(router).mount("#app");
