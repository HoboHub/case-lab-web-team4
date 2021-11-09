//disable-eslint
<template v-if="this.track">
  <div class="container d-flex flex-column">
    <ActionResult></ActionResult>
    <h2 class="form-name">
      Добавить {{ this.searchTarget === "courses" ? "курсы" : "мероприятия" }} в трек <br/>
      "{{ track.data.name }}"
    </h2>
    <div class="form d-flex flex-column gap-3">
      <div class="form-header cnt-local d-flex flex-column gap-1">
        <div class="group">
          <input
            type="text"
            class="form-entityName"
            v-model="searchData.inputData"
            @input="onInputCustom"
            :placeholder="'Поиск ' + (this.searchTarget === 'courses' ? 'курсов' : 'мероприятий')"
          />
          <span class="highlight"></span>
          <span class="bar"></span>
        </div>
      </div>
      <div class="form-body d-flex flex-column">
        <div class="form-head-buttons">
          <Button
            @click="searchTarget = 'courses'"
            :active="searchTarget === 'courses'"
            class="courses-btn"
          >
            <i class="fas fa-location-arrow"></i> Курсы
          </Button>
          <Button
            @click="searchTarget = 'events'"
            :active="searchTarget === 'events'"
            class="events-btn"
          >
            Мероприятия
          </Button>
          <Button
            :btn-orange="true"
            :border-disabled="true"
            @click="resetInputs"
            :btnDisabled="this.isLoading"
          >
            <i class="fas fa-times"></i>
            Сброс
          </Button>
        </div>
        <table class="form-results">
          <caption>
            Результаты поиска
          </caption>
          <thead>
          <tr>
            <th>Название</th>
            <th>Длительность</th>
            <th>Добавить</th>
          </tr>
          </thead>
          <tbody style="position:relative;">
          <Preloader v-show="isLoading"></Preloader>
          <tr v-if="!Object.values(searchData).some(i => i) && !isLoading">
            <td colspan="6">Введите название курса или мероприятия</td>
          </tr>
          <tr v-else-if="(courses.length === 0 && events.length === 0) && !isLoading">
            <td colspan="6">Результатов, соответсвующих запросу, не обнаружено</td>
          </tr>
          <tr v-else v-for="(item, index) in searchTarget === 'courses' ? courses : events"
              :key="index">
            <td>{{ item.name }}</td>
            <td class="item-name">{{ item.duration || 'Не определено' }}</td>
            <td>
              <input
                type="checkbox"
                :checked="chosenCourses.includes(item) || chosenEvents.includes(item)"
                @change="this.chooseDetail($event, item)"
              />
            </td>
          </tr>
          <tr class="filler"></tr>
          </tbody>
        </table>
        <table class="form-enroll">
          <caption>
            Будут добавлены:
          </caption>
          <thead>
          <tr>
            <th>Название</th>
            <th>Длительность</th>
            <th>Добавить</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in [...chosenCourses, ...chosenEvents]" :key="index">
            <td>{{ item.name }}</td>
            <td class="item-name">{{ item.duration || 'Не определено' }}</td>
            <td>
              <Button type="button" @click="this.removeDetail(item)">
                <i class="fas fa-times"></i
                ></Button>
            </td>
          </tr>
          <tr class="filler"></tr>
          </tbody>
        </table>
      </div>
      <div class="form-footer cnt-local">
        <div class="modal-footer">
          <Button :btn-orange="true" :border-disabled="true">
            Отмена
          </Button>

          <Button
            type="button"
            @click="addDetailsToTrack"
            :btn-disabled="isSubmitting"
            :btn-blue="true"
            style="border: none;"
          >Подтвердить
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { debounce } from '@/helpers/debounce';
import ActionResult from '@/components/ActionResult.vue';
import Button from '@/components/Button.vue';
import Preloader from '@/components/Preloader.vue';

export default {
  name: 'AddDetail',
  components: {
    Button,
    ActionResult,
    Preloader,
  },
  mounted() {
    this.onInputCustom = debounce(this.onInputCustom, 200);
  },
  computed: {
    ...mapGetters({
      getTrackByIdStore: 'getTrackByIdStore',
      courses: 'getCourses',
      events: 'getEvents',
      isLoading: 'getLoadingStatus',
    }),
    track() {
      return this.getTrackByIdStore(+this.$route.params.id);
    },

  },
  data() {
    return {
      searchData: {
        inputData: '',
      },
      chosenCourses: [],
      chosenEvents: [],
      searchTarget: 'courses',
      isSubmitting: false,
    };
  },

  methods: {
    ...mapActions(['fetchCourses', 'fetchEvents', 'addDetailToTrack', 'changeSuccessStatus', 'clearCourses', 'clearEvents']),

    onInputCustom() {
      if (this.searchTarget === 'courses') {
        this.fetchCourses(this.searchData.inputData);
      } else if (this.searchTarget === 'events') {
        this.fetchEvents(this.searchData.inputData);
      }
    },

    chooseDetail(event, detail) {
      if (event.target.checked) {
        if (this.searchTarget === 'courses') {
          this.chosenCourses.push(detail);
        }
        if (this.searchTarget === 'events') {
          this.chosenEvents.push(detail);
        }
      } else {
        this.removeDetail(detail);
      }
    },
    removeDetail(detail) {
      this.chosenCourses = this.chosenCourses.filter((i) => i.id !== detail.id);
      this.chosenEvents = this.chosenEvents.filter((i) => i.id !== detail.id);
    },

    resetInputs() {
      this.searchData.inputData = '';
    },

    async addDetailsToTrack() {
      await this.chosenCourses.forEach((i) => {
        this.addDetailToTrack({
          trackId: this.track.id,
          detailData: {
            type: 'course', entityId: i.id, sortIndex: 0, required: false,
          },
        });
      });
      await this.chosenEvents.forEach((i) => {
        this.addDetailToTrack({
          trackId: this.track.id,
          detailData: {
            type: 'event', entityId: i.id, sortIndex: 0, required: false,
          },
        });
      });
      this.changeSuccessStatus(true); // ЗАГЛУШКА
    },
  },

  watch: {
    searchTarget() {
      this.clearCourses();
      this.clearEvents();
      this.resetInputs();
    },
  },
};
</script>

<style scoped lang="scss">
.cnt-local {
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
}

.form-results,
.form-enroll {
  border: solid #8ba4f9 1px;
  border-radius: 5px;
  text-align: center;
  border-spacing: 0;
  min-height: 400px;

  caption {
    text-align: left;
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
    color: #8ba4f9;
    margin-bottom: 15px;
  }

  th {
    font-weight: 400;
    border-bottom: solid #8ba4f9 1px;
  }

  th,
  td {
    padding: 16px 18px;
  }

  th:first-child,
  td:first-child {
    text-align: left;
  }

  th:last-child,
  td:last-child {
    text-align: center;

    button {
      margin: 0 auto;
    }
  }
}

.form-body {
  gap: 24px;
  width: 90%;
  margin: 0 auto;

}

tbody {
  tr {
    position: relative;

    &:after {
      content: '';
      position: absolute;
      width: 96%;
      height: 2px;
      top: 0;
      left: 50%;
      transform: translate(-50%, 0%);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 50px;
    }

    &:first-of-type, &:last-of-type {
      &:after {
        content: none;
      }
    }

  }

}

.form-username,
.form-filter {
  border-radius: 5px;
  padding-left: 15px;
}

.form-head-buttons {
  align-self: center;
  max-width: 800px;
  display: flex;
  justify-content: space-around;
  gap: 10px;
}

.form-name {
  font-weight: 800;
  font-size: 36px;
  color: #1f2041;
  margin-bottom: 16px;
}

.form-filter {
  border-radius: 5px;
  width: 50%;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
}

.filler {
  width: 100%;
  height: 100%;
}
.item-name{
  white-space: nowrap;
}

.my-dropdown-toggle {
  border-radius: 5px;

  ::v-deep .dropdown-toggle {
    color: tomato;
    font-size: 20px;
    font-weight: 400;
  }

  ::v-deep .dropdown-toggle-placeholder {
    color: #3765ff;
  }
}

//==============================================
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
input:valid ~ label {
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
input:focus ~ .bar:after {
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
