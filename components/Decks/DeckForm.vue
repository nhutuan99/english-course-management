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
        <label for="">Name:</label>
        <input
          @keyup.exact="handleKeyUp"
          v-model="editDeck.name"
          class="form_control"
          type="text"
          placeholder="Enter name"
        />
      </div>
      <div class="form_group">
        <label for="">Description:</label>
        <textarea
          @keyup.exact="handleKeyUp"
          v-model="editDeck.description"
          class="form_control"
          type="text"
          placeholder="Enter description"
        />
      </div>
      <div class="form_group">
        <label for="">Thumbnail:</label>
        <input
          @keyup.exact="handleKeyUp"
          v-model="editDeck.thumbnail"
          class="form_control"
          type="text"
          placeholder="Enter link thumbnail"
        />
        <div class="preview"></div>
      </div>
    </div>
    <div class="form_group d_flex justify_content_end">
      <button
        class="btn btn_danger ml_2"
        type="button"
        @click.prevent="closeModal"
      >
        Close
      </button>
      <button class="btn btn_success ml_2" type="submit">
        {{ editDeck && editDeck.id ? 'Edit' : 'Create' }}
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
    deck: {
      type: Object,
      default: () => ({
        name: null,
        description: null,
        thumbnail: null
      })
    }
  },
  data() {
    return {
      editDeck: this.deck
        ? { ...this.deck }
        : { name: null, description: null, thumbnail: null },
      toggleAlert: '',
      successAdd: 'You just add a new item',
      failAdd: 'It`s must not empty input, please try again!'
    }
  },
  methods: {
    closeModal() {
      this.$modal.close({ name: 'DeckFormModal' })
    },
    onSave() {
      if (
        this.editDeck.name &&
        this.editDeck.description &&
        this.editDeck.thumbnail !== null
      ) {
        this.toggleAlert = 'success'
        this.$emit('submit', this.editDeck)
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
