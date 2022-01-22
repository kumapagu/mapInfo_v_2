import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Maps from "../views/Maps"
import InfoEditor from "../views/InfoEditor"
import Park from "../views/Park"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/maps",
    name: "maps",
    component: Maps,
    props: true
  },
  {
    path: "/info", 
    name: "info",
    component: InfoEditor,
    props: true
  },
  {
    path: "/park/:id", 
    name: "park",
    component: Park,
    props: true
  },
];

const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes
});

export default router;
