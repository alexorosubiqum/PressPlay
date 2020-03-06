<template>
  <div>
    <div class="head" style="text-decoration: none">
      <router-link to="/menu">
        <img class="menuicon" src="@/assets/menuicon.png" />
      </router-link>
    </div>
    <v-btn color="transparent" v-on="on">Menu</v-btn>
    <router-link to="/">
      <button class="menuButtons">Home</button>
    </router-link>
    <router-link to="/login">
      <button class="menuButtons">Login</button>
    </router-link>
    <router-link to="/livechat">
      <button class="menuButtons">Live Chat</button>
    </router-link>
  </div>

  <!-- <v-card class="mx-auto overflow-hidden" height="400">
    <v-app-bar color="deep-purple" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Title</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>-->
</template>

<script>
export default {
  data: () => ({
    drawer: false
  })
};
</script>

<style>
.menuButtons {
  text-decoration: none;
  display: flex;
  border-radius: 10px;
  border-color: black;

  text-align: left;
  background-color: black;
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
