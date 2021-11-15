<template>
  <div class="errors-list">
    <p class="error"
       v-for="(error, index) in errorsCompared" :key="index">
      - {{error}}
    </p>
  </div>

</template>

<script>
import { gsap } from 'gsap';

export default {
  name: 'validationErrors',
  props: {
    validationErrors: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    const tl = gsap.timeline({ repeatDelay: 0.3 });
    document.querySelectorAll('.error').forEach((i) => {
      tl.fromTo(i, { opacity: 0 }, { opacity: 1, duration: 0.2 });
    });
  },
  computed: {
    errorsCompared() {
      const validationErrorsPropClone = { ...this.validationErrors };
      // eslint-disable-next-line array-callback-return
      return Object.keys(validationErrorsPropClone)
        // eslint-disable-next-line no-return-assign
        .map((key) => validationErrorsPropClone[key] = this.errors[key]);
    },
  },
  data() {
    return {
      errors: {
        name: 'Введите название',
        previewText: 'Введите описание',
        previewPicture: 'Прикрепите изображение',
        dateTimeStart: 'Укажите дату начала',
        dateTimeFinish: 'Укажите дату окончания',
      },
    };
  },
};
</script>

<style scoped lang="scss">
.errors-list {
  text-align: left;
  font-size: 24px;
  color: red;
  font-weight: 600;
}
</style>
