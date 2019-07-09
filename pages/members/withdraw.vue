<template>
  <v-layout row wrap>
    <v-flex ms11 md11 ma-auto mb-5 mt-5>
      <v-card flat>
        <progress-bar :show="form.busy" />
        <form @keydown="form.onKeydown($event)" @submit.prevent="withdraw">
          <v-card-title>
            <v-icon large left>
              account_balance_wallet
            </v-icon>
            <span class="title font-weight-light">{{ $t("Withdraw") }}</span>
          </v-card-title>
          <v-card-text>
            <v-layout row>
              <v-flex sm3>
                <label class="label">{{ $t("bank") }}</label>
              </v-flex>
              <v-flex sm9>
                <select-input
                  v-model="selectNull"
                  v-validate="'required|min:1'"
                  :items="memberBank"
                  item-text="bank"
                  item-value="id"
                  :form="form"
                  :label="$t('bank')"
                  :v-errors="errors"
                  :value.sync="form.memberbank"
                  name="memberbank"
                  solo
                />
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex sm3>
                <label class="label">{{ $t("amount") }}</label>
              </v-flex>
              <v-flex sm9>
                <v-text-field
                  v-model="form.amount"
                  v-validate="'required'"
                  v-currency="{ locale, currency }"
                  solo
                  :label="$t('amount')"
                  data-vv-name="amount"
                  data-vv-as="Amount"
                  name="amount"
                />
                <span v-if="errors.has('amount')" id="amountsms">
                  {{ errors.first("amount") }}
                </span>
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
                  :label="$t('withdraw')"
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
import Swal from "sweetalert2"
import { CurrencyDirective } from "vue-currency-input"
export default {
  middleware: "auth",
  name: "WithdrawView",
  layout: "members",
  components: { VueRecaptcha },
  head() {
    return {
      title: this.$t("Withdraw")
    }
  },
  directives: {
    currency: CurrencyDirective
  },
  props: {
    memberid: {
      type: [String, Number],
      default: ""
    }
  },
  data: () => ({
    form: new Form({
      debank: "",
      amount: "",
      note: "",
      recaptcha: "",
      memberid: "",
      memberbank: ""
    }),
    locale: "en",
    currency: "USD",
    bankitems: [],
    memberBank: [],
    selectNull: null,
    selectBank: null
  }),
  computed: {
    ...mapGetters({
      user: "auth/user"
    })
  },
  mounted() {
    this.setValue()
    this.getMemberBank()
  },
  methods: {
    onVerify(response) {
      this.form.recaptcha = response
    },
    async withdraw() {
      if (await this.formHasErrors()) return
      //const data = await this.$axios.$post("member/deposit", this.form)
      const { data } = await this.form
        .post("member/withdraw")
        .catch(function(error) {
          Swal.fire(
            "Invalid amount",
            error.response.data.errors.amount[0],
            "warning"
          )
        })
      if (data.success === false) {
        Swal.fire(data.alert.title, data.alert.message, "info")
      } else {
        Swal.fire(data.alert.title, data.alert.message, "success")
      }

      // Redirect member dashboard.
      this.$router.push({ name: "members.dashboard" })
    },
    async getMemberBank() {
      await this.form.post("member/getmemberbank").then(response => {
        this.memberBank = response.data
      })
    },
    setValue() {
      this.form.memberid = this.user.id
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
#amountsms {
  color: #ff5252 !important;
  caret-color: #ff5252 !important;
  flex: 1 1 auto;
  font-size: 12px;
  min-height: 12px;
  min-width: 1px;
  position: relative;
  top: -25px;
  right: -15px;
}
</style>
