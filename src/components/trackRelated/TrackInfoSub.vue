<template>
  <div class="track-info-sub">
    <div class="track-duration">
      <!-- <h2>{{ duration }} часов</h2> -->
      <h2>{{ trackDuration }} часов</h2>
      <p>продолжительность трека</p>
    </div>
    <div class="track-start-date">
      <h2>{{ dateStartProp.replaceAll("/ ", ".") }}</h2>
      <p>дата открытия</p>
    </div>
    <div class="track-finish-date">
      <h2>{{ dateFinishProp.replaceAll("/ ", ".") }}</h2>
      <p>дата закрытия</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TrackInfoSub',
  props: {
    dateStartProp: {
      type: String,
      required: true,
    },
    dateFinishProp: {
      type: String,
      required: true,
    },
    trackDuration: {
      type: Number,
    },
  },

};
</script>

<style scoped lang="scss">
.track-info-sub {
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
