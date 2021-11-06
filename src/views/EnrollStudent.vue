<template>
  <div class="container d-flex flex-center">
  <EnrollForm
  :initial-values="initialValues"
  :validation-errors="validationErrors"
  :is-submitting="isSubmitting"
  @trackSubmit="onSubmit"
  />

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import EnrollForm from '@/components/trackRelated/EnrollForm.vue';

export default {
  name: 'EnrollStudent',
  components: {
    EnrollForm,
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
    ...mapActions(['enrollStudent']),
    async onSubmit(form) {
      this.isSubmitting = true;
      await this.enrollStudent({
        id: this.track.id,
        form,
      });
      this.isSubmitting = false;
      this.$router.push({ name: 'Tracks' });
    },
  },
};
</script>

<style scoped>

</style>
