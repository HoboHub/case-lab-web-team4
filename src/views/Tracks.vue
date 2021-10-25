<template>
  <div class="home container">
<!--    <Preloader :first-load="!hasPageBeenLoaded" @loaded="loaded"></Preloader>-->

    <div class="page-choice">
      <button @click="showAll = false" :class="showAll || 'btn-active'" class="myTracks-btn btn">
        <i class="fas fa-location-arrow"></i> Мои треки
      </button>
      <button @click="showAll = true" :class="showAll && 'btn-active'" class="catalog-btn btn">
        Каталог
      </button>
    </div>
    <div class="tracks-cnt" v-if="tracks">
      <TrackCard
        v-for="track in showAll ? tracks : assignedTracks"
        :key="track.id"
        :show-all="showAll"
        :status="track.status"
        :dateFinish="track.data.dateTimeFinish"
        :id="track.id"
        :name="track.data.name"
        :description="track.data.previewText"
        :imgUrl="track.data.previewPicture"
        class="card"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
// import Track from '@/services/track/track';
import TrackCard from '../components/trackRelated/TrackCard';
// import Preloader from '../components/Preloader';
// Vue.use(Loading)
export default {
  name: 'Home',
  components: {
    TrackCard,
    // Preloader,
  },

  data() {
    return {
      baseUrl: 'https://tml9.rosatom.ru',
      showAll: true,
    };
  },

  async mounted() {
    if (!this.tracks.length) {
      await this.getTracks();
    }
  },

  computed: {
    ...mapState({ tracks: 'tracks' }),

    hasPageBeenLoaded() {
      return sessionStorage.getItem('tracksLoaded')
    },

    actualTracks() {
      // ВКЛЮЧИМ,КОГДА ПОЧИНЯТ ДАТЫ
      // return [...this.tracks].filter(i => i.data.dateTimeFinish > Date.now())
      // ПОКА ДАННАЯ ФУНКЦИЯ НИЧЕГО НЕ ДЕЛАЕТ
      return this.tracks;
    },

    assignedTracks() {
      // ПОКА ДАННАЯ ФУНКЦИЯ НИЧЕГО НЕ ДЕЛАЕТ, ТК НЕТ ПОДХОДЯЩИХ ТРЕКОВ
      // return [...this.tracks].filter(i => i.assigned === false)
      return this.tracks;
    },
  },

  methods: {
    ...mapActions(['getTracks']),
    // getTrack() {
    //   Track.getTrackById(34, 'teacher');
    // },
    loaded() {
      Vue
    }
  },
};
</script>

<style lang="scss" scoped>
.page-choice {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  @media (min-width: 968px) {
    justify-content: start;
    gap: 20px;
  }

  .myTracks-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    i {
      font-size: 16px;
    }
  }
}

.tracks-cnt {
  margin-top: 60px;

  display: grid;
  grid-template-columns: repeat(auto-fill, 342px);
  gap: 10px;
  row-gap: 50px;
  justify-content: space-around;
  align-items: stretch;
  justify-items: stretch;

  @media (min-width: 986px) {
    justify-content: space-between;
  }
}
</style>
