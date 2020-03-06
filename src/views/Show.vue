<template>
  <div>
    <div class="head">
      <img class="usericon" src="@/assets/usericon.png" />
      <img class="logo" src="@/assets/logo.png" />
      <img class="menuicon" src="@/assets/menuicon.png" />
    </div>
    <img class="showimage" :src="show.image.original" />
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

.showimage {
  display: flex;
  width: 60%;
  margin: auto;
}
</style>
