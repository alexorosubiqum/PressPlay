<template>
  <div>
    <div class="head">
      <img class="usericon" src="@/assets/usericon.png" />
      <img class="menuicon" src="@/assets/menuicon.png" />
    </div>
    <img class="logo" src="@/assets/logo.png" />
    <input class="search" type="text" />
    <carousel-3d class="carousel" :controls-visible="true" :clickable="false">
      <slide v-for="(slide, i) in slides" :key="i" :index="i">
        <figure>
          <img src="https://placehold.it/360x270" />
          <figcaption class="showtitle">
            cyka blyat idi nahuy
          </figcaption>
        </figure>
      </slide>
    </carousel-3d>
  </div>
</template>

<script>
import { Carousel3d, Slide } from "vue-carousel-3d";

export default {
  components: {
    Carousel3d,
    Slide
  },
  data() {
    return { slides: 10 };
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
.search {
  display: flex;
  margin: auto;
  border-radius: 10px;
  border-color: black;
}

.carousel {
  width: 200px;
  height: 340px;
  overflow: visible;
}
.showtitle {
  text-align: center;
  border-color: white;
  background-color: black;
  border-radius: 10px;
  color: white;
  font-family: "Exo", sans-serif;
}
</style>
