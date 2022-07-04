<template>
  <div modal="true">
    <div>
      <div v-if="visible" class="modal">
        <div
          aria-modal="true"
          data-reach-dialog-content="true"
          tabindex="-1"
          class="modal__mask"
        >
          <div class="modal__body">
            <slot :payload="payload" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VModal from './handle'
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      payload: null,
      visible: false
    }
  },

  beforeMount() {
    VModal.EventBus.$on('open', (params) => {
      if (this.name === params.name) {
        this.open(params)
      }
    })

    VModal.EventBus.$on('close', (params) => {
      if (this.name === params.name) {
        this.close(params)
      }
    })
  },

  methods: {
    open(params) {
      this.payload = params.payload
      this.visible = true
    },
    close() {
      this.visible = false
    }
  }
}
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 100%;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(18, 18, 18, 0.8);
  z-index: 100;
  padding: 10px 0px;
}
</style>
