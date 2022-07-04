<template>
  <main class="main">
    <h3>General settings...</h3>
  </main>
</template>

<script>
export default {
  middleware: ['check-auth', 'auth']
}
</script>

<style lang="scss">
.main {
  margin-left: 3rem;
  min-height: 62vh;
}
</style>
