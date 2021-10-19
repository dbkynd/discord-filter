import Vue from "vue";
import App from "./App.vue";
import {} from "@/plugins/axios";
import vuetify from "./plugins/vuetify";
import store from './store'

Vue.config.productionTip = false;

new Vue({
  vuetify,
  store,
  render: (h) => h(App)
}).$mount("#app");
