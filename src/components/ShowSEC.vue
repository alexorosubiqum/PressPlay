<template>
  <div>
    <div class="head">
      <router-link to="/menu">
        <img class="menuicon" src="@/assets/menuicon.png" />
      </router-link>
    </div>
    <img class="showimage" :src="show.image.original" />
    <router-link to="/">
      <button class="backHomeButton">Back to Home Page(Show)</button>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: null,
      url: "http://api.tvmaze.com/shows/1505"
    };
  },

  created() {
    fetch(this.url)
      .then(data => data.json())
      .then(json => (this.show = json));
  }
};
</script>

<style>
.head {
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.showimage {
  display: flex;
  border-radius: 10px;
  width: 60%;
  margin: auto;
}

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
