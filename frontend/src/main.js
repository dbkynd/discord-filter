import Vue from "vue";
import App from "./App.vue";
import {} from "@/plugins/axios";
import vuetify from "./plugins/vuetify";
import VueVirtualScroller from 'vue-virtual-scroller'

Vue.config.productionTip = false;

Vue.use(VueVirtualScroller)

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
