<template>
  <div class="home">
    <h1>Страница списка треков</h1>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Home',
  components: {
  },

  mounted() {
    if (!this.tracks) {
      this.getTracks();
    }
  },

  computed: {
    ...mapState({ tracks: 'tracks' }),
  },

  methods: {
    ...mapActions(['getTracks']),
  },
};
</script>
