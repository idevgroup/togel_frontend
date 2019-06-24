<template>
  <v-layout row>
    <v-flex xs12 sm9 lg9 ma-auto mt-5>
      <H1>working</H1>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  middleware: 'auth',
  name: 'DepositView',
  layout: 'members',
  head() {
    return {
      title: this.$t('Deposit')
    }
  }
}
</script>

<style>

</style>
