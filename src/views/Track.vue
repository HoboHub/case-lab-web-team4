<template>
  <div class="track">
    <Preloader></Preloader>
    <img :src="baseUrl + track.data.previewPicture" class="track-cover" alt="preview picture" />
    <div class="track-content container">
      <router-link :to="{ name: 'Tracks' }" class="link-back"
        ><i class="fas fa-arrow-left"></i>В каталог
      </router-link>
      <TrackInfoMain :name="track.data.name" :description="track.data.description" />
      <TrackInfoSub
        :date-start-prop="track.data.dateTimeStart"
        :date-finish-prop="track.data.dateTimeFinish"
      />
    </div>
  </div>
</template>

<script>
// import Track from '../services/track/track'
import Preloader from '../components/Preloader';
import TrackInfoMain from '../components/trackRelated/TrackInfoMain';
import TrackInfoSub from '../components/trackRelated/TrackInfoSub';

export default {
  name: 'Track',
  components: {
    // Track
    Preloader,
    TrackInfoMain,
    TrackInfoSub,
  },
  computed: {
    track() {
      return this.$store.getters.getTrackById(this.$route.params.id);
    },
  },
  data() {
    return {
      baseUrl: 'https://tml9.rosatom.ru',
    };
  },
};
</script>

<style lang="scss" scoped>
.track {
  color: #1f2041;
}

.track-cover {
  max-height: 500px;
  width: 100%;
  object-fit: contain;
}

.track-content {
  margin-top: 16px;
  padding-bottom: 30px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 60px;
}

.link-back {
  display: flex;
  gap: 10px;
  align-items: center;
  border-radius: 10px;
  font-weight: 700;
  font-size: 14px;
}

@media (min-width: 800px) {
  .track-content {
    grid-template-columns: 1fr 6fr 2fr;
  }
  // ИЗ TRACK-INFO-MAIN COMPONENT
  .track-info-main {
    grid-column-start: 2;
  }
  // ИЗ TRACK-INFO-SUB COMPONENT
  .track-info-sub {
    text-align: left;
  }

  .link-back {
    grid-column: span 3;
  }
}
</style>
