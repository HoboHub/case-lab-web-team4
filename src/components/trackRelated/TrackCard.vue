<template>
  <div class="card">
    <p class="completed-label" v-if="!showAll && status === ''">
      Завершен <i class="far fa-check-circle"></i>
    </p>
    <img class="track-img" :src="imgUrl" alt="small placeholder. TO BE DONE" />

    <div class="track-main">
      <div class="track-info">
        <router-link :to="'/track/' + id" tag="h2" class="track-name"
          >{{ name || "Скоро здесь будет название" }}
        </router-link>
        <p class="track-description">
          {{ description || "Скоро здесь будет описание" }}
        </p>
      </div>
      <router-link class="open-track" :to="'/track/' + id">
        <i class="fas fa-arrow-right"></i
      ></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TrackCard',
  props: {
    showAll: {
      type: Boolean,
      required: true,
    },
    status: {
      type: String,
    },
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    imgUrl: {
      type: String,
    },
  },
  data() {
    return {
      baseUrl: '',
    };
  },
};
</script>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
  box-shadow: 0px 2px 7px rgba(139, 164, 249, 0.3);
  border-radius: 20px;
  overflow: hidden;
  transition: 0.4s;

  &:hover {
    transform: scale(1.03);
  }

  .completed-label {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 6px;

    padding: 6px 20px;
    background: #ffa34f;
    border-radius: 15px 15px 0px 0px;
    color: #ffffff;
  }

  img {
    max-width: 100%;
  }

  .track-main {
    flex-grow: 1;

    display: flex;
    flex-direction: column;
    text-align: left;
    padding: 20px;
    gap: 20px;

    .track-info {
      flex-grow: 1;

      .track-name {
        display: block;
        font-weight: 800;
        font-size: 14px;
        color: #5a2dda;
        margin-bottom: 8px;
      }

      .track-description {
        max-height: 70px;

        // УСТАРЕВШИЙ МЕТОД
        -webkit-line-clamp: 3; /* Число отображаемых строк */
        display: -webkit-box; /* Включаем флексбоксы */
        -webkit-box-orient: vertical; /* Вертикальная ориентация */
        overflow: hidden; /* Обрезаем всё за пределами блока */
      }
    }

    .open-track {
      align-self: end;

      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-size: 20px;

      width: 44px;
      height: 44px;
      border-radius: 50%;

      background: linear-gradient(180deg, #6fcf97 0%, #66d2ea 100%);

      transition: 0.6s;

      &:hover {
        background: linear-gradient(180deg, #34d576 100%, #66d2ea 0%);
      }
    }
  }
}
</style>
