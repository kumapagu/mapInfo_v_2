import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home";
import Maps from "../views/Maps"
import InfoEditor from "../views/InfoEditor"
import Park from "../views/Park"
import Gmap from "../views/Gmap"

Vue.use(VueRouter);

const routes = [
  {
    path: "/gmap",
    name: "Gmap",
    component: Gmap,
  },
  {
    path: "/",
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
    props: true,
    // children: [
    //   {
    //     path: "/park/:id/edit",
    //     name: 'edit',
    //     component: InfoEditor,
    //     props: true
    //   }
    // ]
  },
];

const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes
});

export default router;
