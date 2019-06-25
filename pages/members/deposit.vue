<template>
  <v-layout row wrap>
    <v-flex ms11 md11 ma-auto mb-5 mt-5>
      <v-card>
        <progress-bar :show="form.busy" />
        <form @keydown="form.onKeydown($event)">
          <v-card-title>
            <v-icon
              large
              left
            >
              account_balance_wallet
            </v-icon>
            <span class="title font-weight-light">{{ $t('Deposit') }}</span>
          </v-card-title>
          <v-card-text>
            <v-layout row>
              <v-flex sm3>
                <label class="label">{{ $t('bank') }}</label>
              </v-flex>
              <v-flex sm9>
                <text-input
                  v-model="user.get_player_bank.get_bank.bk_name"
                  v-validate="'required'"
                  :form="form"
                  :label="$t('bank')"
                  :v-errors="errors"
                  :value.sync="form.bank"
                  name="bank"
                  solo
                  readonly
                />
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex sm3>
                <label class="label">{{ $t('Account Name') }}</label>
              </v-flex>
              <v-flex sm9>
                <text-input
                  v-model="user.get_player_bank.reg_account_name"
                  v-validate="'required'"
                  :form="form"
                  :label="$t('Account Name')"
                  :v-errors="errors"
                  :value.sync="form.accountname"
                  name="accountname"
                  solo
                  readonly
                />
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex sm3>
                <label class="label">{{ $t('Account ID') }}</label>
              </v-flex>
              <v-flex sm9>
                <text-input
                  v-model="user.get_player_bank.reg_account_number"
                  v-validate="'required'"
                  :form="form"
                  :label="$t('Account ID')"
                  :v-errors="errors"
                  :value.sync="form.accountid"
                  name="accountid"
                  solo
                  readonly
                />
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex sm3>
                <label class="label">{{ $t('deposit to') }}</label>
              </v-flex>
              <v-flex sm9>
                <select-input
                  v-validate="'required|min:1'"
                  :items="bankitems"
                  item-text="bk_name"
                  item-value="id"
                  :form="form"
                  :label="$t('deposit to')"
                  :v-errors="errors"
                  :value.sync="form.debank"
                  name="debank"
                  solo
                />
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex sm3>
                <label class="label">{{ $t('amount') }}</label>
              </v-flex>
              <v-flex sm9>
                <number-input
                  v-validate="'required|numeric'"
                  :form="form"
                  :label="$t('amount')"
                  :v-errors="errors"
                  :value.sync="form.amount"
                  browser-autocomplete="new-amount"
                  name="amount"
                  solo
                />
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex sm3>
                <label class="label">{{ $t('note') }}</label>
              </v-flex>
              <v-flex sm9>
                <textarea-input
                  v-validate="'min:20'"
                  :form="form"
                  :label="$t('note')"
                  :v-errors="errors"
                  :value.sync="form.note"
                  name="note"
                  solo
                />
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex sm3>
                <label class="label" />
              </v-flex>
              <v-flex sm9>
                <vue-recaptcha
                  ref="recaptcha"
                  v-model="form.recaptcha"
                  v-validate="'required'"
                  sitekey="6LejnqkUAAAAAOlNybZ8P4iCNcl-S9Gk2nZGbeoX"
                  name="recaptcha"
                  @verify="onVerify"
                  @expired="resetCaptcha"
                />
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-layout row>
              <v-flex sm3>
                <label class="label" />
              </v-flex>
              <v-flex sm5>
                <submit-button :form="form" :label="$t('Deposit')" block color="primary" />
              </v-flex>
            </v-layout>
          </v-card-actions>
        </form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Form from 'vform'
import axios from 'axios'
import { mapGetters } from 'vuex'
import VueRecaptcha from 'vue-recaptcha'
export default {
  middleware: 'auth',
  name: 'DepositView',
  layout: 'members',
  components: { VueRecaptcha },
  head() {
    return {
      title: this.$t('Deposit'),
      script: [
        { src: 'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaInit&render=explicit' }
      ]
    }
  },
  data: () => ({
    form: new Form({
      bank: '',
      accountname: '',
      accountid: '',
      debank: '',
      amount: '',
      note: '',
      recaptcha: ''
    }),
    bankitems: []
  }),
  computed: mapGetters({
    user: 'auth/user'
  }),
  mounted() {
    this.getBankList()
  },
  methods: {
    onVerify(response) {
      this.form.recaptcha = response
    },

    getBankList() {
      axios
        .get('banklist')
        .then((response) => {
          this.bankitems = response.data
        })
        .catch()
    },
    resetCaptcha() {
      this.$refs.recaptcha.reset()
    }
  }
}
</script>

<style scoped>
.v-card {
    box-shadow:none
}
.label{
  font-size: 16px;
    font-weight: 600;
    display: flex;
    line-height: 45px;
}
</style>
