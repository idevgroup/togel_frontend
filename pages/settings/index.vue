<template>
  <v-layout row>
    <v-flex xs12 sm9 lg9 ma-auto mt-5>
      <v-card>
        <progress-bar :show="busy" />
        <v-card-title primary-title class="grey lighten-4">
          <h3 class="headline mb-0">
            {{ $t("settings") }}
          </h3>
        </v-card-title>
        <v-divider />

        <v-tabs icons-and-text centered fixed>
          <v-tabs-slider color="primary" />

          <v-tab :key="tab-person">
            {{ $t("profile") }}
            <v-icon>person</v-icon>
          </v-tab>
          <v-tab :key="tab-password">
            {{ $t("password") }}
            <v-icon>lock</v-icon>
          </v-tab>

          <v-tab-item :key="tab-person">
            <profile-view @busy="busy = $event" />
          </v-tab-item>
          <v-tab-item :key="tab-password">
            <password-view @busy="busy = $event" />
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Profile from '~/pages/settings/profile'
import Password from '~/pages/settings/password'

export default {
  name: 'SettingsView',
  layout: 'members',
  components: {
    'profile-view': Profile,
    'password-view': Password
  },
  data() {
    return {
      busy: false
    }
  }
}
</script>
