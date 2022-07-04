<template>
  <section>
    <div class="c_3 mb_3">
      <div class="card">
        <div class="front-card">
          <img :src="picture" :alt="`Thumbnail of ${keyword}`" />
        </div>
        <div class="back-card mt_3">{{ keyword }}</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    keyword: {
      type: String,
      required: true
    },
    picture: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  padding-top: 3rem;
  .card {
    padding: 1rem;
    width: 300px;
    height: 250px;
    overflow: hidden;
    img {
      width: 100%;
      height: auto;
    }
    .back-card {
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
