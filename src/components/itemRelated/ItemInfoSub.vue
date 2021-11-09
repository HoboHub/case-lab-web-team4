<template>
    <div class="item-info-sub">
        <div class="item-duration">
            <h2>{{ duration }}</h2>
            <!-- <div v-if="itemType">{{itemType || 'Тип элемента'}}</div> -->
            <p>продолжительность</p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ItemInfoSub',
  props: {
    duration: {
      type: String,
    },
    itemType: {
      type: String,
    },
  },
};
</script>

<style scoped lang="scss">
.item-info-sub {
  display: flex;
  flex-direction: column;
  gap: 22px;

  > div {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  h2 {
    font-weight: 500;
    font-size: 18px;
    letter-spacing: 1px;

  }

  p {
    font-weight: 300;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 1px;

  }
}
</style>
