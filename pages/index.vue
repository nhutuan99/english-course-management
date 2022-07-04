<template>
  <div class="ct">
    <div class="banner">
      <div class="thumbnail-banner"></div>
    </div>
    <div class="popular-decks flex">
      <h3 class="text_center my_3">3 Popular Decks For You</h3>
      <div class="text_center">
        <button>
          <nuxt-link to="/decks" class="btn btn_info">Learn Now</nuxt-link>
        </button>
      </div>

      <!-- <ul class="decks-list">
        <deck-list
          v-for="deck in decks"
          :id="deck.id"
          :key="deck._id"
          :name="deck.name"
          :description="deck.description"
          :thumbnail="deck.thumbnail"
        />
      </ul> -->
    </div>
  </div>
</template>

<script>
// import DeckList from '~/components/Decks/DeckList.vue'

export default {
  // components: { DeckList },
  // computed: {
  //   decks() {
  //     return this.$store.getters.decks
  //   }
  // }
}
</script>

<style lang="scss">
.ct {
  min-height: 62vh;
  max-height: fit-content;
  .banner {
    height: 220px;
    margin-top: 2rem;
    .thumbnail-banner {
      background: url('~assets/images/banner.jpg') center center;
      background-size: cover;
      height: inherit;
    }
  }
}
</style>
