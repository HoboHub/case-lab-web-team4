<template>
    <div class="confirm-delete-popup">
        <p class="confirm-delete-q">Вы действительно хотите удалить данный {{ deletionTarget }}?</p>
        <div class="confirm-delete-manage-btns">
            <Button
                @click="returnResp(false)"
                class="btn-orange">Отмена</Button>
            <Button
                @click="returnResp(true)"
                class="enroll-btn">Да, продолжить</Button>
        </div>
    </div>
</template>

<script>
import Button from '@/components/Button.vue';

export default {
  name: 'ConfirmDelete',
  props: {
    deletionTarget: {
      type: String,
      default: 'трек',
    },
  },
  components: {
    Button,
  },

  //   data() {
  //     return {
  //     //   userResp: false,
  //     };
  //   },

  methods: {
    returnResp(userResp) {
    //   console.log(userResp);
      this.$emit('callConfirm', userResp);
    },
  },
};
</script>

<style scoped>
.confirm-delete-popup {
    z-index: 999999;
    /* display: none; */
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-40%);
    /* margin: 0 auto; */

    background: #fff;
    min-width: 400px;
    max-width: 600px;
    padding: 40px;
    box-shadow: 0px 3px 8px rgb(139 164 249 / 30%);
}

.confirm-delete-q {}

.confirm-delete-manage-btns {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
}
</style>
