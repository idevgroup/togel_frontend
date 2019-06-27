<template>
  <v-layout row wrap>
    <v-flex xs12 sm4 ma-3>
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">
              Balance
            </h3>
            <div>{{ user.reg_remain_balance }}</div>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
    <v-flex ma-3>
      <DepositList />
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex"
import DepositList from "./depositlist"
export default {
  middleware: "auth",
  name: "DashboardView",
  layout: "members",
  components: {
    DepositList
  },
  computed: mapGetters({
    user: "auth/user"
  }),
  head() {
    return { title: this.$t("dashboard") }
  }
}
</script>
