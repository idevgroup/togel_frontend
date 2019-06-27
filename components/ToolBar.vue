<template>
  <v-toolbar>
    <v-toolbar-title />
    <v-spacer />

    <LocaleDropdown />

    <!-- Authenticated -->
    <template v-if="authenticated">
      <v-btn flat :to="{ name: 'members.dashboard' }">
        {{ user.reg_name }}
      </v-btn>
      <v-btn flat @click.prevent="logout">
        {{ $t("logout") }}
      </v-btn>
    </template>

    <!-- Guest -->
    <template v-else>
      <v-btn flat :to="{ name: 'login' }">
        {{ $t("login") }}
      </v-btn>
      <v-btn flat :to="{ name: 'register' }">
        {{ $t("register") }}
      </v-btn>
    </template>
  </v-toolbar>
</template>

<script>
import { mapGetters } from "vuex"
import LocaleDropdown from "./LocaleDropdown"
export default {
  components: {
    LocaleDropdown
  },
  computed: mapGetters({
    user: "auth/user",
    authenticated: "auth/check"
  }),

  methods: {
    async logout() {
      this.busy = true
      // Log out the user.
      await this.$store.dispatch("auth/logout")
      this.busy = false

      // Redirect to login.
      this.$router.push({ name: "login" })
    }
  }
}
</script>

<style lang="stylus" scoped>
.toolbar__title .router-link-active {
  text-decoration: none;
}
</style>
