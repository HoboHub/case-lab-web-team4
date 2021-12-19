<template>
  <div class="track-item-list" v-if="this.theDetails">
    <div v-for="(item, index) in even(this.theDetails)"
         :key="index"
         class="drop-zone"
         @dragover.prevent
         @dragenter.prevent
         @drop="isMaster && onDrop($event, index)"
    >
      <TrackItem
        :trackId="trackId"
        :name="item.entityName"
        :duration="item.entityDuration"
        :type="item.data.type"
        :id="item.id"
        :detail-data="item.data"
        :draggable="isMaster"
        @dragstart="isMaster && startDrag($event, item)"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import TrackItem from '@/components/trackRelated/TrackItem.vue';

export default {
  name: 'TrackItemList',
  props: {
    trackId: {
      type: Number,
      required: true,
    },
  },
  components: {
    TrackItem,
  },
  async mounted() {
    if (!this.theDetails) {
      await this.getTrackDetails(this.trackId);
      const detailsRaw = this.getTrackDetailsFromStore(this.trackId);
      this.theDetails = detailsRaw.details;
    }
    if (this.theDetails.length) {
      this.countDuration();
    }

    // this.details(this.getUser.role);
    // this.getItemType(this.getUser.role);
    // this.getTrackDuration();
  },
  computed: {
    ...mapGetters(['getTrackDetailsFromStore', 'getUser']),

    isMaster() {
      return this.getUser.role === 'teacher';
    },

    requiredDetailsQuantity() {
      return [...this.theDetails.filter((i) => i.data.required === true)].length;
    },
    finishedDetailsQuantity() {
      return [...this.theDetails.filter((i) => i.finished === true)].length;
    },

  },
  data() {
    return {
      theDetails: '',
    };
  },
  methods: {
    ...mapActions(['getTrackDetails', 'changeTrackDetailData']),

    countDuration() {
      const durRes = this.theDetails
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

      this.$emit('durationCounted', {
        duration: Math.ceil(durRes.reduce((a, b) => a + b) / 60),
        completion: (
          this.finishedDetailsQuantity / this.requiredDetailsQuantity) * 100,
      });
    },

    startDrag(evt, item) {
      evt.dataTransfer.dropEffect = 'move';
      evt.dataTransfer.effectAllowed = 'move';
      evt.dataTransfer.setData('itemId', item.id);
    },
    onDrop(evt, list) {
      const itemId = evt.dataTransfer.getData('itemId');
      const item = this.theDetails.find((i) => i.id === +itemId);
      item.data.sortIndex = list;
      this.changeTrackDetailData({ id: item.id, newData: item.data });
    },
    even(arr) {
      // Set slice() to avoid to generate an infinite loop!
      return arr.slice().sort((a, b) => a.data.sortIndex - b.data.sortIndex);
    },
  },

};
</script>

<style scoped>

</style>
