<template>
  <div id="nav">
      <router-link to="/login" class="menu-login">
        <i class="fas fa-users-cog"></i>
      </router-link>
      <div class="menu">
        <router-link to="/home" class="menu-item">
          <i class="fas fa-home"></i>
        </router-link>
        <router-link to="/catalog" class="menu-item">
          <i class="far fa-check-circle"> </i>
        </router-link>
        <router-link to="/tracks" class="menu-item">
          <i class="fas fa-location-arrow"></i>
        </router-link>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Navigation',
};
</script>

<style lang="scss" scoped>
  #nav {
  position: fixed;
  top: 0;
  left: 0;
  background: linear-gradient(to bottom, #bc9cff, #8ba4f9);
  height: 100%;
  z-index: 999;

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
  padding-left: 70px;
}

// Не используется
// .btn-changeRole {
//   display: inline-flex;
//   align-items: center;
//   gap: 10px;
//   justify-content: center;
//   margin-top: 10px;
//   border: 1px solid black;
//   border-radius: 22px;
//   padding: 9px 20px;
//   background-color: transparent;
//   transition-duration: .25s;

//   span {
//     font-size: 14px;
//     font-weight: bold;
//     color: #1f2041;
//   }
//   &:hover {
//     background-color: #66D2EA;
//     border: 1px solid darken(#66D2EA, 10%);
//   }
// }
</style>
