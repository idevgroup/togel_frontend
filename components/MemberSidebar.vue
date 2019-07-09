<template>
  <div>
    <v-toolbar color="teal" dark>
      <v-toolbar-title>{{ user.reg_name }}</v-toolbar-title>
    </v-toolbar>

    <v-list>
      <v-subheader>
        <v-icon>
          account_balance_wallet
        </v-icon>
        {{ user.reg_remain_balance }}
      </v-subheader>
      <v-subheader id="dashboard" @click="dashboardEvent">
        <v-icon>
          dashboard
        </v-icon>
        Dashboard
      </v-subheader>
      <v-subheader> <v-icon>markunread_mailbox</v-icon> Market </v-subheader>
      <template v-for="market in markets">
        <v-list-tile :key="market.id" @click="markPlace(market.code)">
          <v-list-tile-action>
            <v-icon>remove</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ market.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
      <v-subheader> <v-icon>transform</v-icon>Transaction </v-subheader>
      <template v-for="transaction in transactions">
        <v-list-tile
          :key="transaction.title"
          flat
          @click="transactionEvent(transaction.path)"
        >
          <v-list-tile-action>
            <v-icon>remove</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ transaction.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
      <v-subheader> <v-icon>settings</v-icon>Profile Setting </v-subheader>
      <template v-for="profile in userprofiles">
        <v-list-tile
          :key="profile.title"
          flat
          @click="profileEvent(profile.path)"
        >
          <v-list-tile-action>
            <v-icon>remove</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ profile.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import axios from "axios"
import Swal from "sweetalert2"
export default {
  middleware: "auth",
  data() {
    return {
      markets: [],
      transactions: [
        { title: this.$t("deposit"), path: "deposit" },
        { title: this.$t("Withdraw"), path: "withdraw" },
        { title: this.$t("Reports"), path: "reports" }
      ],
      userprofiles: [
        { title: this.$t("Profile"), path: "profile" },
        { title: this.$t("bank"), path: "bank" },
        { title: this.$t("Referrals"), path: "referrals" },
        { title: this.$t("Contact"), path: "contact" }
      ]
    }
  },

  computed: mapGetters({
    user: "auth/user"
  }),
  mounted() {
    this.getMarket()
  },
  methods: {
    getMarket() {
      const vm = this
      axios
        .get("member/getmarket")
        .then(response => {
          vm.markets = response.data
        })
        .catch(function(error) {
          Swal.fire("Oops...", "Something went wrong!\t" + error, "error")
        })
    },
    markPlace(code) {
      console.log(code)
    },
    transactionEvent(expression) {
      this.$router.push({ name: "members." + expression })
    },
    profileEvent(expression) {
      this.$router.push({ name: "settings." + expression })
    },
    dashboardEvent() {
      this.$router.push({ name: "members.dashboard" })
    }
  }
}
</script>

<style>
.v-list__tile__action {
  display: flex;
  justify-content: flex-start;
  min-width: 30px;
  align-items: center;
}
.v-subheader {
  align-items: center;
  display: flex;
  height: 48px;
  font-size: 18px;
  font-weight: 600;
  padding: 0 10px;
}
.v-subheader .v-icon {
  margin-right: 10px;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 5px;
}
.v-list__tile {
  padding: 0 10px;
}
#dashboard {
  cursor: pointer;
}
#dashboard:hover {
  background-color: whitesmoke;
}
</style>
