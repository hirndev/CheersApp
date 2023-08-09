import "./assets/css/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";

import App from "./App.vue";
import router from "./router";

// Vee-Validate
import veeValidatePlugin from "./utils/validation";

const app = createApp(App);
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi"
  }
});

app.use(createPinia());
app.use(router);

app.use(vuetify);
app.use(veeValidatePlugin);
app.mount("#app");
