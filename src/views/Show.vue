<template>
  <div>
    <div class="head">
      {{test}}
      <img class="usericon" src="@/assets/usericon.png" />
      <img class="logo" src="@/assets/logo.png" />
      <img class="menuicon" src="@/assets/menuicon.png" />
    </div>
    <img src="https://placehold.it/360x270" />
  </div>
</template>

<script>
export default {
  props: ["test"],
  data() {
    return {
      url: "http://api.tvmaze.com/shows",
      shows: []
    };
    console.log(shows);
  },

  created() {
    fetch(this.url)
      .then(data => data.json())
      .then(json => (this.shows = json.id));
  }
};
</script>

<style>
.head {
  margin: auto;
  display: flex;
  justify-content: space-between;
}

.usericon {
  width: 40px;
  height: 50px;
}
.menuicon {
  width: 40px;
  height: 50px;
}

.logo {
  display: flex;
  margin: auto;
}
</style>