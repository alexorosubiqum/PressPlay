<template>
  <router-link to="/">
    <button class="backHomeButton">Back to Home Page(Login)</button>
  </router-link>
</template>

<script>
export default {};
</script>

<style>
.backHomeButton {
  display: flex;
  margin: auto;
  border-color: white;
  background-color: black;
  border-radius: 10px;
  border-color: black;
  color: white;
  font-family: "Exo", sans-serif;
  background: rgba(207, 23, 23, 1);
  background: -moz-linear-gradient(
    left,
    rgba(207, 23, 23, 1) 0%,
    rgba(138, 37, 177, 1) 100%
  );
  background: -webkit-gradient(
    left top,
    right top,
    color-stop(0%, rgba(207, 23, 23, 1)),
    color-stop(100%, rgba(138, 37, 177, 1))
  );
  background: -webkit-linear-gradient(
    left,
    rgba(207, 23, 23, 1) 0%,
    rgba(138, 37, 177, 1) 100%
  );
  background: -o-linear-gradient(
    left,
    rgba(207, 23, 23, 1) 0%,
    rgba(138, 37, 177, 1) 100%
  );
  background: -ms-linear-gradient(
    left,
    rgba(207, 23, 23, 1) 0%,
    rgba(138, 37, 177, 1) 100%
  );
  background: linear-gradient(
    to right,
    rgba(207, 23, 23, 1) 0%,
    rgba(138, 37, 177, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#cf1717', endColorstr='#8a25b1', GradientType=1 );
}
</style>