<template>
  <label
    for="phone"
    class="fplay-tpb__input-group"
    :class="{
      'has-error': hasError,
    }"
  >
    <slot />
    <span class="fplay-tpb__label">{{ label }}</span>
    <span class="fplay-tpb__focus-bg"></span>
  </label>
</template>

<script>
export default {
  name: 'InputGroup',
  props: {
    label: {
      type: String,
      default: 'Label',
    },
    hasError: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~scss/_variables'

// Input group
.fplay-tpb__input-group
  position: relative
  margin: auto
  width: 100%
  border-radius: 3px
  overflow: hidden
  margin-bottom: 14px

  &.has-error
    margin-bottom: 4px
    input
      border-color: #FF3B30
    .fplay-tpb__label
      color: #FF3B30 !important

  .fplay-tpb__label
    position: absolute
    top: 18px
    left: 12px
    font-size: 16px
    color: #E2D8EE
    font-weight: 400
    transform-origin: 0 0
    transform: translate3d(0,0,0)
    transition: all .2s ease
    pointer-events: none

  .fplay-tpb__focus-bg
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: #fcfcfc
    z-index: -1
    transform: scaleX(0)
    transform-origin: left

  input
    -webkit-appearance: none
    appearance: none
    width: 100%
    border: 0
    font-family: inherit
    padding: 16px 12px 0 12px
    height: 56px
    font-size: 16px
    font-weight: 400
    background: #fcfcfc
    border: 1px solid #E2D8EE
    color: $tpb-purple
    font-weight: 600
    transition: all .15s ease
    border-radius: 5px


    &:valid
      + .fplay-tpb__label
        color: #AD8AD8
        transform: translate3d(0,-12px,0) scale(.75)

    &:disabled
      + .fplay-tpb__label
        color: #AD8AD8
        transform: translate3d(0,-12px,0) scale(.75)

    &:focus
      outline: none

      + .fplay-tpb__label
        color: $tpb-purple
        transform: translate3d(0,-12px,0) scale(.75)
        + .fplay-tpb__focus-bg
          transform: scaleX(1)
          transition: all .1s ease
</style>
