<template>
  <div class="d-flex flex-column">
    <h2 class="track-name">Записать студента на трек <br>"{{
        truncate(name, 38, "...") || "Имя трека"
      }}"
    </h2>
    <form @submit.prevent="onSubmit" class="form d-flex flex-column">
      <div class="group">
        <input type="text" :disabled="isSubmitting" class = "form-username" required
                v-model="username" placeholder="Поиск пользователя">
        <span class="highlight"></span>
        <span class="bar"></span>
      </div>
      <div class="form-body d-flex flex-column">
        <div class="group">
          <input type="text" :disabled="isSubmitting" class="form-filter" v-model="division"
                  required placeholder="Дивизион">
          <span class="highlight"></span>
          <span class="bar"></span>
        </div>
        <div class="group">
          <input type="text" :disabled="isSubmitting" class="form-filter" v-model="company"
                  required placeholder="Предприятие">
          <span class="highlight"></span>
          <span class="bar"></span>
        </div>
        <Button
            :btn-orange="true"
            :border-disabled="true"
          >
            Сброс
        </Button>
        <Button
            :btn-blue="true"
            :border-disabled="true"
          >
            Применить
        </Button>
      </div>
      <div class="form-footer">
        <div class="modal-footer">
          <Button
            :btn-orange="true"
            :border-disabled="true"
          >
            Отмена
          </Button>

          <Button type="submit" @submit.prevent
                  :btn-disabled="isSubmitting" :btn-blue="true">Подтвердить
          </Button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';

export default {
  name: 'EnrollForm',
  props: {
    initialValues: {
      type: Object,
      required: true,
    },
    validationErrors: {
      type: Array,
      required: false,
    },
    isSubmitting: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    Button,
  },

  computed: {
  },
  data() {
    return {
      name: this.initialValues.name,
      previewText: this.initialValues.previewText,
      previewPicture: this.initialValues.previewPicture,
      dateTimeStart: this.initialValues.dateTimeStart,
      dateTimeFinish: this.initialValues.dateTimeFinish,

      pictureToUpload: '',
    };
  },
  methods: {
    onSubmit() {
      const form = {
        name: this.name,
        previewText: this.previewText,
        previewPicture: this.pictureToUpload || this.previewPicture,
        dateTimeStart: this.dateTimeStartComputed,
        dateTimeFinish: this.dateTimeFinishComputed,
      };
      this.$emit('trackSubmit', form);
    },
    truncate(text, length, suffix) {
      if (text.length > length) {
        return text.substring(0, length) + suffix;
      }
      return text;
    },

    onFileSelected(event) {
      // eslint-disable-next-line prefer-destructuring
      const fd = new FormData();
      fd.append('file', event.target.files[0]);
      this.pictureToUpload = fd;
    },

    resetPicture() {
      this.pictureToUpload = null;
    },
  },
};
</script>

<style scoped lang="scss">
.form {
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  gap: 24px;
}

.form-body {
  gap: 24px;
}

.track-name {
  font-weight: 800;
  font-size: 36px;
  color: #1f2041;
  margin-bottom: 16px;
}

.form-filter {
  border-radius: 5px;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
}

// ===========================================================
.group {
  position: relative;
}

input {
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: 1px solid #8ba4f9;
  border-bottom: 1px solid #757575;
}

input:focus,
textarea:focus {
  outline: none;
}

/* LABEL ======================================= */

/* active state */
input:focus ~ label,
input:valid ~ label,
textarea:focus ~ label,
textarea:valid ~ label {
  top: -20px;
  font-size: 14px;
  color: #5264ae;
}

/* BOTTOM BARS ================================= */
.bar {
  position: relative;
  display: block;
}

.bar:before,
.bar:after {
  content: "";
  height: 2px;
  width: 0;
  bottom: 1px;
  position: absolute;
  background: #5264ae;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}

.bar:before {
  left: 50%;
}

.bar:after {
  right: 50%;
}

/* active state */
input:focus ~ .bar:before,
input:focus ~ .bar:after,
textarea:focus ~ .bar:before,
textarea:focus ~ .bar:after {
  width: 50%;
}

/* HIGHLIGHTER ================================== */
.highlight {
  position: absolute;
  height: 60%;
  width: 100px;
  top: 25%;
  left: 0;
  pointer-events: none;
  opacity: 0.5;
}
</style>
