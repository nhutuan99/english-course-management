<template>
  <section>
    <div class="r">
      <div class="ct text_center">
        <h3>
          Deck
          <span class="deck-name">{{ deck.name }}</span>
        </h3>
        <div class="tools mt_2">
          <button class="btn btn_success">Start now</button>
          <button
            class="btn btn_primary"
            @click="openModal('CardModalForm')"
            v-show="adminRule"
          >
            Create a card
          </button>
          <button
            class="btn btn_warning"
            @click="openModal('DeckFormModal')"
            v-show="adminRule"
          >
            Update a card
          </button>
        </div>
        <hr class="divide" />

        <div class="r">
          <card-list
            v-for="card in cards"
            :key="card._id"
            :picture="card.picture"
            :keyword="card.keyword"
          />
        </div>
      </div>
    </div>
    <v-modal name="CardModalForm">
      <div class="modal-body">
        <h2 class="title">
          Create a new card
        </h2>
        <card-form @submit="handleSubmitCard" />
      </div>
    </v-modal>
    <v-modal v-slot="payload" name="DeckFormModal">
      <div class="modal-body">
        <h2 class="title">
          {{
            payload && payload.payload
              ? 'Edit a Card Deck'
              : 'Create a new Deck'
          }}
        </h2>
        <deck-form @submit="handleSubmitDeck" :deck="payload.payload" />
      </div>
    </v-modal>
  </section>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import CardForm from '~/components/Cards/CardForm.vue'
import CardList from '~/components/Cards/CardList.vue'
import DeckForm from '~/components/Decks/DeckForm.vue'
export default {
  props: {
    isAdmin: {
      type: Boolean
    }
  },
  data() {
    return {
      checkAdmin: true
    }
  },
  components: { CardForm, DeckForm, CardList },
  // validate({ params }) {
  //   return /^[0-9]$/.test(params.id)
  // },

  asyncData(context) {
    return axios
      .get(
        `https://nuxt-first-app-342d9-default-rtdb.asia-southeast1.firebasedatabase.app/decks/${context.params.id}.json`
      )
      .then((resp) => {
        console.log('resp', resp)

        return {
          deck: resp.data
        }
      })
      .catch((e) => context.error(e))
  },

  computed: {
    cards() {
      return this.$store.getters.cards
    },
    adminRule() {
      return this.checkAdmin === this.$store.getters.isAdmin
    }
  },

  methods: {
    ...mapActions(['editDeck']),
    openModal(name) {
      if (name === 'CardModalForm') {
        this.$modal.open({
          name: 'CardModalForm'
        })
      } else if (name === 'DeckFormModal') {
        this.$modal.open({
          name: 'DeckFormModal',
          payload: {
            ...this.deck,
            id: this.$route.params.id
          }
        })
      }
    },
    handleSubmitDeck(deckData) {
      if (deckData && !deckData.id) {
        this.$store.dispatch('addDeck', deckData).then(() =>
          this.$modal.close({
            name: 'DeckFormModal'
          })
        )
      } else {
        this.editDeck(deckData).then((res) => {
          if (res) {
            this.deck = res
            this.$modal.close({ name: 'DeckFormModal' })
          }
        })
      }
    },
    handleSubmitCard(cardData) {
      if (cardData && !cardData.id) {
        this.$store.dispatch('addCard', cardData).then(() =>
          this.$modal.close({
            name: 'CardModalForm'
          })
        )
      } else {
        this.editDeck(cardData).then((res) => {
          if (res) {
            this.deck = res
            this.$modal.close({ name: 'CardModalFCard' })
          }
        })
      }
    }
  },

  head() {
    return {
      title: `Deck: ${this.deck.name} | Manage English Course`
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  padding-top: 3rem;
  .deck-name {
    padding: 5px;
    background-color: coral;
    border: 1px solid black;
    border-radius: 10px;
  }
  .card {
    padding: 1rem;
    img {
      width: 60%;
    }
  }
  .divide {
    margin: 2rem 0;
  }
}

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
