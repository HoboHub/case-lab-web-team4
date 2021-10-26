import { createApp } from 'vue';
import { gsap } from 'gsap';
import App from './App.vue';
import store from './store';
import router from './router';

createApp(App).use(router).use(store).use(gsap)
  .mount('#app');
