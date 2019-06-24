<template>
  <v-layout row>
    <v-flex xs12 sm9 lg9 ma-auto mt-5>
      <v-tabs icons-and-text centered fixed>
        <v-tabs-slider color="primary" />

        <v-tab key="tab-person">
          {{ $t("profile") }}
          <v-icon>person</v-icon>
        </v-tab>
        <v-tab key="tab-password">
          {{ $t("password") }}
          <v-icon>lock</v-icon>
        </v-tab>

        <v-tab-item key="tab-person">
          <profile-view @busy="busy = $event" />
        </v-tab-item>
        <v-tab-item key="tab-password">
          <password-view @busy="busy = $event" />
        </v-tab-item>
      </v-tabs>
    </v-flex>
  </v-layout>
</template>

<script>
import Profile from '~/pages/memberprofile/profile'
import Password from '~/pages/memberprofile/password'

export default {
  name: 'SettingsView',
  layout: 'members',
  middleware: 'auth',
  components: {
    'profile-view': Profile,
    'password-view': Password
  },
  head() {
    return {
      title: this.$t('profile')
    }
  },
  data() {
    return {
      busy: false
    }
  }
}
</script>
