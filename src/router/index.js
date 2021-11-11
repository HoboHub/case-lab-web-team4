import { createRouter, createWebHistory } from 'vue-router';
import { gsap } from 'gsap';
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
      requiresMaster: true,
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
    path: '/track/:id/detail/:detailId',
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
      requiresMaster: true,

    },
    component: () => import('@/views/EditTrack.vue'),
  },
  {
    path: '/track/:id/enroll',
    name: 'AddStudent',
    meta: {
      requiresAuth: true,
      requiresMaster: true,

    },
    component: () => import('@/views/AddStudents.vue'),
  },
  {
    path: '/track/:id/extend',
    name: 'AddDetails',
    meta: {
      requiresAuth: true,
      requiresMaster: true,

    },
    component: () => import('@/views/AddDetail.vue'),
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
  // eslint-disable-next-line no-unused-vars,consistent-return
  scrollBehavior(to, from) {
    if (to.name !== 'Tracks') return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  gsap.fromTo('body', { opacity: 0 }, { opacity: 1, duration: 1 });

  // Если в роуте в meta флаг обязательной авторизации === true то проверяем роут дальше
  if (to.matched.some((record) => record.meta.requiresAuth || record.meta.requiresMaster)) {
    if (!store.getters.getUser.token) {
      next({ name: 'Login' }); // Если токен не получен, то роут не переключится
    } else {
      if (to.meta.requiresMaster && store.getters.getUser.role !== 'teacher') {
        return router.back();
      } next(); // переход на следующий роут
    }
  } else {
    next(); // Если флага нет, или он равен false, то переход на следующий роут
  }
});

export default router;
