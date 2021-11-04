<template>
  <div>
  <p v-show="this.isSuccess"  class="result success-text">SUCCESS</p>
  <p v-show="!this.isSuccess && this.isSuccess !== null"
     class="result failure-text">FAILURE</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { gsap } from 'gsap';

export default {
  name: 'ActionResult',
  mounted() {
    this.$store.dispatch('clearSuccess');
  },
  computed: {
    ...mapGetters({ isSuccess: 'getSuccessStatus' }),

  },
  methods: {
    completed() {
      this.$router.back();
    },
  },
  watch: {
    isSuccess(val) {
      if (val !== null) {
        gsap.fromTo('.result', { opacity: 0 }, {
          opacity: 1,
          duration: 2,
          onComplete: this.completed,
        });
      }
    },
  },

};
</script>

<style scoped lang="scss">
.result {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;

  height: 100%;
  font-size: 36px;
  font-weight: 700;
  background: rgb(0, 0, 0);
  z-index: 99;

}

.success-text {
  color: green;
}

.failure-text {
  color: red;
}

</style>
