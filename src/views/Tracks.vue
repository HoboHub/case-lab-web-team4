<template>
  <div class="home container">
    <!--    <Preloader :first-load="!hasPageBeenLoaded" @loaded="loaded"></Preloader>-->
    <template v-if="getTracks">
      <div class="page-choice">
        <Button
          @click="showAll = false" :active="!showAll"
          class="myTracks-btn">
          <i class='fas fa-location-arrow'></i> Мои треки
        </Button>
        <Button @click="showAll = true" :active="showAll" class="catalog-btn">
          Каталог
        </Button>
        <Button
          v-if="getUser.role === 'teacher'"
          :btn-orange="true" class="create-btn">
          <i class="fas fa-plus"></i> Создать трек
        </Button>
      </div>
      <div class="tracks-cnt">
        <TrackCard
          v-for="track in showAll ? getTracks : assignedTracks"
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
    </template>
    <p v-else class="no-tracks">There are no tracks yet</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import gsap from 'gsap';
// import Track from '@/services/track/track';
import TrackCard from '@/components/trackRelated/TrackCard.vue';
import Button from '@/components/Button.vue';
// import Preloader from '../components/Preloader';
export default {
  name: 'Home',
  components: {
    TrackCard,
    Button,
    // Preloader,
  },

  data() {
    return {
      baseUrl: 'https://tml9.rosatom.ru',
      showAll: true,
    };
  },

  async mounted() {
    if (!this.getTracks.length) {
      await this.fetchTracks(this.getUser.token);
    }
    gsap.fromTo('body', { opacity: 0 }, { opacity: 1, duration: 0.7 });
  },

  computed: {
    ...mapGetters([
      'getTracks',
      'getUser',
    ]),

    actualTracks() {
      // ВКЛЮЧИМ,КОГДА ПОЧИНЯТ ДАТЫ
      // return [...this.tracks].filter(i => i.data.dateTimeFinish > Date.now())
      // ПОКА ДАННАЯ ФУНКЦИЯ НИЧЕГО НЕ ДЕЛАЕТ
      return this.getTracks;
    },

    assignedTracks() {
      // ПОКА ДАННАЯ ФУНКЦИЯ НИЧЕГО НЕ ДЕЛАЕТ, ТК НЕТ ПОДХОДЯЩИХ ТРЕКОВ
      // return [...this.tracks].filter(i => i.assigned === false)
      return this.getTracks;
    },

  },

  methods: {
    ...mapActions([
      'fetchTracks',
    ]),
  },
};
</script>

<style lang="scss" scoped>
.page-choice {
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;

  @media (min-width: 968px) {
    justify-content: flex-start;
  }

  .myTracks-btn {
    i {
      font-size: 16px;
    }
  }

  .create-btn {
    margin-left: auto;
    border: unset;
  }
}

.tracks-cnt {
  margin-top: 60px;

  display: flex;
  gap: 30px;
  flex-wrap: wrap;

  .card {
    width: 400px;
  }

  @media (max-width: 968px) {
    flex-direction: column;
    justify-content: flex-start;

    .card {
      width: 100%;
    }
  }
}
</style>
