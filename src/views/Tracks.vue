<template>
  <div class="home">
    <h1>Страница списка треков</h1>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
// import Track from '@/services/track/track';

export default {
  name: 'Home',
  components: {
  },

  mounted() {
    if (!this.tracks) {
      this.getTracks();
    }

    // this.getTrack();
  },

  computed: {
    ...mapState({ tracks: 'tracks' }),
  },

  methods: {
    ...mapActions(['getTracks']),
    // getTrack() {
    //   Track.getTrackById(34, 'teacher');
    // },
  },
};
</script>
