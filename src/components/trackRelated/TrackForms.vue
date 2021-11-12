<template>
  <div style="width: 100%">
    <ActionResult></ActionResult>
    <div class="d-flex flex-column">
      <h2 class="track-name">Настройки трека <br>"{{
          truncate(form.name, 38, "...") || "Имя трека"
        }}"
      </h2>

      <form @submit.prevent="onSubmit" class="form d-flex flex-column">
        <ValidationErrors
          v-if="showErrors"
          :validation-errors='validationErrors' >

        </ValidationErrors>
        <div class="form-header">
          <div class="group">
            <input
              class="input-name"
              type="text"
              :disabled="isSubmitting"
               v-model="form.name"
              placeholder="Название трека"/>
            <span class="highlight"></span>
            <span class="bar"></span>
          </div>
        </div>
        <div class="form-body d-flex flex-column">
          <div class="group">
        <textarea
          type="text"
          :disabled="isSubmitting"
          class="description"
          v-model="form.previewText"

          placeholder="Описание трека"></textarea>
            <span class="highlight"></span>
            <span class="bar"></span>
          </div>
          <div class="dates-cnt">
            <div class="date-block start">
              <p class="">Дата открытия</p>
              <Datepicker
                inputClassName="input-date"
                uid="start"
                :disabled="isSubmitting"
                :maxDate="form.dateTimeFinish"
                :yearRange="yearRange"
                v-model="form.dateTimeStart">
              </Datepicker>
            </div>
            <div class="date-block finish">
              <p class="">Дата закрытия</p>
              <Datepicker
                inputClassName="input-date"
                uid="finish"
                :disabled="isSubmitting"
                :minDate="form.dateTimeStart"
                :yearRange="yearRange"
                v-model="form.dateTimeFinish"
              ></Datepicker>
            </div>
          </div>
          <input
            type="file"
            style="display:none;"
            id="loadFile"
            accept=".jpg, .jpeg, .png"
            @change="onFileSelected"
            :disabled="isSubmitting"
          />
          <div class="upload-file-cnt">
            <label for="loadFile">
              <Button
                :disabled="isSubmitting"
                class="upload-file-btn"
                type="button"
                :active="!pictureToUpload">Загрузить обложку
              </Button>
            </label>
            <p v-if="!pictureToUpload" class="d-flex gap-1 align-center">
              <i class="fas fa-times"></i>
              <u>Не загружено</u></p>
            <p v-else class="d-flex gap-1 align-center">
              <i class="fas fa-check" style="color: green"></i>
              <u class="reset" @click="resetPicture">Удалить</u>
            </p>
          </div>
        </div>
        <div class="form-footer">
          <div class="modal-footer">
            <Button
              :btn-orange="true"
              :border-disabled="true"
              @click="this.$router.back()"
            >
              Отмена
            </Button>

            <Button
              type="submit"
              @submit.prevent
              :btn-disabled="isSubmitting"
              :btn-blue="true"
              class="enroll-btn">
              Подтвердить
            </Button>
          </div>
        </div>
      </form>
    </div>

  </div>
</template>

<script>
import Datepicker from 'vue3-date-time-picker';
import Button from '@/components/Button.vue';
import ActionResult from '@/components/ActionResult.vue';
import ValidationErrors from '@/components/ValidationErrors.vue';

export default {
  name: 'TrackForms',
  props: {
    initialValues: {
      type: Object,
      required: true,
    },
    isSubmitting: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    Datepicker, Button, ActionResult, ValidationErrors,
  },

  computed: {

    yearRange() {
      const currentYear = new Date().getFullYear();
      return [currentYear - 5, currentYear + 5];
    },

    validationErrors() {
      const obj = {};
      Object.entries(this.form).forEach((entry) => {
        const [key, value] = entry;
        if (!value) {
          obj[key] = true;
        }
      });
      return obj;
    },
  },
  data() {
    return {
      form: {
        name: this.initialValues.name,
        previewText: this.initialValues.previewText,
        previewPicture: this.initialValues.previewPicture,
        dateTimeStart: this.initialValues.dateTimeStart,
        dateTimeFinish: this.initialValues.dateTimeFinish,

      },
      pictureToUpload: '',
      showErrors: false,
    };
  },
  methods: {
    onSubmit() {
      // eslint-disable-next-line array-callback-return
      if (Object.values(this.validationErrors).length) {
        debugger;
        this.showErrors = true;
        return null;
      }
      const form = {
        name: this.form.name,
        previewText: this.form.previewText,
        previewPicture: this.pictureToUpload || this.form.previewPicture,
        dateTimeStart: this.form.dateTimeStart,
        dateTimeFinish: this.form.dateTimeFinish,
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

::-webkit-input-placeholder {
  color: #3765FF;
}

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

.input-name {
  color: #3765FF;
  padding-left: 15px;
}

.description {
  padding-left: 15px;
  color: #3765FF;
  resize: vertical;
  min-height: 150px;
  margin-bottom: 16px;
  outline: none;
  resize: none;
}

.dates-cnt {
  text-align: left;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;

  .date-block {
    flex-grow: 1;
    min-width: 220px;

    p {
      font-weight: 700;
      font-size: 18px;
      margin-bottom: 8px;
    }
  }

  .input-date {
  }
}

.upload-file-cnt {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;

  label {
    cursor: pointer;
  }

  .upload-file-btn {
    white-space: nowrap;
    pointer-events: none;
  }

  i {
    font-size: 24px;
  }

  u {
    font-weight: 700;
    font-size: 12px;
    text-decoration: none;
  }

  .reset {
    cursor: pointer;
  }

}

.modal-footer {
  display: flex;
  justify-content: space-between;
}

// ===========================================================
.group {
  position: relative;
}

input,
textarea {
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: 1px solid #8ba4f9;
  border-radius: 5px;
  background: rgba(139, 164, 249, 0.05);
  // border-bottom: 1px solid #757575;
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
