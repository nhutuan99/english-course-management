<template>
  <div class="fplay-tpb__spacing relative">
    <h4
      v-if="title"
      class="fplay-tpb__heading font-weight-bold text-center mb-4"
    >
      {{ title }}
    </h4>

    <slot />

    <!-- Notice Message -->
    <p v-if="noticeMsg" class="fplay-tpb__text">
      {{ noticeMsg }}
    </p>

    <template v-if="errors">
      <div class="fplay-tpb__warning">
        <b-icon-exclamation-circle-fill class="mr-2" />
        {{ errors }}
      </div>
    </template>

    <div
      class="fplay-tpb__bottom"
      :class="{ 'is-active': !button.disabled && button.text }"
    >
      <button
        :disabled="button.disabled"
        class="fplay-tpb__button"
        @click.prevent.stop="button.handler"
      >
        {{ button.text }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MasterLayout',
  props: {
    title: {
      type: String,
      default: null,
    },
    noticeMsg: {
      type: String,
      default: null,
    },
    errors: {
      type: [String, Error],
      default: null,
    },
    busy: {
      type: Boolean,
      default: false,
    },
    button: {
      type: Object,
      default: () => ({
        text: null,
        disabled: false,
        handler: () => {},
      }),
    },
  },

  watch: {
    busy(val) {
      this.$store.dispatch('payment/tpbank/setLoading', val)
    },
  },
}
</script>

<style lang="sass">
@import '~scss/_variables'

.min-h-screen
  min-height: 100vh

.fplay-tpb
  &__warning
    background-color: #FFEBCF
    padding: 14px 16px
    display: flex
    align-items: center
    border-radius: 5px
    svg
      fill: #FF9800
      width: 20px
      height: 20px

  &__text
    color: #AD8AD8
    font-size: 12px

    &-error
      margin-left: 12px
      font-size: 12px
      color: #FF3B30

  &__spacing
    padding: 16px

  &__bottom
    position: fixed
    left: 50%
    transform: translateX(-50%)
    bottom: 16px
    width: 98%
    opacity: 0
    visibility: hidden
    transition: opacity 0.3s ease-in-out

    &.is-active
      opacity: 1
      visibility: visible
      transition: opacity 0.3s ease-in-out

  &__button
    background: linear-gradient(180deg, #7B35BB 0%, #5D2E86 100%)
    color: #FF9800
    border-radius: 5px
    display: block
    text-align: center
    padding: 13px
    width: 100%
    border: unset
    text-transform: uppercase
    font-weight: 500


@media only screen and (max-width: 640px)
  .fplay-tpb__bottom
    width: calc(100% - 32px)
</style>
