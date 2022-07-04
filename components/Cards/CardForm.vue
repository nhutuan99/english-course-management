<template>
  <form @submit.prevent="onSave">
    <EventAlertSuccess v-show="toggleAlert === 'success'"
      ><span slot="infoAddForm">{{ successAdd }}</span></EventAlertSuccess
    >
    <EventAlertError v-show="toggleAlert === 'fail'"
      ><span slot="infoAddForm">{{ failAdd }}</span></EventAlertError
    >
    <div class="form_group">
      <div class="form_group">
        <label for="">Keyword:</label>
        <input
          @keyup.exact="handleKeyUp"
          v-model="editCard.keyword"
          class="form_control"
          type="text"
          placeholder="Enter keyword"
        />
      </div>
      <div class="form_group">
        <label for="">Picture:</label>
        <input
          @keyup.exact="handleKeyUp"
          v-model="editCard.picture"
          class="form_control"
          type="text"
          placeholder="Enter link picture"
        />
        <div class="preview"></div>
      </div>
    </div>
    <div class="form_group d_flex justify_content_end">
      <button
        class="btn btn_danger ml_2"
        @click.prevent="closeModal('CardModalForm')"
      >
        Close
      </button>
      <button class="btn btn_success ml_2" type="submit">
        {{ editCard && editCard.id ? 'Edit' : 'Create' }}
      </button>
    </div>
  </form>
</template>

<script>
import EventAlertSuccess from '../Alerts/EventAlertSuccess.vue'
import EventAlertError from '../Alerts/EventAlertError.vue'

export default {
  components: { EventAlertSuccess, EventAlertError },
  props: {
    card: {
      type: Object,
      default: () => ({
        keyword: null,
        picture: null
      })
    }
  },

  data() {
    return {
      editCard: this.card ? { ...this.card } : { keyword: null, picture: null },
      toggleAlert: '',
      successAdd: 'You just add a new item',
      failAdd: 'It`s must not empty input, please try again!'
    }
  },

  methods: {
    closeModal() {
      this.$modal.close({ name: 'CardModalForm' })
    },
    onSave() {
      if (this.editCard.keyword && this.editCard.picture !== null) {
        this.toggleAlert = 'success'
        this.$emit('submit', this.editCard)
      } else {
        this.toggleAlert = 'fail'
      }
    },
    handleKeyUp() {
      this.toggleAlert = ''
      console.log('handle key up')
    }
  }
}
</script>
