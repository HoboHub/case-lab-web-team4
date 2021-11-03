<template>
  <div class="container d-flex flex-center">
  <TrackForms
  :initial-values="initialValues"
  :validation-errors="validationErrors"
  :is-submitting="isSubmitting"
  @trackSubmit="onSubmit"
  />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import TrackForms from '@/components/trackRelated/TrackForms.vue';

export default {
  name: 'CreateTrack',
  components: {
    TrackForms,
  },
  data() {
    return {
      initialValues: {
        name: '',
        previewText: '',
        previewPicture: '',
        dateTimeStart: '',
        dateTimeFinish: '',
      },
      validationErrors: null,
      isSubmitting: false,
    };
  },
  methods: {
    ...mapActions(['createTrack']),
    async onSubmit(form) {
      this.isSubmitting = true;
      await this.createTrack(form);
      this.isSubmitting = false;
      this.$router.push({ name: 'Tracks' });
    },
  },
};
</script>

<style scoped>

</style>
