import { createApp } from "vue";
import Toaster from "@meforma/vue-toaster";
import App from "./App.vue";

import "./assets/main.css";

createApp(App).use(Toaster, { position: "bottom-left", duration: 2000, maxToasts: 4 }).mount("#app");
