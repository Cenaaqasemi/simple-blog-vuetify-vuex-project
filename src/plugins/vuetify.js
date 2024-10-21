// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { aliases, mdi } from "vuetify/iconsets/mdi";
// Vuetify
import { createVuetify } from "vuetify";

const vuetify = createVuetify({
    icons: {
      defaultSet: "mdi",
      aliases,
      sets: {
        mdi,
      },
    },
  });
  export default vuetify;
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
