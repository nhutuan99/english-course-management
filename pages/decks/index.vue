<template>
  <section>
    <div class="ct">
      <div class="d_flex justify_content_between my_3 mt_3">
        <h3>List of your decks:</h3>
        <button
          class="btn btn_success"
          @click.prevent="openModal('DeckFormModal')"
          v-show="adminRule"
        >
          Create a Deck
        </button>
      </div>
      <ul class="decks-list">
        <deck-list
          v-for="deck in decks"
          :id="deck.id"
          :key="deck._id"
          :name="deck.name"
          :description="deck.description"
          :thumbnail="deck.thumbnail"
        />
      </ul>
    </div>

    <!-- Modal -->
    <v-modal v-slot="payload" name="DeckFormModal">
      <div class="modal-body">
        <h2 class="title">
          {{
            payload && payload.payload
              ? 'Edit a Card Deck'
              : 'Create a new Deck'
          }}
        </h2>
        <deck-form @submit="handleSubmit" :deck="payload.payload" />
      </div>
    </v-modal>
  </section>
</template>

<script>
import DeckForm from '~/components/Decks/DeckForm.vue'
import DeckList from '~/components/Decks/DeckList.vue'

export default {
  middleware: ['check-auth', 'auth'],

  head: {
    title: 'Decks | Manage English Course'
  },

  components: { DeckList, DeckForm },

  data() {
    return {
      checkAdmin: true
    }
  },

  methods: {
    openModal() {
      this.$modal.open({ name: 'DeckFormModal' })
    },
    closeModal() {
      this.$modal.close({ name: 'DeckFormModal' })
    },
    handleSubmit(deckData) {
      if (deckData && !deckData.id) {
        this.$store.dispatch('addDeck', deckData).then(() =>
          this.$modal.close({
            name: 'DeckFormModal'
          })
        )
      } else {
        this.$store.dispatch('editDeck', deckData).then(() => {
          this.$modal.close({ name: 'DeckFormModal' })
        })
      }
    }
  },

  computed: {
    decks() {
      return this.$store.getters.decks
    },
    adminRule() {
      return this.$store.getters.isAdmin === this.checkAdmin
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-body {
  background-color: white;
  min-width: 400px;
  max-width: 600px;
  max-height: 500px;
  overflow: hidden;
  border: 1px solid gray;
  border-radius: 10px;
}
</style>
