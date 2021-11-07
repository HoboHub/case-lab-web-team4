<template>
  <div class="track-item-list" v-if="this.theDetails">
    <TrackItem
      v-for="item in this.theDetails"
      :key="item.id"
      :name="item.entityName"
      :duration="item.entityDuration"
      :type="item.data.type"
      :id="item.id"
      :trackId="trackId"
      :detail-data="item.data"/>
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
      await this.getDetails();
    }
    this.countDuration();
    // this.details(this.getUser.role);
    // this.getItemType(this.getUser.role);
    // this.getTrackDuration();
  },
  computed: {
    ...mapGetters(['getTrackDetailsFromStore']),
    theDetails() {
      try {
        const detailsRaw = this.getTrackDetailsFromStore(this.trackId);
        return detailsRaw.details;
      } catch (err) {
        return undefined;
      }
    },

  },
  data() {
    return {
      trackDetail: null,
    };
  },
  methods: {
    ...mapActions(['getTrackDetails']),
    async getDetails() {
      const result = await this.getTrackDetails(this.trackId);
      this.trackDetail = result;
    },
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

      this.$emit('durationCounted', Math.ceil(durRes.reduce((a, b) => a + b) / 60));
    },
  },

};
</script>

<style scoped>

</style>
