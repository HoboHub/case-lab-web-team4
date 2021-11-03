<template>
<div class="item-info-main">
    <h2 class="item-name">
        {{ name || "Скоро здесь будет название" }}
    </h2>
    <!-- <div v-if="isNotAssigned" class="item-ordered-progress">0% изучено</div> -->
    <div class="item-description">
    {{ description || fishText }}
    </div>
</div>
</template>

<script>
export default {
  name: 'ItemInfoMain',
  props: {
    name: {
      type: String,
    },
  },
  data() {
    return {
      fishText:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    };
  },
};
</script>

<style scoped lang="scss">
.item-info-main {
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 24px;

  .item-name {
    font-weight: 300;
    font-size: 36px;
  }

  .item-description {
    font-weight: 300;
    font-size: 24px;
    line-height: 28px;

    font-family: "Roboto", sans-serif;
  }
}
</style>
