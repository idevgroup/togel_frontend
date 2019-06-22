<template>
  <div>
    <v-card>
      <v-toolbar color="teal" dark>
        <v-toolbar-title>{{ user.reg_name }}</v-toolbar-title>
      </v-toolbar>

      <v-list>
        <v-subheader>
          <v-icon>markunread_mailbox</v-icon> Market
        </v-subheader>
        <template v-for="market in markets">
          <v-list-tile
            :key="market.id"
            @click="markPlace(market.code)"
          >
            <v-list-tile-action>
              <v-icon>remove</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ market.name }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <v-subheader>
          <v-icon>transform</v-icon>Transaction
        </v-subheader>
        <template v-for="transaction in transactions">
          <v-list-tile
            :key="transaction.title"
            @click="transactionEvent(transaction.par)"
          >
            <v-list-tile-action>
              <v-icon>remove</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ transaction.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <v-subheader>
          <v-icon>settings</v-icon>Profile Setting
        </v-subheader>
        <template v-for="profile in userprofiles">
          <v-list-tile
            :key="profile.title"
            @click="profileEvent(profile.par)"
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
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  data() {
    return {
      markets: [],
      transactions: [
        { title: this.$t('Deposit'), par: 'deposit' },
        { title: this.$t('Withdraw'), par: 'withdraw' },
        { title: this.$t('Reports'), par: 'reports' }
      ],
      userprofiles: [
        { title: this.$t('Profile'), par: 'profile' },
        { title: this.$t('Referrals'), par: 'referrals' },
        { title: this.$t('Contact'), par: 'contact' }
      ]
    }
  },

  computed: mapGetters({
    user: 'auth/user'
  }),
  mounted() {
    this.getMarket()
  },
  methods: {
    getMarket() {
      const vm = this
      axios
        .get('member/getmarket')
        .then((response) => {
          vm.markets = response.data
        })
        .catch(function (error) {
          Swal.fire('Oops...', 'Something went wrong!\n' + error, 'error')
        })
    },
    markPlace(code) {
      console.log(code)
    },
    transactionEvent(par) {
      console.log(par)
    },
    profileEvent(par) {
      console.log(par)
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
.v-subheader .v-icon{
  margin-right: 10px;
display: flex;
justify-content: flex-start;
margin-bottom: 5px;
}
.v-list__tile {
  padding: 0 10px;
}
</style>
