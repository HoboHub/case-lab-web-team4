<template>
  <div
  class="track-item"
  :class="{'locked' :isLocked}"
  @click="$router.push(`${trackId}/detail/${id}`)">

    <!-- link to item -->
   <!-- <router-link class="open-track-item" :to="`${trackId}/detail/${id}`"></router-link> -->
    <!--  -->

    <span v-if="type !== 'pdf'" class="track-item-type">{{ type || "Тип" }}</span>

    <h2 class="track-item-name">{{ name || "Название элемента" }}</h2>
    <div class="track-item-time">{{ duration || "Время на изучение / Дата начала" }}</div>
    <!-- <div class="track-item-place">Место проведения (если встреча)</div> -->
    <div
      v-if="type === 'pdf'"
      class="track-item-file-format"
      :class="[
                type === 'pdf' ? 'file-pdf' : '',
                type === 'ppt' ? 'file-ppt' : '',
                type === 'doc' ? 'file-doc' : '' ]">
      {{ type || "Формат файла" }}
    </div>

    <div class="track-item-props" v-if="isMaster">
      <div class="track-item-req">
        <label :for="`isReq${id}`" @click.stop>обязательно к изучению</label>
        <input type="checkbox"
               :id="`isReq${id}`"
               name="isReq"
               :disabled="isLoading"
               :checked="detailData.required"
               @click.stop="makeDetailRequired">
      </div>
      <div
        class="delete-track-item"
        @click.stop="showDeleteModal">
        <i class="fa fa-trash" aria-hidden="true"></i>

      </div>
      <div class="track-item-locked" >

        <i class="fa fa-lock" aria-hidden="true"></i>

      </div>
    </div>
    <ConfirmDelete
      @callConfirm="callConfirm"
      v-if="showConfirmDelete"
      :deletion-target="deletionTarget"
    />
  </div>

</template>

<script>

// import { defineComponent } from '@vue/composition-api'
import { mapActions } from 'vuex';
import { debounce } from '@/helpers/debounce';
import ConfirmDelete from '@/components/trackRelated/ConfirmDelete.vue';

export default {
  name: 'TrackItem',
  props: {
    name: {
      type: String,
    },
    duration: {
      type: String,
    },
    type: {
      type: String,
    },
    id: {
      type: Number,
    },
    trackId: {
      type: Number,
    },
    detailData: {
      type: Object,
      required: true,
    },
    isLocked: {
      type: Boolean,
      default: false,
    },
    detail: {
      type: Object,
    },
  },
  components: {
    ConfirmDelete,
  },
  mounted() {
    this.lockDetail = debounce(this.lockDetail, 400);
  },
  data() {
    return {
      isLoading: false,
      inputData: '',
      showConfirmDelete: false,
      deletionTarget: 'элемент',
    };
  },
  computed: {
    isMaster() {
      return this.$store.getters.getUser.role === 'teacher';
    },
  },
  methods: {
    ...mapActions(['changeTrackDetailData', 'removeTrackDetail']),

    async makeDetailRequired(event) {
      this.isLoading = true;
      const dataClone = {
        ...this.detailData,
        required: event.target.checked,
      };
      await this.changeTrackDetailData({ id: this.id, newData: dataClone });
      this.isLoading = false;
    },
    ///
    showDeleteModal() {
      this.showConfirmDelete = true;
      // this.deletionTarget = 'трек';
      // this.$refs.popupPageDark.style.display = 'block';
      document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    },
    ///
    hideModal() {
      this.showConfirmDelete = false;
      // this.$refs.popupPageDark.style.display = 'none';
      document.getElementsByTagName('body')[0].style.overflowY = 'auto';
    },
    ///
    callConfirm(userResp) {
      if (userResp) {
        // console.log('удалить');
        this.removeTrackDetail({ itemId: this.id, trackId: this.trackId });
      }
      this.hideModal();
    },
    // async deleteItem() {
    //   // eslint-disable-next-line no-restricted-globals
    //   if (confirm('Вы точно хотите удалить данный элемент?')) {
    //     this.removeTrackDetail({ itemId: this.id, trackId: this.trackId });
    //   }
    // },

    // async makeEpilogRequired() {
    //   this.isLoading = true;
    //   const dataClone = { ...this.detailData, required: event.target.checked };
    // },
  },
};
</script>

<style lang="scss" scoped>
.open-track-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.track-item {
  position: relative;
  min-height: 175px;
  background-color: #fff;
  box-shadow: 0px 2px 10px rgba(139, 164, 249, 0.25);
  border-radius: 5px;

  padding: 20px 20px 20px 30px;
  // display: flex;
  // flex-direction: column;
  text-align: left;
  cursor: pointer;
  transition-duration: .2s;
}
.locked{
  opacity: 0.5;
  pointer-events: none;
}

.track-item:hover {
  transform: scale(1.01);
  box-shadow: 0px 2px 5px rgba(139, 164, 249, 0.25);
}

.track-item-type {
  font-size: 18px;
  font-weight: 200;
  position: absolute;
  right: 20px;
}

.track-item-name {
  font-size: 20px;
  font-weight: bold;
  max-width: 500px;
  margin-bottom: 10px;
}

.track-item-time {
  font-size: 15px;
  color: lightslategrey;
  font-weight: 500;
}

.track-item-place {
  font-size: 16px;
  color: lightslategrey;
  font-weight: 500;
}

.track-item-file-format {
  padding: 10px;
  border-radius: 5px;
  background: lightgrey;
  width: 3.4em;
  font-weight: bold;
  font-size: 0.8em;
  text-align: center;

  position: absolute;
  bottom: 20px;
}

.file-pdf {
  background-color: #D83131;
  color: #fff;
}

.file-ppt {
  background-color: #4185EC;
  color: #fff;
}

.file-doc {
  background-color: #F98938;
  color: #fff;
}

.track-item-props {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  // justify-content: end;
  position: absolute;
  bottom: 10px;
  right: 20px;
}

.track-item-req {
  display: flex;
  align-items: center;

  label {
    font-size: 14px;
    margin-right: 5px;
  }

  input {
  }
}

.delete-track-item {
  color: #FF4141;
}

.track-item-locked {
  font-size: 24px;
  color: #8BA4F9;
  font-size: 18px;
}
</style>
