<template>
  <div class="track">
    <!--    <Preloader></Preloader>-->

    <!-- <img :src="previewPicture"
         class="track-cover" alt="preview picture"/> -->
    <div class="track-bg-img" style="overflow: hidden; position: relative;">
      <img
        :src="previewPicture"
        class="track-cover-bg"
        alt="preview picture" data-v-7ef61a01=""
        style="
        position: absolute;
        top:  0px;
        left: 0px;
        max-height: 510px;
        width: 101%;
        filter: blur(10px);">
      <img
        :src="previewPicture"
        class="track-cover"
        alt="preview picture"
        data-v-7ef61a01="">
    </div>

    <div class="track-content container">
        <router-link
          :to="{ name: 'Tracks' }"
          class="link-back"
        >
          <i class="fas fa-arrow-left"></i>
          В каталог
        </router-link>
        <Button v-if="isMaster"
          :btn-orange="true"
          class="redact-btn"
        >
          <i class="fas fa-pencil"></i>
          Редактировать
        </Button>
      <TrackInfoMain
        :name="track.data.name"
        :description="track.data.previewText"
        :isNotAssigned="!track.assigned"
      />

      <TrackInfoSub
        :track-duration="trackDuration"
        :date-start-prop="track.data.dateTimeStart"
        :date-finish-prop="track.data.dateTimeFinish"
      />
      <div class="track-manage-btns">
        <Button v-if="isMaster"
            :btn-orange="true"
            class="add-btn"
          >
            <i class="fas fa-plus"></i>
            Добавить элемент
          </Button>
          <Button v-if="isMaster"
            :btn-blue="true"
            class="enroll-btn"
          >
            <img src="../assets/student.svg" alt="student">
            Записать студента
          </Button>
      </div>
      <!-- if ordered -->
      <!-- сменить на track.assigned как будет функционал -->
      <div
        v-if="!track.assigned"
        class="track-content-ordered">
        <Button
          :class="{'btn-test': true, 'btn-disabled': false}">
          Входное тестирование
        </Button>
      </div>

      <div class="track-item-list">
        <TrackItem
          v-for="item in trackDetail"
          :key="item.id"
          :name ="item.entityName"
          :duration="item.entityDuration"
          :type="item.data.type"
          :id="item.id"
          :trackId="item.trackId" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import Track from '../services/track/track';
// import Preloader from '../components/Preloader';

import TrackDetail from '@/services/track/trackDetail';

import Button from '@/components/Button.vue';
import TrackInfoMain from '@/components/trackRelated/TrackInfoMain.vue';
import TrackInfoSub from '@/components/trackRelated/TrackInfoSub.vue';
import placeholderBig from '../../public/placeholderBig.png';

import TrackItem from '@/components/trackRelated/TrackItem.vue';

export default {
  name: 'track',
  components: {
    // Track
    // Preloader,
    Button,
    TrackInfoMain,
    TrackInfoSub,
    TrackItem,
  },
  computed: {
    ...mapGetters([
      'getUser',
      'getTrackByIdStore',
    ]),

    track() {
      return this.getTrackByIdStore(+this.$route.params.id);
    },

    isMaster() {
      return (this.getUser.role === 'teacher');
    },

    previewPicture() {
      if (this.track.data.previewPicture) {
        return `${this.baseUrl}${this.track.data.previewPicture}`;
      }
      return this.placeholderBig;
    },
  },

  methods: {
    async details(role) {
      const result = await TrackDetail.getTrackDetail(+this.$route.params.id, role);
      this.trackDetail = result;

      // get full track duration
      const durRes = await this.trackDetail
        .map((item) => {
          let sum = 0;
          const newStr = item.entityDuration.toString();

          if (newStr) {
            const num = newStr.match(/\d+/g).map(Number);
            sum += num[0] * 60 + num[1];
            return sum;
          }
          return 0;
        });

      this.trackDuration = Math.ceil(durRes.reduce((a, b) => a + b) / 60);
    },
  },

  data() {
    return {
      baseUrl: 'https://tml9.rosatom.ru',
      placeholderBig,
      trackDetail: null,
      trackDuration: 0,
      // typeOfitem: null,
    };
  },

  mounted() {
    this.details(this.getUser.role);
    // this.getItemType(this.getUser.role);
    // this.getTrackDuration();
  },
};
</script>

<style lang="scss" scoped>
.track {
  color: #1f2041;
}

.track-bg-img {
  background-color: lightgrey;
  height: 500px
}

.track-cover {
  max-height: 500px;
  width: 100%;
  object-fit: contain;
  filter: brightness(90%);
  background: rgba(0, 0, 0, 0.1);
}

  .link-back {
    display: flex;
    gap: 10px;
    align-items: center;
    border-radius: 10px;
    font-weight: 700;
    font-size: 14px;
  }

  .redact-btn, .add-btn, .enroll-btn{
    border: unset;
    box-shadow: 0px 2px 4px rgba(139, 164, 249, .3);
  }

  .add-btn, .enroll-btn{
    gap: 15px;
    border-radius: 22px;
    width: 250px;
    grid-column: 2;
  }
  .add-btn{
    margin-right: 15px;
  }

.track-content {
  margin-top: 16px;
  padding-bottom: 30px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 60px;

  padding: 30px 50px;
}

.track-manage-btns{
  grid-column: 2;
  display: flex;
  justify-content: space-between;
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
    grid-column: span 2;
  }
}

.track-content-ordered {
  grid-column-start: 2;
}

.track-item-list {
  grid-column-start: 2;

  display: flex;
  flex-direction: column;
  gap: 20px;
}

.track-item {}

// .track-content-item-main {
//   display: flex;
// }

// .track-content-item-side {}
</style>
