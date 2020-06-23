<template>
  <div>
    <h1>{{ msg }}</h1>
    <div class="noLog" v-if="!auth">
      <img class="logo" src="@/assets/logo.png" />

      <h3 class="pleaseLog">Please Log In to access LiveChat</h3>
      <img
        class="loginWithGoogleIMG"
        @click="googleLogin"
        src="https://pngimage.net/wp-content/uploads/2018/06/login-with-google-button-png-1.png"
        alt="google Login"
      />
    </div>

    <div v-if="auth">
      <!-- -------- log out button ---------- -->

      <button class="logOut" @click="logOut">
        <v-icon style="filter: invert(1)">mdi-logout</v-icon>Log Out
      </button>
      <!-- -------- log out button ---------- -->

      <!-- -------- user ---------- -->

      <div class="userLog">
        <img class="userImg" :src="auth.avatar" alt="profile image" />
      </div>
      <!-- -------- user ---------- -->

      <!-- -------- messages ---------- -->
      <div class="chat">
        <ul id="chatID" v-chat-scroll="{ always: false, smooth: true, scrollonremoved: true }">
          <li class="msg message" v-for="(v, k, i) in messages" :key="i + 'msg'">
            <img :src="v.user.avatar" alt="avatar" />
            <p style="margin-left: 1%">
              <span>{{ v.user.name }}:</span>
              <br />
              <span style="word-break: break-word;">{{ v.msg }}</span>
            </p>
          </li>
        </ul>
      </div>

      <!-- -------- messages ---------- -->

      <!-- -------- input chat ---------- -->
      <div class="inputSend">
        <input class="inputText" type="text" v-model="message" placeholder="Write a message..." />
        <button class="sendButton" @click="sendMsg">
          <v-icon style="filter: invert(1)">mdi-send-circle</v-icon>Send
        </button>
      </div>
      <!-- -------- input chat ---------- -->
    </div>

    <!-- --------------scroll up button-------------- -->
    <v-btn v-scroll="onScroll" v-show="fab" fab fixed bottom right color="primary" @click="toTop">
      <v-icon>mdi-arrow-up-bold-box-outline</v-icon>
    </v-btn>
    <!-- --------------scroll up button-------------- -->
  </div>
</template>

<script>
import Nav from "../components/Nav";
import database from "@/firebase";
import VueChatScroll from "vue-chat-scroll";

export default {
  Toolbar: Nav,
  name: "LiveChat",
  props: {
    msg: String
  },
  data() {
    return {
      message: "",
      messages: [],
      auth: null,
      likes: "",
      fab: false
    };
  },
  watch: {
    auth() {
      this.getLikes();
    }
  },
  methods: {
    sendMsg() {
      database
        .database()
        .ref()
        .child("posts-test")
        .push({ user: this.auth, msg: this.message });
      this.message = "";
    },
    getPosts() {
      let that = this;
      database
        .database()
        .ref("posts-test/")
        .on("value", snapshot => {
          console.log(snapshot.val());

          that.messages = snapshot.val();
        });
    },
    googleLogin() {
      let that = this;
      const provider = new database.auth.GoogleAuthProvider();
      database
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          console.log(result);

          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = {
            name: result.user.displayName,
            email: result.user.email,
            avatar: result.user.photoURL,
            id: result.user.uid
          };
          console.log(user);
          that.auth = user;

          database
            .database()
            .ref("users/" + result.user.uid)
            .set(user);

          // ...
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    },
    logOut() {
      let that = this;
      database
        .auth()
        .signOut()
        .then(function() {
          // Sign-out successful.
          that.auth = null;
        })
        .catch(function(error) {
          // An error happened.
        });
    },
    like(value) {
      database
        .database()
        .ref("productsCode/" + this.auth.id)
        .push(value + 1);
    },
    getLikes() {
      database
        .database()
        .ref("productsCode/" + this.auth.id)
        .on("value", snapshot => {
          console.log(snapshot.val());

          this.likes = snapshot.val();
        });
    },
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    }
  },

  created() {
    this.getPosts();
    database.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        this.auth = {
          name: user.displayName,
          email: user.email,
          avatar: user.photoURL,
          id: user.uid
        };
      } else {
        // No user is signed in.
        console.log("User not logged in!!!");
      }

      // auto scrolldown
      document
        .getElementsByTagName("ul")[0]
        .scrollIntoView({ behavior: "auto", block: "end" });
    });
  }
};
</script>

<style>
.userLog {
  display: flex;
  width: 70%;
  margin: auto;
}
.userImg {
  display: flex;
  margin: auto;
  margin-top: 10%;
  margin-left: 90%;
  width: 20%;
  border-radius: 10px;
}
.msg img {
  border-radius: 10px;
  width: 40px;
  height: 40px;
}
.nav {
  width: max-content;
  height: 100%;
  font-family: "Exo", sans-serif;
  color: white;
  background: transparent;
}

.chat {
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 60vh;
  margin-top: 1%;
  margin-left: 1%;
  overflow-y: auto;
  overflow-x: hidden;
}

#chatID {
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 60vh;
  margin-top: 1%;
  margin-left: 1%;
  overflow-y: auto;
  overflow-x: hidden;
}

.msg {
  display: flex;
  width: 100%s;
  color: white;
  font-family: "Exo", sans-serif;
  margin-left: 5%;
}
.navHead {
  position: absolute;
}

.icon {
  filter: invert(1);
}

.inputSend {
  display: flex;
  margin: auto;
  justify-content: baseline;
  align-content: space-between;
  padding: 5%;
}

.logOut {
  display: flex;
  margin-left: 70%;
  margin-top: 20px;
  padding: 2%;
  border-radius: 10px;
  font-family: "Exo", sans-serif;
  color: white;
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

.inputText {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  padding: 5%;
  display: flex;
  flex-grow: 1;
}

.message {
  display: flex;
  width: 100%;
  margin: 5%;
}
.noLog {
  text-align: center;
  display: flex;
  flex-direction: column;
  margin: 10%;
}

.pleaseLog {
  margin: 10px;
}
.loginWithGoogleIMG {
  display: flex;
  margin: auto;
  border-radius: 10px;
  width: 70%;
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

/* send button radius */
#app > div > div > div.inputSend > button {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

/* send button padding/color */
#app > div > div > div.inputSend > button {
  padding: 1%;
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
/* like button */
#app > div > div > button:nth-child(1) {
  border-radius: 10px;
  padding: 1%;
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
#app > div > div > button:nth-child(2) {
  border-radius: 10px;
  padding: 1%;
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

/* user name  */
#app > div > div > div.userLog > button {
  color: white;
  font-family: "Exo", sans-serif;
}

/* scroll up button background  (gradient) */
#app > div:nth-child(2) > button {
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
