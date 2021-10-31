<template>
  <div class="container">

    <img class="error-bot" :src="ErrorBot" alt="bot">

    <h1 class="error-title">404: Наш робот не нашел эту страницу</h1>
    <p class="error-descr">Похоже что-то не так с адресом. Проверьте-ка URL</p>

    <div class="error__buttons">
      <Button @click="redirect" :active="true">
        <i class='fas fa-location-arrow spin'></i>
        Вернуться
      </Button>
      <Button>
        <img :src="BugBot" alt="bug">
        Сообщить об ошибке
      </Button>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';
import BugBot from '../../public/bug_bot.png';
import ErrorBot from '../../public/error-bot.png';

export default {
  name: '404',
  components: {
    Button,
  },
  data() {
    return {
      BugBot,
      ErrorBot,
    };
  },
  methods: {
    redirect() {
      this.$router.replace({ name: 'Tracks' });
    },
  },
};
</script>

<style lang="scss" scoped>
.container{
  height: 70vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 480px) {
    margin-top: 100px;
  }
}
h1{
  font-size: 40px;
}
p{
  font-size: 36px;
}

.spin {
  transform: rotate(-135deg)
}

.error__buttons {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
  @media (max-width: 968px) {
    // justify-content: start;
    // gap: 20px;
  }
}

.error-bot {
  width: 8rem;
  // @media (max-width: 480px) {
  //   width: 8rem;
  // }
}

.error-title {
  font-weight: bold;
  font-size: 24px;
}
.error-descr {
  font-weight: 300;
  font-size: 18px;
}
</style>
