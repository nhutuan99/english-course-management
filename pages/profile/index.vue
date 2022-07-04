<template>
  <div class="ct">
    <div class="m_auto profile text_center">
      <h1 class="mt_5" v-if="userInfo && userInfo !== null">
        Profile of {{ userInfo.displayName }}
      </h1>
      <p class="mt_2" v-if="userInfo && userInfo !== null">
        Email: {{ userInfo.email }}
      </p>
      <button class="mt_5 btn btn_danger" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['check-auth', 'auth'],

  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/')
    }
  },

  computed: {
    userInfo() {
      return this.$store.getters.userInfo
    }
  }
}
</script>

<style scoped lang="scss">
.ct {
  min-height: 62vh;
  .profile {
    max-width: 600px;
    overflow: hidden;
    max-height: 400px;
    font-size: 20px !important;
  }
}
</style>
