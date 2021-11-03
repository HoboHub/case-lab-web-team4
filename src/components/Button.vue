<template>
  <button
    :class="{
      'btn-active' : active,
      'btn-blue' :  btnBlue,
      'btn-orange' : btnOrange,
      'btn-test' : btnTest,
      'btn-disabled' : btnDisabled,
      'border-disabled' : borderDisabled
  }"
    class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    active: Boolean,
    btnBlue: {
      type: Boolean,
      default: false,
    },
    btnOrange: {
      type: Boolean,
      default: false,
    },
    btnTest: {
      type: Boolean,
      default: false,
    },
    btnDisabled: {
      type: Boolean,
      default: false,
    },
    borderDisabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 700;
  border-radius: 22px;
  border: 1px solid #1f2041;
  cursor: pointer;
  transition: 0.4s;
  background: #ffffff;

  &:hover {
    filter: brightness(90%);
  }
}

.btn-active {
  color: #ffffff;
  background: #5a2dda;
  filter: brightness(100%) !important;

  border: none; //on click remove border
}

.btn-blue {
  $blueBgColor: rgba(42, 123, 169, 0.78);
  $blueTextColor: rgb(255, 255, 255);
  background: $blueBgColor;
  color: $blueTextColor;

  &:hover {
    background: darken($blueBgColor, 10%);
  }
}

.btn-orange {
  $orangeBgColor: rgb(255, 165, 0);
  $orangeTextColor: rgb(255, 255, 255);
  background: $orangeBgColor;
  color: $orangeTextColor;

  &:hover {
    background: darken($orangeBgColor, 10%);
  }

}

.btn-test {
  background: #6FCF97;
  width: 300px;
  height: 50px;
  border-radius: 5px;
  border: none;
  font-weight: 700;
  font-size: 16px;
  color: #fff;
  box-shadow: 0px 2px 3px rgba(139, 164, 249, .3)
}

.btn-disabled {
  opacity: 0.4;
  pointer-events: none;
}

.enroll-btn {
  background-color: #66D2EA;

  &:hover {
    background: darken(#66D2EA, 10%);
  }
}

.border-disabled {
  border: unset;
}
</style>
