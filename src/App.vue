<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import LiveChat from "./views/LiveChat.vue";
import Show from "./components/ShowSEC.vue";
import Nav from "./components/Nav.vue";
export default {
  components: {
    Home,
    Show,
    Nav,
    Login,
    LiveChat
  }
};
</script>

<style>
body {
  background-color: black;
}

body h1,
h2,
h3,
h4,
p {
  color: white;
  font-family: "Exo", sans-serif;
}
</style>
