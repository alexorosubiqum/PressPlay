<template>
  <div id="app">
    <Home></Home>
    <Show test="example text"></Show>
  </div>
</template>

<script>
import Home from "./views/Home.vue";
import Show from "./views/Show.vue";
export default {
  components: {
    Home,
    Show
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
