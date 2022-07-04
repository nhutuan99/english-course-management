<template>
  <div
    class="PaySelectBox"
    :class="[{ active: active }, itemClasses, { [itemActiveClasses]: active }]"
  />
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },

    itemClasses: {
      type: String,
      default: '',
    },

    itemActiveClasses: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~scss/variables';

.PaySelectBox {
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 22px;
    height: 22px;
    z-index: 0;
    transition: 0.28s ease;
    border: 2px solid #3c3c3c;
    border-radius: 50%;

    @media screen and (max-width: $xs) {
      width: 18px;
      height: 18px;
    }
  }

  &.active {
    &::before {
      border: 2px solid $primary;
    }

    &::after {
      background-color: $primary;
      transform: scale(0.7);
    }
  }
}
</style>
