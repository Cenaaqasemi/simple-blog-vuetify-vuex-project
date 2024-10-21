import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
loadFonts();

const app = createApp(App);
app.use(router);
app.use(store);
app.use(vuetify);
app.use(Toast);
app.mount("#app");
