<template>
  <li v-if="id && name && thumbnail && description">
    <nuxt-link class="deck" :to="`/decks/${id}`">
      <div class="card deck-card">
        <img :src="thumbnail" :alt="`Thumbnail of ${name}`" />
        <div class="card_body">
          <h3>{{ name }}</h3>
          <p>{{ description }}</p>
        </div>
        <button
          class="btn btn_danger h1"
          style="height: 40px;"
          @click.prevent="deleteItem(id)"
          v-show="adminRule"
        >
          Delete
        </button>
      </div>
    </nuxt-link>
  </li>
</template>

<script>
export default {
  props: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    thumbnail: { type: String, required: true },
    description: { type: String, default: '' }
  },

  data() {
    return {
      checkAdmin: true
    }
  },

  methods: {
    openModal() {
      this.$modal.open({ name: 'DeleteDeckModal' })
    },
    closeModal() {
      this.$modal.close({ name: 'DeleteDeckModal' })
    },
    deleteItem(id) {
      if (id) this.$store.dispatch('deleteDeck', id)
    }
  },

  computed: {
    adminRule() {
      return this.$store.getters.isAmin === this.checkAdmin
    }
  }
}
</script>

<style lang="scss">
.decks-list {
  li {
    margin-bottom: 1rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .deck {
    display: block;
  }
  .deck-card {
    display: flex;
    flex-direction: row;
    height: 250px;
    img {
      width: 250px;
      height: auto;
    }
  }
}
</style>
