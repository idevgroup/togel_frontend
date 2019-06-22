<template>
  <div>
    <h1>Work area</h1>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  name: 'DashboardView',
  layout: 'members',
  head() {
    return { title: this.$t('dashboard') }
  }
}
</script>
