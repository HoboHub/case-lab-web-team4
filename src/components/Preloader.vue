<template>
  <div class="preloader"></div>
</template>

<script>
import { gsap } from 'gsap';

export default {
  name: 'Preloader',
  mounted() {
    document.body.style.overflow = 'hidden';
    const images = document.querySelectorAll('img');
    let imagesLoaded = 0;

    images.forEach((i) => {
      i.addEventListener('load', () => {
        imagesLoaded += 1;
        if (imagesLoaded === images.length) {
          this.doneLoading();
        }
      });
    });
  },
  methods: {
    doneLoading() {
      document.body.style.overflow = 'auto';
      document.querySelector('.preloader').classList.remove('preloader');
      gsap.fromTo('body', { opacity: 0, duration: 0.3 }, { opacity: 1, duration: 0.7 });
    },
  },
};
</script>

<style scoped lang="scss">
.preloader {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;

  overflow: hidden;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background: url("../../public/spinner.gif") center no-repeat;
  }

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #000000;
    opacity: 0.7;
  }
}
</style>
