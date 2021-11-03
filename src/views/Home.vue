<template>
  <div class="home">

    <div class="home-main-top">
      <img
        class="home-main-img"
        :src="MainImg"
        alt="main">
      <div class="home-main-text">
        <h2 class="home-title">Добро пожаловать</h2>
        <p
          class="home-subtitle">Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod
        </p>
        <div class="home-nav-btns">
          <router-link class="open-track" :to="'/tracks/'">
            <Button
              class="home-catalog-btn"
              :active="true">
              <i class='fas fa-location-arrow'></i>
              Каталог
            </Button>
          </router-link>
          <Button class="home-blog-btn">
            <i class="fas fa-paragraph"></i>
            Блог
          </Button>
        </div>
      </div>
    </div>

    <div class="home-content">
      <blockquote class="quote">
        <h3 class="quote-title">Самообразование - это</h3>
        <p class="quote-text">Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <cite class="quote-author">Стэтхем</cite>
      </blockquote>
    </div>
    <div class="home-footer">
      <hr>
      <div class="home-socials">
        <a href="https://ru-ru.facebook.com/rosatom.ru/" class="social-item" target="blank">
          <i class="fab fa-facebook-f"></i>
        </a>
        <a href="https://vk.com/rosatomru" class="social-item" target="blank">
          <i class="fab fa-vk"></i>
        </a>
        <a href="#" class="social-item" target="blank">
          <i class="fas fa-paragraph"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import MainImg from '../../public/home_main.png';
import Button from '@/components/Button.vue';

export default {
  name: 'Home',
  components: {
    Button,
  },
  data() {
    return {
      MainImg,
    };
  },
};
</script>

<style scoped lang="scss">
.home {
  overflow-x: hidden;
  padding-bottom: 10px;
  display: grid;
  // gap: 10px;
  gap: 60px;

  .home-main-top {
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;

     .home-main-img {
       justify-self: end;
     }
  }

  .home-main-img {
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 1;
    grid-column-end: 2;
    // width: 37em;
    max-width: 600px;
  }

  .home-main-text {
    grid-column-start: 2;
    grid-column-end: 3;
    align-self: center;
    text-align-last: left;
    display: flex;
    flex-direction: column;
    gap: 25px;
    max-width: 700px;
  }

  .home-title {
    font-weight: bold;
    font-size: 36px;
  }

  .home-subtitle {
    font-size: 24px;
    text-align: left;
  }

  .home-nav-btns {
    display: flex;
    margin-top: 50px;
    gap: 20px;

    .home-catalog-btn {
      padding: 10px 35px;
      i {
        margin-right: 5px;
      }
    }

    .home-blog-btn {
      padding: 10px 30px;
    }
  }

  .home-content {
    grid-row-start: 2;
    grid-row-end: 3;

    grid-column-start: 1;
    grid-column-end: 3;
    display: flex;
    justify-content: center;
    .quote {
      max-width: 70%;
      &::before {
        content: '';
        position: absolute;
        display: block;
        width: 10px;
        height: 100px;
        background: #5A2DDA;
      }
      text-align-last: left;
      .quote-title {
        position: relative;
        left: 20px;
        font-size: 24px;
        font-weight: bold;
      }
      .quote-text {
        position: relative;
        left: 20px;
      }
      .quote-author {
        float: right;
      }
    }
  }

  .home-footer {
    grid-column-start: 1;
    grid-column-end: 3;
    justify-self: center;
    hr {
      display: block;
      height: 1px;
      max-width: 400px;
      border: 0;
      border-top: 1px solid #A6A6A6;
      // margin: 1em 0;
      padding: 0;
    }
    .home-socials {
      display: flex;
      gap: 10px;
      margin-top: 10px;
      .social-item {
        padding-right: 1px;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100%;
        border: 2px solid #1F2041;
        &:hover {
          background-color: #1F2041;
          i {
            color: #fff;
          }
        }
        i {
          color: #1F2041;
        }
      }
    }
  }
}

@media (max-width: 1055px) {
  .home {
  }
  .home-main-top {
    grid-template-rows: 1fr 1fr;
    .home-main-img {
      justify-self: center !important;
      // margin-left: 50px;
    }
    .home-main-text {
      margin-left: 10%;
      grid-row-start: 2;
      grid-row-end: 3;
      grid-column-start: 1;
      max-width: 70%;

      gap: 10px;
    }
  }
}

@media (max-width: 650px) {
  .home-main-img {
    width: 25em;
  }
}
</style>
