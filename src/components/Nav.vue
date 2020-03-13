<template>
  <div class="nav">
    <div class="navHead">
      <v-app-bar style="background: transparent" color="deep-purple" dark>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      </v-app-bar>
    </div>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      :style="{'backgroundImage': 'url(' + menuBGs[Math.floor(Math.random()*menuBGs.length)].imageUrl + ')'}"
    >
      <v-list stylenav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item to="/">
            <v-list-item-icon class="icon">
              <v-icon>mdi-play-box-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title style="color: white">HOME</v-list-item-title>
          </v-list-item>

          <v-list-item to="/login">
            <v-list-item-icon class="icon">
              <v-icon>mdi-account-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-title style="color: white">LOGIN</v-list-item-title>
          </v-list-item>

          <v-list-item to="/livechat">
            <v-list-item-icon class="icon">
              <v-icon>mdi-chat-processing-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title style="color: white">LIVE CHAT</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuBGs: [
        {
          imageUrl: require("@/assets/menubgahs.jpg")
        },
        {
          imageUrl: require("@/assets/menubgheads.jpg")
        },
        {
          imageUrl: require("@/assets/menubgmandalorian.jpg")
        },
        {
          imageUrl: require("@/assets/menubgmorty.png")
        },
        {
          imageUrl: require("@/assets/menubgsamuraijack.jpg")
        },
        {
          imageUrl: require("@/assets/menubgsons.jpg")
        },
        {
          imageUrl: require("@/assets/menubgspock.png")
        },
        {
          imageUrl: require("@/assets/menubgstranger.png")
        },
        {
          imageUrl: require("@/assets/menubgwitcher.jpg")
        },
        {
          imageUrl: require("@/assets/menubgluffy.png")
        },
        {
          imageUrl: require("@/assets/menubgbazinga.jpg")
        },
        {
          imageUrl: require("@/assets/menubgbebop.jpg")
        },
        {
          imageUrl: require("@/assets/menubgmother.jpg")
        },
        {
          imageUrl: require("@/assets/menubgtitan.jpg")
        },
        {
          imageUrl: require("@/assets/menubgjoker.jpg")
        },
        {
          imageUrl: require("@/assets/menubgbatman.jpg")
        },
        {
          imageUrl: require("@/assets/menubgnaruto.jpg")
        }
      ],
      drawer: false
    };
  }
};
</script>

<style>
.nav {
  width: max-content;
  height: 100%;
  font-family: "Exo", sans-serif;
  color: white;
  background: transparent;
}

.navHead {
  position: absolute;
}

.icon {
  filter: invert(1);
}

/* ///////////////////////////////////////////// */

/* SELECTORS */

/* ///////////////////////////////////////////// */

/* nav background (black and image) */
#app > div > div.nav > aside {
  border: none;
  background-color: black;
  background-position: center center;
  background-size: cover;
}

/* nav list items background (1,2,3 gradient) */
#app
  > div
  > div.nav
  > aside
  > div.v-navigation-drawer__content
  > div
  > div
  > a:nth-child(1) {
  width: 50%;
  border-radius: 10px;
  margin: 5px;
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
#app
  > div
  > div.nav
  > aside
  > div.v-navigation-drawer__content
  > div
  > div
  > a:nth-child(2) {
  width: 50%;
  border-radius: 10px;
  margin: 5px;
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
#app
  > div
  > div.nav
  > aside
  > div.v-navigation-drawer__content
  > div
  > div
  > a:nth-child(3) {
  width: 50%;
  border-radius: 10px;
  margin: 5px;
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
