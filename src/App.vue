<template>
  <div>
    <!--    <div id="nav">-->
    <!--      <router-link to="/">Главная</router-link>
     | <router-link to="/catalog">Каталог</router-link> |-->
    <!--      <router-link to="/tracks">Треки</router-link>-->
    <!--    </div>-->
    <router-link to='/login' v-if="viewChangeRole">
      <div class="btn-changeRole">
        <img src="@/assets/person.svg" alt="person">
        <span>Сменить роль</span>
      </div>
    </router-link>
    <router-view />
  </div>
</template>

<script>
// задает видимость кнопки Сменить роль
export default {
  name: 'app',
  computed: {
    viewChangeRole() {
      return this.$route.path === '/tracks';
      // return this.$route.path === '/login';
    },
  },
};
</script>

<style lang="scss">
@import "assets/zero.css";
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,300;0,400;0,500;0,700;0,800;1,400&family=Roboto:wght@300;400;700;900&display=swap");
#app {
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  position: fixed;
  top: 0;
  left: 0;
  background: linear-gradient(to bottom, #bc9cff, #8ba4f9);
  height: 100%;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

  .menu {
    padding: 10px;
    height: 90%;
    display: flex;
    justify-content: center;
    flex-direction: column;

    .menu-item {
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #ffffff;
      font-size: 20px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
  .menu-login {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    margin-left: 10px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
}
.container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 10px 12px;
}

.btn-changeRole {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  margin-top: 10px;
  border: 1px solid black;
  border-radius: 22px;
  padding: 9px 20px;
  background-color: transparent;
  transition-duration: .25s;
  img {}
  span {
    font-size: 14px;
    font-weight: bold;
    color: #1f2041;
  }
  &:hover {
    background-color: #66D2EA;
    border: 1px solid darken(#66D2EA, 10%);
  }
}
</style>
