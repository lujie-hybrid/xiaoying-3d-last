import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Frame from "../views/wrap-comp/Frame";
import VdFrame from "../views/wrap-comp/VdFrame";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: Home,
  },
  {
    path: "/frame",
    name: "frame",
    component: Frame,
  },
  {
    path: "/vdf",
    name: "vdf",
    component: VdFrame,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
