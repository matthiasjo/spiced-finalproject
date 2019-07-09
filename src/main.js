import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "normalize.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import * as VueGoogleMaps from "vue2-google-maps";
import gmapskey from "../gmapskey.json";

Vue.use(VueGoogleMaps, {
  load: {
    key: gmapskey.GMAPS_API,
    libraries: "places" // necessary for places input
  }
});

import BootstrapVue from "bootstrap-vue";

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
