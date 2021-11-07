<template>
    <div class="item">
        <div class="item-bg-img" style="overflow: hidden; position: relative;">
        </div>

        <div v-if="itemDetail"
          class="item-type-block">
          {{itemDetail.data.type}}
        </div>

        <div class="item-content container">

            <router-link
                :to="`/track/${trackId}`"
                class="link-back">
                <i class="fas fa-arrow-left"></i>
                К треку
            </router-link>

          <div v-if="isMaster" class="admin-btns d-flex flex-column gap-2">
            <Button
                :btn-orange="true"
                class="redact-btn">
                <i class="fas fa-pencil"></i>
                Редактировать
            </Button>
          </div>

            <ItemInfoMain :name="itemDetail.entityName" />

            <ItemInfoSub v-if="itemDetail"
                :duration="itemDetail.entityDuration"
                :itemType="itemDetail.data.type"/>

            <!-- <div class="item-manage-btns">
                <Button v-if="isMaster"
                    :btn-orange="true"
                    class="add-btn">
                    <i class="fas fa-plus"></i>
                    Добавить элемент
                </Button>
                <Button v-if="isMaster"
                    :btn-blue="true"
                    class="enroll-btn">
                    <img src="../assets/student.svg" alt="student">
                    Записать студента
                </Button>
            </div> -->
            <div
                class="item-content-ordered">
                <Button
                :class="{'btn-test': true, 'btn-disabled': false}">
                Входное тестирование
                </Button>
            </div>

            <div class="item-list">

            </div>
        </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TrackDetail from '@/services/track/trackDetail';
import Button from '@/components/Button.vue';
import ItemInfoMain from '@/components/itemRelated/ItemInfoMain.vue';
import ItemInfoSub from '@/components/itemRelated/ItemInfoSub.vue';

export default {
  name: 'Item',
  components: {
    Button,
    ItemInfoMain,
    ItemInfoSub,
  },
  data() {
    return {
      itemDetail: '',
    };
  },
  computed: {
    ...mapGetters([
      'getUser',
      'getTrackByIdStore',
    ]),

    trackId() {
    //   console.log(+this.$route.fullPath.match(/\d+/)[0]);
      return +this.$route.fullPath.match(/\d+/)[0];
    },

    trackOfThis() {
      //   console.log(this.getTrackByIdStore(+this.$route.fullPath.match(/\d+/)[0]));
      return this.getTrackByIdStore(this.trackId);
    },

    itemId() {
    //   console.log('this is item id:', +this.$route.params.id);
    //   console.log('get track in item func:', this.trackOfThis.data);
      return this.$route.params.id;
    },

    isMaster() {
      return (this.getUser.role === 'teacher');
    },
  },
  methods: {
    async details(role, trackId) {
      const result = await TrackDetail.getTrackDetail(trackId, role);
      // eslint-disable-next-line prefer-destructuring
      this.itemDetail = result.filter((it) => it.id === Number(this.itemId))[0];
      //   this.itemDetail = result.filter((it) => it.id === Number(this.itemId));
    },
  },
  mounted() {
    this.details(this.getUser.role, this.trackId);
  },
};
</script>

<style lang="scss" scoped>

$bg-colors: rgb(255, 104, 58), rgb(87, 255, 219), orange, purple, #66D2EA;

.item-bg-img {
  background: lighten(nth($bg-colors, random(length($bg-colors))), 20%);
}

.item {
  color: #1f2041;
}

.item-type-block {
  position: absolute;
  right: 10px;
  top: 10px;
  background-color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0px 2px 2px #46464634;
  font-weight: bold;
}

.item-bg-img {
    width: 100%;
    min-height: 400px;
}

.item-cover {
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

// .flex-column {
//   flex-direction: column;
// }

// .d-flex {
//   width: 100%;
//   display: flex;
// }

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

.item-content {
  margin-top: 16px;
  padding-bottom: 30px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 60px;

  padding: 30px 50px;
}

.item-manage-btns{
  grid-column: 2;
  display: flex;
  justify-content: space-between;
}

// @media (min-width: 978px) {
@media (min-width: 968px) {
  .item-content {
    // grid-template-columns: 1fr;
    grid-template-columns: 1fr 6fr 2fr;
  }
  .item-info-main {
    grid-column-start: 2;
  }
  .item-info-sub {
    text-align: left;
    // align-self: center;
  }

  .link-back {
    grid-column: span 2;
  }
  .item-manage-btns, .item-content-ordered, .item-item-list {
    grid-column-start: 2;
  }
  .item-manage-btns {
    justify-content: space-between;
  }
}

.item-content-ordered {
  grid-column-start: 2;
}

.item-list {
  grid-column-start: 2;

  display: flex;
  flex-direction: column;
  gap: 20px;
}

// @media (min-width: 978px) {
@media (max-width: 967px) {
  .item-content {
    gap: 0px;
    row-gap: 60px;
  }
  .item-info-main {
    grid-column-start: 1;
  }
  .item-info-sub {
    grid-column-start: 1;
  }
  .item-content-ordered {
    grid-column-start: 1;
    display: flex;
    justify-content: center;
  }

  .admin-btns {
    grid-row-start: 2;
  }
}
</style>
