import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";
import store from "./store";
import VueChatScroll from "vue-chat-scroll";
Vue.use(VueChatScroll);

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount("#app");
