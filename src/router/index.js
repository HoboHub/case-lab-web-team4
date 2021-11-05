import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

const routes = [
  {
    path: '/',
    name: 'Default',
    redirect: '/login',
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/login',
    name: 'Login',
    meta: { title: 'Вход', layout: 'LayoutLogin' },
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
      requiresAuth: true,
    },
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/catalog',
    name: 'Catalog',
    meta: {
      requiresAuth: true,
    },
    component: () => import('@/views/Catalog.vue'),
  },
  {
    path: '/tracks',
    name: 'Tracks',
    meta: {
      requiresAuth: true,
    },
    component: () => import('@/views/Tracks.vue'),
  },
  {
    path: '/tracks/new',
    name: 'CreateTrack',
    meta: {
      requiresAuth: true,
    },
    component: () => import('@/views/CreateTrack.vue'),
  },

  {
    path: '/track/:id',
    name: 'Track',
    meta: {
      requiresAuth: true,
    },
    component: () => import('@/views/Track.vue'),
  },
  // track item
  {
    path: '/track/:id/detail/:id',
    name: 'Item',
    meta: {
      requiresAuth: true,
    },
    component: () => import('@/views/Item.vue'),
  },
  //
  {
    path: '/track/:id/edit',
    name: 'EditTrack',
    meta: {
      requiresAuth: true,
    },
    component: () => import('@/views/EditTrack.vue'),
  },
  {
    path: '/track/:id/students',
    name: 'AddStudent',
    meta: {
      requiresAuth: true,
    },
    component: () => import('@/views/AddStudents.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/404.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // Если в роуте в meta флаг обязательной авторизации === true то проверяем роут дальше
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.getUser.token) {
      next({ name: 'Login' }); // Если токен не получен, то роут не переключится
    } else {
      next(); // переход на следующий роут
    }
  } else {
    next(); // Если флага нет, или он равен false, то переход на следующий роут
  }
});

export default router;
