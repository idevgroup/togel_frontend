<template>
  <v-layout row wrap>
    <v-flex ms11 md11 ma-auto mb-5 mt-5>
      <v-card flat>
        <progress-bar :show="form.busy" />
        <form @keydown="form.onKeydown($event)" @submit.prevent="deposit">
          <v-card-title>
            <v-icon large left>
              account_balance_wallet
            </v-icon>
            <span class="title font-weight-light">{{ $t("Deposit") }}</span>
          </v-card-title>
          <v-card-text>
            <v-layout row>
              <v-flex sm3>
                <label class="label">{{ $t("bank") }}</label>
              </v-flex>
              <v-flex sm9>
                <text-input
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
                <label class="label">{{ $t("Account Name") }}</label>
              </v-flex>
              <v-flex sm9>
                <text-input
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
                <label class="label">{{ $t("Account ID") }}</label>
              </v-flex>
              <v-flex sm9>
                <text-input
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
                <label class="label">{{ $t("deposit to") }}</label>
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
                <label class="label">{{ $t("amount") }}</label>
              </v-flex>
              <v-flex sm9>
                <number-input
                  v-validate="'required|numeric'"
                  :form="form"
                  :label="$t('amount')"
                  :v-errors="errors"
                  :value.sync="form.amount"
                  name="amount"
                  solo
                />
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex sm3>
                <label class="label">{{ $t("note") }}</label>
              </v-flex>
              <v-flex sm9>
                <textarea-input
                  v-validate="'min:10'"
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
                <VueRecaptcha
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
                <submit-button
                  :form="form"
                  :label="$t('Deposit')"
                  block
                  color="primary"
                />
              </v-flex>
            </v-layout>
          </v-card-actions>
        </form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Form from "vform"
import { mapGetters } from "vuex"
import VueRecaptcha from "vue-recaptcha"
export default {
  middleware: "auth",
  name: "DepositView",
  layout: "members",
  components: { VueRecaptcha },
  head() {
    return {
      title: this.$t("Deposit"),
      script: [{ src: "https://www.google.com/recaptcha/api.js" }]
    }
  },
  props: {
    memberid: {
      type: [String, Number],
      default: ""
    }
  },
  data: () => ({
    form: new Form({
      bank: "",
      accountname: "",
      accountid: "",
      debank: "",
      amount: "",
      note: "",
      recaptcha: "",
      memberid: ""
    }),
    bankitems: []
  }),
  computed: mapGetters({
    user: "auth/user"
  }),
  watch: {},
  mounted() {
    this.getBankList()
    this.setValue()
  },
  methods: {
    onVerify(response) {
      this.form.recaptcha = response
    },
    async deposit() {
      if (await this.formHasErrors()) return
      const data = await this.$axios.$post("member/deposit", this.form)
      console.log(data)
    },
    async getBankList() {
      const getitems = await this.$axios.$get("banklist")
      this.bankitems = getitems
    },
    setValue() {
      this.form.memberid = this.user.id
      this.form.bank = this.user.get_player_bank.get_bank.bk_name
      this.form.accountname = this.user.get_player_bank.reg_account_name
      this.form.accountid = this.user.get_player_bank.reg_account_number
      this.form.debank = this.user.get_player_bank.reg_bk_id
    },
    resetCaptcha() {
      this.$refs.recaptcha.reset()
    }
  }
}
</script>

<style scoped>
.label {
  font-size: 16px;
  font-weight: 600;
  display: flex;
  line-height: 45px;
}
</style>
