<template>
  <div class="container">
    <h2 class="login-title">Зайти как :</h2>
    <div class="login-choice">
      <Button
        @click="login('teacher')"
        :active="getUser.role === 'teacher'">Учитель</Button>
      <Button
        @click="login('student')"
        :active="getUser.role === 'student'">Ученик</Button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Button from '@/components/Button.vue';

export default {
  name: 'Login',
  components: {
    Button,
  },

  mounted() {
    this.clearTracks();
    // this.changeUser('');
  },

  computed: {
    ...mapGetters(['getUser']),
  },

  methods: {
    ...mapActions(['changeUser', 'clearTracks']),

    login(role) {
      this.changeUser(role);
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
