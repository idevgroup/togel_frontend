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
            <span class="title font-weight-light">{{ $t("deposit") }}</span>
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
                  @onChange="getBankList"
                />
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex sm3>
                <label class="label">{{ $t("deposit to") }}</label>
              </v-flex>
              <v-flex sm9>
                <select-input
                  v-model="selectBank"
                  v-validate="'required|min:1'"
                  :items="bankitems"
                  item-text="bank"
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
                  v-validate="'required'"
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
                  :label="$t('deposit')"
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
export default {
  middleware: "auth",
  name: "DepositView",
  layout: "members",
  components: { VueRecaptcha },
  head() {
    return {
      title: this.$t("deposit")
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
      debank: "",
      amount: "",
      note: "",
      recaptcha: "",
      memberid: "",
      memberbank: ""
    }),
    bankitems: [],
    memberBank: [],
    selectNull: null,
    selectBank: null,
    isInputActive: false
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
    async deposit() {
      if (await this.formHasErrors()) return
      //const data = await this.$axios.$post("member/deposit", this.form)
      const { data } = await this.form
        .post("member/deposit")
        .catch(function(error) {
          console.log(error)
        })
      Swal.fire(data.alert.title, data.alert.message, "success")
      // Redirect member dashboard.
      this.$router.push({ name: "members.dashboard" })
    },
    async getMemberBank() {
      await this.form.post("member/getmemberbank").then(response => {
        this.memberBank = response.data
      })
    },
    async getBankList() {
      await this.form
        .get("member/get-bank-operator?bankmember=" + this.form.memberbank)
        .then(response => {
          this.bankitems = response.data
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
</style>
