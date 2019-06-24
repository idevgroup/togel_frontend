<template>
  <v-layout row>
    <v-flex xs12 sm8 lg5 ma-auto mt-5>
      <v-card>
        <progress-bar :show="form.busy" />
        <form @submit.prevent="register" @keydown="form.onKeydown($event)">
          <v-card-title primary-title>
            <h3 class="headline mb-0">
              {{ $t("register") }}
            </h3>
          </v-card-title>
          <v-card-text>
            <!-- Name -->
            <text-input
              v-validate="'required|max:30'"
              :form="form"
              :label="$t('name')"
              :v-errors="errors"
              :value.sync="form.name"
              browser-autocomplete="name"
              counter="30"
              name="name"
            />
            <!--User Name-->
            <text-input
              v-validate="'required|max:30'"
              :form="form"
              :label="$t('username')"
              :v-errors="errors"
              :value.sync="form.username"
              browser-autocomplete="username"
              counter="30"
              name="username"
            />
            <!-- Email -->
            <email-input
              v-validate="'required|email'"
              :form="form"
              :label="$t('email')"
              :v-errors="errors"
              :value.sync="form.email"
              name="email"
            />

            <!-- Password -->
            <password-input
              ref="password"
              v-validate="'required|min:8'"
              :form="form"
              :hint="$t('password_length_hint')"
              :label="$t('password')"
              :v-errors="errors"
              :value.sync="form.password"
              browser-autocomplete="new-password"
              name="password"
              @eye="eye = $event"
            />

            <!-- Password Confirmation -->
            <password-input
              v-validate="'required|confirmed:password'"
              :form="form"
              :hide="eye"
              :label="$t('confirm_password')"
              :v-errors="errors"
              :value.sync="form.password_confirmation"
              browser-autocomplete="new-password"
              data-vv-as="password"
              hide-icon="true"
              name="password_confirmation"
            />
            <text-input
              v-validate="'required'"
              :form="form"
              :label="$t('phone')"
              :v-errors="errors"
              :value.sync="form.phone"
              browser-autocomplete="phone"
              name="phone"
            />
            <select-input
              v-validate="'required|min:1'"
              :items="getbank"
              item-text="bk_name"
              item-value="id"
              :form="form"
              :label="$t('bank')"
              :v-errors="errors"
              :value.sync="form.bank"
              name="bank"
              return-object
            />
            <text-input
              v-validate="'required'"
              :form="form"
              :label="$t('Account Name')"
              :v-errors="errors"
              :value.sync="form.accountname"
              browser-autocomplete="accountname"
              name="accountname"
            />
            <text-input
              v-validate="'required'"
              :form="form"
              :label="$t('Account ID')"
              :v-errors="errors"
              :value.sync="form.accountid"
              browser-autocomplete="accountid"
              name="accountid"
            />
            <vue-recaptcha
              ref="recaptcha"
              v-model="form.recaptcha"
              v-validate="'required'"
              sitekey="6LejnqkUAAAAAOlNybZ8P4iCNcl-S9Gk2nZGbeoX"
              name="recaptcha"
              @verify="onVerify"
              @expired="resetCaptcha"
            />
          </v-card-text>
          <v-card-actions>
            <submit-button :form="form" :label="$t('register')" />
          </v-card-actions>
        </form>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import Form from 'vform'
import axios from 'axios'
import VueRecaptcha from 'vue-recaptcha'
export default {
  layout: 'frontend',
  name: 'RegisterView',
  components: { VueRecaptcha },
  head() {
    return {
      title: this.$t('Member Register'),
      script: [
        { src: 'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaInit&render=explicit' }
      ]
    }
  },
  data: () => ({
    form: new Form({
      name: '',
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      bank: '',
      accountname: '',
      accountid: '',
      recaptcha: '',
      phone: ''
    }),
    getbank: [],
    eye: true
  }),
  mounted() {
    this.getBank()
  },
  methods: {
    onVerify(response) {
      console.log(response)
      this.form.recaptcha = response
    },
    async register() {
      if (await this.formHasErrors()) return

      // Register the user.
      const { data } = await this.form.post('member/register')

      // Log in the user.
      const {
        data: { token }
      } = await this.form.post('member/login')

      // Save the token.
      this.$store.dispatch('auth/saveToken', { token })

      // Update the user.
      await this.$store.dispatch('auth/updateUser', { user: data })

      // Redirect home.
      this.$router.push({ name: 'members.dashboard' })
    },
    getBank() {
      const vm = this
      axios
        .get('banklist')
        .then((response) => {
          vm.getbank = response.data
        })
        .catch()
    },
    resetCaptcha() {
      this.$refs.recaptcha.reset()
    }
  }
}
</script>
