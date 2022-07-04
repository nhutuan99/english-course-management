<template>
  <v-app>
    <default-header />
    <nuxt />
    <default-footer />
  </v-app>
</template>

<script>
import DefaultFooter from '@/components/Footer/DefaultFooter'
import DefaultHeader from '@/components/Header/DefaultHeader'
export default {
  components: {
    DefaultFooter,
    DefaultHeader
  }
}
</script>
