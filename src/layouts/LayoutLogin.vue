<template>
  <div class="container">
    <h2 class="login-title">Зайти как :</h2>
    <div class="login-choice">
      <Button
        @click="login('teacher')"
        :active="userRole === 'teacher'">Учитель</Button>
      <Button
        @click="login('student')"
        :active="userRole === 'student'">Ученик</Button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Button from '@/components/Button.vue';

export default {
  name: 'Login',
  components: {
    Button,
  },

  mounted() {
    this.clearTracks();
    // this.clearUserRole(); //стили кнопок зависят от userRole
    this.clearToken();
  },

  computed: {
    ...mapState({
      userRole: 'userRole',
    }),
  },

  methods: {
    ...mapActions(['changeUserRole', 'changeToken', 'clearTracks', 'clearUserRole', 'clearToken']),

    login(role) {
      this.changeUserRole(role);
      this.changeToken(role);
      this.redirect();
    },

    redirect() {
      this.$router.replace({ name: 'Tracks' });
    },
  },
};
</script>

<style lang="scss" scoped>
  .container {
    height: 70vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .login-title {
    font-size: 36px;
    font-weight: 900;
  }

  .login-choice {
    margin-top: 16px;
    display: flex;
    gap: 16px;
    justify-content: center;

    > div {
      font-size: 16px;
    }
  }

</style>
