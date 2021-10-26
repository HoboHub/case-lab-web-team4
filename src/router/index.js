import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login'),
  },
  {
    path: '/catalog',
    name: 'Catalog',
    component: () => import('../views/Catalog.vue'),
  },
  {
    path: '/tracks',
    name: 'Tracks',
    component: () => import('../views/Tracks.vue'),
  },

  {
    path: '/track/:id',
    name: 'Track',
    component: () => import('../views/Track'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('../views/404'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
