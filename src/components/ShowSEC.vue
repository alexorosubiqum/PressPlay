<template>
  <div>
    <Toolbar />
    <div v-if="show">
      <img class="showimage" :src="show.image.original" />

      <v-card class="card">
        <v-tabs class="tabs" v-model="tab">
          <v-tab style="color: white" v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
        </v-tabs>

        <v-tabs-items class="tabsitems" v-model="tab">
          <!-- tab item 1 SYNOPSIS -->
          <v-tab-item>
            <v-card flat>
              <v-card-text v-if="show.summary" style="color: black" v-html="show.summary"></v-card-text>
              <v-card-text v-else style="color: black">No sinopsis yet</v-card-text>
            </v-card>
          </v-tab-item>

          <!-- tab item 2 SEASONS / EPISODES -->
          <v-tab-item>
            <v-card flat>
              <v-card-text style="color: black" v-for="season in seasons" :key="season.id">
                <v-row align="center">
                  <v-row class="rowSeasons" justify="space-around">
                    <v-expansion-panels :accordion="accordion">
                      <v-expansion-panel v-if="season.id">
                        <v-expansion-panel-header
                          class="seasonsPanelHeader"
                          @click="getEpisodeBySeason(season.id)"
                        >Season {{ season.number }} {{season.name}}</v-expansion-panel-header>
                        <v-expansion-panel-content
                          style="color: black"
                          v-for="episode in episodes"
                          :key="episode.id"
                        >{{ episode.name }}</v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </v-row>
                </v-row>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <!-- tab item 3  CAST -->
          <v-tab-item>
            <v-card style="overflow-y: auto;" flat>
              <v-card-text style="color: black " v-for="people in cast" :key="people.id">
                <div class="castMember">
                  <img v-if="people.character.image.medium" :src="people.character.image.medium" />
                  <img v-else :src="people.character.image.original" />
                  <div class="castMemberInfo">
                    {{ people.person.name }}
                    as
                    {{ people.character.name }}
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </div>
    <!-- cambiar -->

    <v-progress-circular v-else class="loading" :size="70" :width="7" indeterminate></v-progress-circular>

    <!-- cambiar -->
    <router-link style="text-decoration: none" to="/">
      <button class="backHomeButton">Back to Home Page</button>
    </router-link>
  </div>
</template>

<script>
import Nav from "../components/Nav";
import axios from "axios";

export default {
  components: {
    Toolbar: Nav
  },
  props: ["id"],
  data() {
    return {
      accordion: false,
      show: null,
      episodes: null,
      cast: null,
      seasons: null,
      urlShow: "http://api.tvmaze.com/shows/" + this.id,
      urlEpisodes: "http://api.tvmaze.com/shows/" + this.id + "/episodes",
      urlSeasons: "http://api.tvmaze.com/shows/" + this.id + "/seasons",
      urlCast: "http://api.tvmaze.com/shows/" + this.id + "/cast",
      tab: null,
      items: [{ tab: "Synopsis" }, { tab: "Seasons" }, { tab: "Cast" }],
      centered: true,
      grow: true
    };
  },

  methods: {
    getShowData() {
      axios(this.urlShow).then(json => {
        this.show = json.data;
      });
    },
    getShowSeasons() {
      axios(this.urlSeasons).then(json => {
        this.seasons = json.data;
      });
    },

    getShowEpisodes() {
      axios(this.urlEpisodes).then(json => {
        this.episodes = json.data;
      });
    },
    getShowCast() {
      axios(this.urlCast).then(json => {
        this.cast = json.data;
      });
    },
    getEpisodeBySeason(seasonID) {
      axios("http://api.tvmaze.com/seasons/" + seasonID + "/episodes").then(
        json => {
          this.episodes = json.data;
        }
      );
    }
  },

  created() {
    axios("http://api.tvmaze.com/shows/" + this.id).then(data => {
      this.show = data.body;
    });
    this.getShowData();
    this.getShowSeasons();
    this.getShowEpisodes();
    this.getShowCast();
    this.getEpisodeBySeason();
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
  margin: auto;
  margin-top: 5%;
  margin-bottom: 5%;
  display: flex;
  border-radius: 10px;
  width: 60%;
}

.backHomeButton {
  margin: auto;
  margin-top: 5%;
  margin-bottom: 5%;
  padding: 1%;
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

.card {
  display: flex;
  margin: auto;
  font-family: "Exo", sans-serif;
}

.tabs {
  display: flex;
  margin: auto;
  font-family: "Exo", sans-serif;
}

.castMember {
  display: flex;
}
.castMember img {
  border-radius: 10px;
  width: 15%;
}
.castMemberInfo {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
}

.seasonsPanelHeader {
  display: flex;
  margin: auto;
  width: auto;
  color: white;
  text-transform: uppercase;
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

/* ------------SELECTORS------------------ */

/* syopsis text color */
#app
  > div
  > div
  > div.card.v-card.v-sheet.theme--light
  > div.v-window.tabsitems.v-item-group.theme--light.v-tabs-items
  > div
  > div.v-window-item.v-window-item--active
  > div
  > div
  > p {
  color: black;
}

/* tabs background (transparent) */
#app > div > div > div.card.v-card.v-sheet.theme--light {
  display: flex;
  flex-direction: column;
  background-color: transparent;
  border-radius: 10px;
}

#app
  > div
  > div
  > div.card.v-card.v-sheet.theme--light
  > div.v-tabs.tabs.theme--light
  > div {
  display: flex;
  margin: auto;
  background: transparent;
}

/* tabs content margin top (10px) */
#app
  > div
  > div
  > div.card.v-card.v-sheet.theme--light
  > div.v-window.tabsitems.v-item-group.theme--light.v-tabs-items {
  overflow-y: auto;
  border-radius: 10px;
  margin-top: 10px;
}
/* tabs color (gradient) */
#app
  > div
  > div
  > div.card.v-card.v-sheet.theme--light
  > div.v-tabs.tabs.theme--light
  > div
  > div.v-slide-group__wrapper
  > div {
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
/* tabs sliding bar (transparent) */
#app
  > div
  > div
  > div.card.v-card.v-sheet.theme--light
  > div.v-tabs.tabs.theme--light
  > div
  > div.v-slide-group__wrapper
  > div
  > div.v-tabs-slider-wrapper
  > div {
  color: transparent;
}
/* card text (black) */
#app
  > div
  > div:nth-child(2)
  > div
  > div.v-window.tabsitems.v-item-group.theme--light.v-tabs-items
  > div
  > div.v-window-item.v-window-item--active
  > div {
  color: black;
}

#app
  > div
  > div:nth-child(1)
  > div
  > div.v-window.tabsitems.v-item-group.theme--light.v-tabs-items {
  width: 80%;
  display: flex;
  margin: auto;
  margin-top: 10px;
  border-radius: 10px;
}
#app
  > div
  > div:nth-child(2)
  > div
  > div.v-window.tabsitems.v-item-group.theme--light.v-tabs-items {
  width: 80%;
  display: flex;
  margin: auto;
  margin-top: 10px;
  border-radius: 10px;
}
#app
  > div
  > div:nth-child(3)
  > div
  > div.v-window.tabsitems.v-item-group.theme--light.v-tabs-items {
  width: 80%;
  display: flex;
  margin: auto;
  margin-top: 10px;
  border-radius: 10px;
}
/* seasons panel down arrow (white) */
#app
  > div
  > div:nth-child(2)
  > div
  > div.v-window.tabsitems.v-item-group.theme--light.v-tabs-items
  > div
  > div.v-window-item.v-window-item--active
  > div
  > div
  > div
  > div
  > div
  > div
  > button
  > div
  > i {
  color: white;
}
/* loader */
#app
  > div
  > div.v-progress-circular.loading.v-progress-circular--indeterminate {
  height: 70px;
  width: 70px;
  display: flex;
  padding-top: 40%;
}
</style>
