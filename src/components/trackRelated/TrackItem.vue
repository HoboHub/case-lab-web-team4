<template>
    <div class="track-item">
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

        <div class="track-item-props">
            <div class="track-item-req">
                <label for="isReq">обязательно к изучению</label>
                <input type="checkbox" name="isReq">
            </div>
            <div class="delete-track-item">
                <i class="fa fa-trash" aria-hidden="true"></i>
            </div>
            <div class="track-item-locked">
                <i class="fa fa-lock" aria-hidden="true"></i>
            </div>
        </div>
    </div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'

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
  },
};
</script>

<style lang="scss" scoped>
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

.file-pdf{
    background-color: #D83131;
    color: #fff;
}
.file-ppt{
    background-color: #4185EC;
    color: #fff;
}
.file-doc{
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
    input {}
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
