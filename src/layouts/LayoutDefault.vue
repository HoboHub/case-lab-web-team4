<template>
  <div class="layout-default">
    <div class="layout-default__navigation">
      <AppNavigation/>
    </div>
    <div class="layout-default__content">
      <slot/>
    </div>
  </div>
</template>

<script>
import AppNavigation from '@/components/Navigation.vue';

export default {
  name: 'LayoutDefault',
  components: {
    AppNavigation,
  },
};
</script>

<style lang="scss" scoped>
.layout-default {
  display: flex;

  &__navigation {
    width: 70px;
  }

  &__content {
    // display: flex;
    width: 100%;
    height: 100%;
    // padding: 30px;
    // padding-left: 50px;
  }

  @media (max-width: 500px) {
    flex-direction: column;
    &__navigation {
      width: 100%;
    }
  }

}
</style>
