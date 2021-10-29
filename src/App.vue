<template>
  <div>
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import LayoutLogin from '@/layouts/LayoutLogin.vue';
import LayoutDefault from '@/layouts/LayoutDefault.vue';

export default {
  name: 'app',
  components: {
    LayoutLogin,
    LayoutDefault,
  },
  computed: {
    layout() {
      // В роутере проверяем св-во layout и переключаем слои
      if (this.$route.meta.layout === 'LayoutLogin') {
        return 'LayoutLogin';
      }
      return 'LayoutDefault';
    },
  },
};
</script>

<style lang="scss">
  @import "assets/zero.css";
  @import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,300;0,400;0,500;0,700;0,800;1,400&family=Roboto:wght@300;400;700;900&display=swap");

  #app {
    font-family: "Montserrat", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

</style>
