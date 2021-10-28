<template>
  <div
    :class="(active && 'btn-active') + ' ' + (btnBlue && 'btn-blue')"
    class="btn">
    <slot></slot>
  </div>
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
  },
};
</script>

<style scoped lang="scss">
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
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
}

.btn-blue {
  background: rgba(42, 123, 169, 0.78);
  color: #ffffff;
}
</style>
