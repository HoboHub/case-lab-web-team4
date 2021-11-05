//disable-eslint
<template v-cloak>
  <div class="d-flex flex-column gap-2" style="max-width: 50%; margin: 0 auto">
    <Dropdown
      class="my-dropdown-toggle"
      :options="this.getDepartments"
      :selected="departmentSelected || 'Департамент'"
      :placeholder="departmentSelected || 'Департамент'"
      v-on:updateOption="selectDepartment"
      :closeOnOutsideClick="true"
      :disabled="!this.getDepartments"
    >
    </Dropdown>
    <Dropdown
      class="my-dropdown-toggle"
      :options="this.getCompanies"
      :selected="companySelected || 'Компания'"
      :placeholder="companySelected || 'Компания'"
      v-on:updateOption="methodToRunOnSelectCompany"
      :closeOnOutsideClick="true"
      :disabled="!this.getCompanies"
    >
    </Dropdown>

    <input type="text" v-model="searchData" placeholder="ФИО или Логин" @input="onInputCustom"/>

    <div v-if="getUsers">
      <ul>
        <li v-for="(user, indx) in getUsers" :key="indx" class="d-flex">
          {{ user.fullName  }} | {{user.data.department}} | {{user.data.company}} | Записать
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { debounce } from '@/helpers/debounce';
import Dropdown from '@/components/Dropdown.vue';

export default {
  name: 'AddStudents',
  components: {
    Dropdown,
  },
  async mounted() {
    this.fetchDepartments();
    this.clearCompanies();
    this.onInputCustom = debounce(this.onInputCustom, 300);
  },
  computed: {
    ...mapGetters(['getUsers', 'getDepartments', 'getCompanies']),

    // users() {
    //   return this.getUsers
    //     .filter(
    //       (user) => this.departmentSelected === '' ||
    //       this.departmentSelected === user.data.department,
    //     )
    //     .filter((user) => this.companySelected === '' ||
    //     this.companySelected === user.data.company);
    // },
  },
  data() {
    return {
      departmentSelected: '',
      companySelected: '',
      searchData: '',
    };
  },

  methods: {
    ...mapActions(['fetchUsers', 'fetchDepartments', 'fetchCompanies', 'clearCompanies', 'clearUsers']),
    selectDepartment(payload) {
      this.companySelected = '';
      this.clearUsers();
      this.onInputCustom();
      this.departmentSelected = payload;
      this.fetchCompanies(this.departmentSelected);
    },
    methodToRunOnSelectCompany(payload) {
      this.companySelected = payload;
      this.onInputCustom();
    },
    onInputCustom() {
      console.log('fetch');
      this.fetchUsers(
        { q: this.searchData, department: this.departmentSelected, company: this.companySelected },
      );
    },
  },
};
</script>

<style scoped lang="scss">
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
</style>
