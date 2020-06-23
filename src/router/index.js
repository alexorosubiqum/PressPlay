import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/show/:id",
    name: "Show",
    component: () => import("../components/ShowSEC.vue"),
    props: true,
  },
  {
    path: "/show/:id/episodes",
    name: "ShowE",
    component: () => import("../components/ShowSEC.vue"),
    props: true,
  },
  {
    path: "/show/:id/seasons",
    name: "ShowE",
    component: () => import("../components/ShowSEC.vue"),
    props: true,
  },
  {
    path: "/show/:id/cast",
    name: "ShowC",
    component: () => import("../components/ShowSEC.vue"),
    props: true,
  },
  {
    path: "/nav",
    name: "Nav",
    component: () => import("../components/Nav.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/livechat",
    name: "LiveChat",
    component: () => import("../views/LiveChat.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
