<template>
  <header>
    <nav>
      <ul style="position:relative">
        <li>
          <nuxt-link to="/">Home</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/decks">Decks</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/profile">Profile</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/settings">Settings</nuxt-link>
        </li>
        <!-- <li
          v-show="isAuthenticated === null"
          style="position:absolute; right: 100px;"
        >
          <button class="btn btn_success">
            <nuxt-link to="/login">Login</nuxt-link>
          </button>
        </li> -->
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  // computed: {
  //   isAuthenticated() {
  //     return this.$store.getters.isAuthenticated
  //   }
  // }
}
</script>

<style lang="scss" scoped>
header {
  background: #000 !important;
  color: #fff;
  height: 60px;
  nav,
  ul {
    height: inherit;
  }
  ul {
    align-items: center;
    display: flex;
    justify-content: center;
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      margin: 0 1.5rem;
      a {
        color: #ffffff !important;
        text-decoration: none;
        &:hover {
          text-decoration: none;
          color: yellow !important;
        }
        &.nuxt-link-exact-active {
          color: yellow !important;
        }
      }
    }
  }
}
</style>
