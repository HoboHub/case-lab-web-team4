//disable-eslint
<template v-if="this.track">
  <div class="container d-flex flex-column">
    <ActionResult></ActionResult>
    <h2 class="form-name">Записать студента на трек <br>"{{
        track.data.name
      }}"
    </h2>
    <div class="form d-flex flex-column gap-3">
      <div class="form-header cnt-local d-flex flex-column gap-1">
        <div class="group">
          <input type="text" class="form-username"
                 v-model="searchData.inputData"
                 @input="onInputCustom" placeholder="Поиск пользователя">
          <span class="highlight"></span>
          <span class="bar"></span>
        </div>
        <Dropdown
          class="my-dropdown-toggle"
          :options="this.departments"
          :selected="searchData.departmentSelected || 'Департамент'"
          :placeholder="searchData.departmentSelected || 'Департамент'"
          v-on:updateOption="selectDepartment"
          :closeOnOutsideClick="true"
          :disabled="!this.departments || this.isLoading"
        >
        </Dropdown>
        <Dropdown
          class="my-dropdown-toggle"
          :options="this.companies"
          :selected="searchData.companySelected || 'Компания'"
          :placeholder="searchData.companySelected || 'Компания'"
          v-on:updateOption="selectCompany"
          :closeOnOutsideClick="true"
          :disabled="!this.companies || this.isLoading"
        >
        </Dropdown>
      </div>
      <div class="form-body d-flex flex-column">

        <div class="form-head-buttons">
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
          <caption>Результаты поиска</caption>
          <thead>
          <tr>
            <th>ФИО</th>
            <th>Дивизион</th>
            <th>Предприятие</th>
            <th>Записать</th>
          </tr>
          </thead>
          <tbody style="position:relative;">
          <Preloader v-show="isLoading"></Preloader>
          <tr v-if="!Object.values(searchData).some(i => i) && !isLoading">
            <td colspan="6">Введите ФИО или Логин пользователя</td>
          </tr>
          <tr v-else-if="users.length === 0 && !isLoading">
            <td colspan="6">Пользователей с такими данными не найдено...</td>
          </tr>
          <tr v-else v-for="(user, index) in users" :key="index">
            <td>{{ user.fullName }}</td>
            <td>{{ user.data.department }}</td>
            <td>{{ user.data.company }}</td>
            <td>
              <input type="checkbox"
                     :checked="chosenUsers.includes(user)"
                     @change="this.chooseUser($event, user)"></td>
          </tr>
          <tr class="filler"></tr>

          </tbody>
        </table>
        <table class="form-enroll">
          <caption>Будут записаны</caption>
          <thead>
          <tr>
            <th>ФИО</th>
            <th>Дивизион</th>
            <th>Предприятие</th>
            <th>Записать</th>

          </tr>
          </thead>
          <tbody>
          <tr v-for="(user, index) in chosenUsers" :key="index">
            <td>{{ user.fullName }}</td>
            <td>{{ user.data.department }}</td>
            <td>{{ user.data.company }}</td>
            <td>
              <Button type="button"
                      @click="this.removeUser(user)">
                <i class="fas fa-times"></i></button>
            </td>
          </tr>
          <tr class="filler"></tr>
          </tbody>
        </table>
      </div>
      <div class="form-footer cnt-local">
        <div class="modal-footer">
          <Button
            :btn-orange="true"
            :border-disabled="true"
            @click="this.$router.back()"

          >
            Отмена
          </Button>

          <Button type="button" @click="assignTracks"
                  :btn-blue="true" style="border: none;">Подтвердить
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
import Dropdown from '@/components/Dropdown.vue';
import Button from '@/components/Button.vue';
import Track from '@/services/track/track';
import Preloader from '@/components/Preloader.vue';

export default {
  name: 'AddStudents',
  components: {
    Dropdown, Button, ActionResult, Preloader,
  },
  mounted() {
    this.fetchDepartments();
    this.clearCompanies();
    this.onInputCustom = debounce(this.onInputCustom, 200);
  },
  computed: {
    ...mapGetters({
      users: 'getUsers',
      departments: 'getDepartments',
      companies: 'getCompanies',
      isLoading: 'getLoadingStatus',
      getTrackByIdStore: 'getTrackByIdStore',
    }),
    track() {
      return this.getTrackByIdStore(+this.$route.params.id);
    },
  },
  data() {
    return {
      searchData: {
        departmentSelected: '',
        companySelected: '',
        inputData: '',
      },
      chosenUsers: [],
    };
  },

  methods: {
    ...mapActions(['fetchUsers', 'fetchDepartments', 'fetchCompanies', 'clearCompanies', 'clearUsers', 'changeSuccessStatus']),
    selectDepartment(payload) {
      this.searchData.companySelected = '';
      this.clearUsers();
      this.onInputCustom();
      this.searchData.departmentSelected = payload;
      this.fetchCompanies(this.searchData.departmentSelected);
    },
    selectCompany(payload) {
      this.searchData.companySelected = payload;
      this.onInputCustom();
    },
    onInputCustom() {
      this.fetchUsers(
        {
          q: this.searchData.inputData,
          department: this.searchData.departmentSelected,
          company: this.searchData.companySelected,
        },
      );
    },

    chooseUser(event, user) {
      if (event.target.checked) {
        this.chosenUsers.push(user);
      } else {
        this.removeUser(user);
      }
    },
    removeUser(user) {
      this.chosenUsers = this.chosenUsers.filter((i) => i.id !== user.id);
    },

    resetInputs() {
      this.searchData.departmentSelected = '';
      this.searchData.inputData = '';
      this.searchData.companySelected = '';
      this.clearUsers();
    },

    async assignTracks() {
      await this.chosenUsers.forEach((i) => {
        Track.assignTrack(this.track.id, i.id, 'teacher');
      });
      this.changeSuccessStatus(true); // ЗАГЛУШКА
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

.form-results, .form-enroll {
  border: solid #8BA4F9 1px;
  border-radius: 5px;
  text-align: center;
  border-spacing: 0;
  min-height: 400px;

  caption {
    text-align: left;
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
    color: #8BA4F9;
    margin-bottom: 15px;
  }

  th {
    font-weight: 400;
    border-bottom: solid #8BA4F9 1px;
  }

  th, td {
    padding: 16px 18px;
  }

  th:first-child, td:first-child {
    width: 20%;
    white-space: nowrap;
  }

  th:last-child, td:last-child {
    text-align: center;
    width: 10%;

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

.form-username, .form-filter {
  border-radius: 5px;
  padding-left: 15px;
}

.form-head-buttons {
  align-self: center;
  max-width: 800px;
  display: flex;
  justify-content: flex-end;
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
