//disable-eslint
<template v-cloak>
  <Dropdown class="my-dropdown-toggle"
            :options="this.getDepartments"
            :selected="departmentSelected"
            :placeholder="departmentSelected"
            v-on:updateOption="methodToRunOnSelect"
            :closeOnOutsideClick="boolean">
  </Dropdown>
  <Dropdown class="my-dropdown-toggle"
            :options="this.getCompanies"
            :selected="companySelected"
            :placeholder="companySelected"
            v-on:updateOption="methodToRunOnSelectCompany"
            :closeOnOutsideClick="boolean">
  </Dropdown>

  <input type="text" v-model="departmentName" @input="fetchCompanies">

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Dropdown from '@/components/Dropdown.vue';

export default {
  name: 'AddStudents',
  components: {
    Dropdown,
  },
  mounted() {
    this.fetchUsers();
    this.fetchDepartments();
  },
  computed: {
    ...mapGetters(['getUsers', 'getDepartments', 'getCompanies']),
  },
  data() {
    return {
      departmentSelected: 'Дивизион',
      companySelected: 'Компания',
    };
  },

  methods: {
    ...mapActions(['fetchUsers', 'fetchDepartments', 'fetchCompanies']),
    methodToRunOnSelect(payload) {
      this.departmentSelected = payload;
      this.fetchCompanies(this.departmentSelected);
    },
    methodToRunOnSelectCompany(payload) {
      this.companySelected = payload;
    },
  },

};

</script>

<style scoped lang="scss">
.my-dropdown-toggle {
  border-radius: 5px;

::v-deep .dropdown-toggle {
  color: tomato;
  font-size: 25px;
  font-weight: 800;
}

::v-deep .dropdown-toggle-placeholder {
  color: #c4c4c4;
}
}
</style>
