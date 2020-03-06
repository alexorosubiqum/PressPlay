<template>
  <div>
    <div class="head">
      <router-link to="/nav">
        <img class="menuicon" src="@/assets/menuicon.png" />
      </router-link>
    </div>
    <img class="logo" src="@/assets/logo.png" />
    <input class="search" type="text" placeholder="What to see...?" />
    <carousel-3d
      touch
      height="540"
      v-if="shows.length > 0"
      class="carousel"
      :controls-visible="true"
      :clickable="true"
    >
      <slide
        to="/Show"
        class="slide"
        v-for="(show, i) in shows"
        :key="i"
        :index="i"
        style="background-color: transparent"
      >
        <router-link style="text-decoration: none" to="/show">
          <figure class="figure">
            <img class="showImage" :src="show.show.image.original" />
            <figcaption class="showtitle" v-html="show.show.summary"></figcaption>
          </figure>
        </router-link>
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
    return {
      shows: [],
      url: "http://api.tvmaze.com/search/shows?q=sons",
      search: ""
    };
  },
  created() {
    fetch(this.url)
      .then(data => data.json())
      .then(json => {
        let filteredShows = json.filter(show => show.show.image);
        this.shows = filteredShows;
      });
  }
};
</script>

<style>
.head {
  position: absolute;
  margin: auto;
  display: flex;
  justify-content: space-between;
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
  cursor: text;
}

input[type="text"] {
  background-color: white;
  background-position: 10px 10px;
  background-repeat: no-repeat;
  padding-left: 1%;
  font-family: "Exo", sans-serif;
}

.carousel {
  width: 60%;
  background-color: transparent;
  overflow: visible;
}
.slide {
  width: 60%;
  height: 100%;
  border: 0;
}

.showImage {
  border: 0;
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.showtitle {
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  margin: auto;
  text-align: center;
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
