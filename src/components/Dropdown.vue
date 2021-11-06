<template>
  <div class="btn-group" :class="{'disabled': disabled }">
    <li @click="toggleMenu()" class="dropdown-toggle" v-if="selectedOption.name !== undefined">
      {{ selectedOption.name }}
      <span class="caret"></span>
    </li>

    <li @click="toggleMenu()" class="dropdown-toggle dropdown-toggle-placeholder"
        v-if="selectedOption.name === undefined">
      {{placeholder}}
      <span class="caret"></span>
    </li>

    <ul class="dropdown-menu" v-if="showMenu">
      <li v-for="(option, idx) in options" :key="idx">
        <a href="javascript:void(0)" @click="updateOption(option)">
          {{ option }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'v-dropdown',
  data() {
    return {
      selectedOption: {
        name: '',
      },
      showMenu: false,
    };
  },
  props: {
    options: {
      type: [Array, Object],
    },
    selected: {},
    placeholder: [String],
    closeOnOutsideClick: {
      type: [Boolean],
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  mounted() {
    this.selectedOption = this.selected;

    if (this.closeOnOutsideClick) {
      document.addEventListener('click', this.clickHandler);
    }
  },

  beforeUnmount() {
    document.removeEventListener('click', this.clickHandler);
  },

  methods: {
    updateOption(option) {
      this.selectedOption = option;
      this.showMenu = false;
      this.$emit('updateOption', this.selectedOption);
    },

    toggleMenu() {
      this.showMenu = !this.showMenu;
    },

    clickHandler(event) {
      const { target } = event;
      const { $el } = this;

      if (!$el.contains(target)) {
        this.showMenu = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">

.btn-group {
  min-width: 160px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: rgba(139, 164, 249, 0.05);
  border: 1px solid #8BA4F9;  background-size: 0 2px, 100% 1px;
  vertical-align: middle;
}
.disabled{
  z-index: 100;
  pointer-events: none;
  background: rgba(0, 0, 0, .4);
}
.btn-group a:hover {
  text-decoration: none;
}

.dropdown-toggle {
  color: #3765FF;
  padding-top: 10px;
  width: 90%;
  height: 100%;
  text-transform: none;
  font-weight: 400;

  transition: background 3s ease-out;
  box-shadow: none;
  border-radius: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.btn-group:hover {
  background: #e1e1e1;
  cursor: pointer;
}

.dropdown-menu {
  width: 70%;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  min-width: 160px;
  padding: 5px 0;
  margin: 1px 0 0;
  max-height: 300px;
  overflow: auto;
  font-size: 14px;
  text-align: left;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  background-clip: padding-box;
  > li {
    position: relative;
    &:before{
      content: '';
      position: absolute;
      top: 50%;
      left: 8px;
      width: 8px;
      height: 1px;
      background: #000000;
    }
  }
}

.dropdown-menu > li > a {
  padding: 10px 30px;
  display: block;
  clear: both;
  font-weight: normal;
  line-height: 1.6;
  color: #333333;
  text-decoration: none;
}
.dropdown-menu > li > a:hover {
  background: #efefef;
  color: #409FCB;
}

.dropdown-menu > li {
  overflow: hidden;
  width: 100%;
  position: relative;
  margin: 0;
}

.caret {
  width: 0;
  position: absolute;
  top: 19px;
  height: 0;
  margin-left: -24px;
  vertical-align: middle;
  border-top: 4px dashed;
  border-top: 4px solid \9;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
  right: 10px;
}

li {
  list-style: none;
}
</style>
