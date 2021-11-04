<template>
  <div class="container d-flex flex-center">
  <TrackForms
  :initial-values="initialValues"
  :validation-errors="validationErrors"
  :is-submitting="isSubmitting"
  @trackSubmit="onSubmit"
  @completed="onComplete"

  />

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import TrackForms from '@/components/trackRelated/TrackForms.vue';

export default {
  name: 'EditTrack',
  components: {
    TrackForms,
  },
  created() {
    this.initialValues = {
      name: this.track.data.name,
      previewText: this.track.data.previewText,
      previewPicture: this.track.data.previewPicture,
      dateTimeStart: this.track.data.dateTimeStart,
      dateTimeFinish: this.track.data.dateTimeFinish,
    };
  },
  computed: {
    ...mapGetters(['getTrackByIdStore']),

    track() {
      return this.getTrackByIdStore(+this.$route.params.id);
    },

  },
  data() {
    return {
      validationErrors: null,
      isSubmitting: false,
      initialValues: '',
    };
  },
  methods: {
    ...mapActions(['editTrack']),
    async onSubmit(form) {
      this.isSubmitting = true;
      await this.editTrack({
        id: this.track.id,
        form,
      });
      this.isSubmitting = false;
    },
    onComplete() {
      this.$router.push({ name: 'Tracks' });
    },
  },
};
</script>

<style scoped>

</style>
