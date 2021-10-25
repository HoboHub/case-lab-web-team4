import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/catalog",
    name: "Catalog",
    component: () => import("../views/Catalog.vue"),
  },
  {
    path: "/tracks",
    name: "Tracks",
    component: () => import("../views/Tracks.vue"),
  },

  {
    path: "/track/:id",
    name: "Track",
    component: () => import("../views/Track"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});




export default router;
