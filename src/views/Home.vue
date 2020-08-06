<template>
  <div>
    <img class="logo" src="@/assets/logo.png" />
    <div id="searchBar">
      <input class="search" type="text" placeholder="What to see...?" v-model="search" />
      <button @click="searchByName">
        <v-icon style="filter: invert(1)">mdi-magnify</v-icon>Search
      </button>
    </div>
    <carousel-3d
      touch
      height="540"
      v-if="mainShows.length > 0"
      class="carousel"
      :controls-visible="true"
      :clickable="true"
    >
      <slide
        to="/Show"
        class="slide"
        v-for="(show, i) in mainShows"
        :key="i"
        :index="i"
        style="background-color: transparent"
      >
        <router-link style="text-decoration: none" v-bind:to="'/show/' + show.id">
          <figure class="figure">
            <img v-if="show.image" class="showImage" :src="show.image.original" />
            <img v-else class="showImage" src="@/assets/noimage.png" />
            <figcaption style="text-transform: uppercase" class="showtitle">{{ show.name }}</figcaption>
          </figure>
        </router-link>
      </slide>
    </carousel-3d>
    <div class="noShowsMessage" v-if="mainShows.length == 0">
      <h4>NO RESULTS YET</h4>
      <v-progress-circular :size="70" :width="7" indeterminate></v-progress-circular>
    </div>
  </div>
</template>

<script>
import { Carousel3d, Slide } from "vue-carousel-3d";

export default {
  components: {
    Carousel3d,
    Slide,
  },
  data() {
    return {
      shows: [],
      url: "http://api.tvmaze.com/shows",
      search: "",
      mainShows: [],
      searchedShows: [],
    };
  },
  created() {
    fetch(this.url)
      .then((data) => data.json())
      .then((json) => {
        let topRandom = [];
        let randomNumber;
        do {
          randomNumber = Math.floor(Math.random() * 100);
          topRandom.push(randomNumber);
          if (topRandom.length == 10) {
            break;
          }
        } while (topRandom.includes(randomNumber));

        for (let i = 0; i < topRandom.length; i++) {
          this.mainShows.push(json[topRandom[i]]);
        }
      });
  },
  methods: {
    searchByName() {
      fetch("http://api.tvmaze.com/search/shows?q=" + this.search)
        .then((response) => response.json())

        .then((data) => {
          this.mainShows = [];

          data.forEach((show) => {
            this.mainShows.push(show.show);
          });
        })

        .catch((e) => console.log(e));
    },
  },
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
  border-radius: 10px;
  border-color: black;
  cursor: text;
}

input[type="text"] {
  height: 30px;
  background-color: white;
  background-position: 10px 10px;
  background-repeat: no-repeat;
  padding-left: 1%;
  font-family: "Exo", sans-serif;
}

#searchBar {
  display: flex;
  justify-content: space-evenly;
}

#searchBar button {
  font-family: "Exo", sans-serif;
  color: white;
  display: flex;
  padding: 1%;
  border-radius: 10px;
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

.noShowsMessage h4 {
  display: flex;
  margin-top: 10%;
  justify-content: center;
}
/* HERE IS THE RED-VIOLET GRADIENT!!!! */
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
/* loader */
.v-progress-circular {
  color: white;
  display: flex;
  margin: auto;
  height: 100px;
  width: 100px;
}
/* loader */
#app > div > div.noShowsMessage > div {
  color: white;
  display: flex;
  margin-top: 10%;
  height: 40px;
  width: 40px;
  border-radius: 10px;
}
/* figure margin (10%)(to align and size correctly) */
#app
  > div
  > div.carousel-3d-container.carousel
  > div.carousel-3d-slider
  > div.carousel-3d-slide.slide
  > a
  > figure {
  margin: 10%;
}

/* carousel margin to fit all into page */
#app > div > div.carousel-3d-container.carousel {
  min-height: 1px;
  width: 100%;
  position: relative;
  z-index: 0;
  overflow: hidden;
  box-sizing: border-box;
  margin: auto;
}

#app > div > div.carousel-3d-container.carousel > div.carousel-3d-controls {
  position: initial;
  top: 50%;
  height: 0;
  margin-top: -30px;
  left: 0;
  width: 100%;
  z-index: 1000;
}
#app
  > div
  > div.carousel-3d-container.carousel
  > div.carousel-3d-controls
  > a.prev {
  color: white;
  width: 50px;
  height: 50px;
  line-height: 50px;
}
#app
  > div
  > div.carousel-3d-container.carousel
  > div.carousel-3d-controls
  > a.next {
  color: white;
  width: 50px;
  height: 50px;
  line-height: 50px;
}
</style>
