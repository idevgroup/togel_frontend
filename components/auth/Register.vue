<template>
    
            <modal
                :scrollable="true"
                :classes="['v--modal', 'vue-dialog']"
                :adaptive="true"
                :width="modalWidth"
                height="auto"
                resizable
                reset
                name="register"
                transition="pop-out">
                <form ref="form" @submit.stop.prevent="registerSubmit">
                    <div class="modal-header">
                        <h5 class="modal-title">Register</h5>
                        <button type="button" class="close" aria-label="Close" @click="$modal.hide('register')">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">

                        <b-row>
                            <b-col>
                                <b-form-group label="Name" label-for="ame-input">
                                    <b-form-input
                                        v-validate="{ required: true }"
                                        id="name-input"
                                        v-model="form.name"
                                        name="name"
                                        data-vv-name="name"
                                        data-vv-as="name">
                                        ></b-form-input>
                                    <span v-show="veeErrors.has('name')" class="form-text text-danger">{{ veeErrors.first('name') }}</span>
                                </b-form-group>
                                <b-form-group label="User Name" label-for="username-input">
                                    <b-form-input
                                        v-validate="{ required: true }"
                                        id="username-input"
                                        v-model="form.username"
                                        name="username"
                                        data-vv-name="username"
                                        data-vv-as="username">
                                        ></b-form-input>
                                    <span v-show="veeErrors.has('username')" class="form-text text-danger">{{ veeErrors.first('username') }}</span>
                                </b-form-group>
                                <b-form-group label="Email" label-for="email-input">
                                    <b-form-input
                                        v-validate="{ required: true,email:true }"
                                        id="email-input"
                                        v-model="form.email"
                                        name="email"
                                        type="email"
                                        data-vv-name="email"
                                        data-vv-as="email">
                                        ></b-form-input>
                                    <span v-show="veeErrors.has('email')" class="form-text text-danger">{{ veeErrors.first('email') }}</span>
                                </b-form-group>
                                <b-form-group label="Password" label-for="password-input">
                                    <b-form-input
                                        v-validate="{ required: true }"
                                        id="password-input"
                                        ref="password"
                                        v-model="form.password"
                                        name="password"
                                        type="password"
                                        data-vv-name="password"
                                        data-vv-as="password">
                                        ></b-form-input>
                                    <span v-show="veeErrors.has('password')" class="form-text text-danger">{{ veeErrors.first('password') }}</span>
                                </b-form-group>
                                <b-form-group label="Password Confirm" label-for="confirm-input">
                                    <b-form-input
                                        v-validate="{required:true,confirmed:'password'}"
                                        id="confirm-input"
                                        v-model="form.password_confirmation"
                                        name="confirmed"
                                        type="password"
                                        data-vv-name="confirmed"
                                        data-vv-as="password confirm">
                                        ></b-form-input>
                                    <span v-show="veeErrors.has('confirmed')" class="form-text text-danger">{{ veeErrors.first('confirmed') }}</span>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group label="Phone" label-for="phone-input">
                                    <b-form-input
                                        v-validate="{ required: true }"
                                        id="phone-input"
                                        v-model="form.phone"
                                        name="phone"
                                        type="tel"
                                        data-vv-name="phone"
                                        data-vv-as="phone">
                                        ></b-form-input>
                                    <span v-show="veeErrors.has('phone')" class="form-text text-danger">{{ veeErrors.first('phone') }}</span>
                                </b-form-group>
                                <b-form-group label="Bank Info" label-for="bank-input">
                                    <b-form-select
                                        v-validate="{ required: true }"
                                        id="bank-input"
                                        v-model="form.bank"
                                        :options="itemBank"
                                        name="bank"
                                        value-field="id"
                                        text-field="bk_name"
                                        data-vv-name="bank"
                                        data-vv-as="bank info"></b-form-select>
                                    <span v-show="veeErrors.has('bank')" class="form-text text-danger">{{ veeErrors.first('bank') }}</span>
                                </b-form-group>
                                <b-form-group label="Account Name" label-for="accountname-input">
                                    <b-form-input
                                        v-validate="{ required: true }"
                                        id="accountname-input"
                                        v-model="form.accountname"
                                        name="accountname"
                                        data-vv-name="accountname"
                                        data-vv-as="account name">
                                        ></b-form-input>
                                    <span v-show="veeErrors.has('accountname')" class="form-text text-danger">{{ veeErrors.first('accountname') }}</span>
                                </b-form-group>
                                <b-form-group label="Account Number" label-for="account-input">
                                    <b-form-input
                                        v-validate="{ required: true }"
                                        id="account-input"
                                        v-model="form.accountid"
                                        name="accountid"
                                        type="number"
                                        data-vv-name="accountid"
                                        data-vv-as="account">
                                        ></b-form-input>
                                    <span v-show="veeErrors.has('accountid')" class="form-text text-danger">{{ veeErrors.first('accountid') }}</span>
                                </b-form-group>
                                <b-form-group>
                                    <VueRecaptcha
                                        v-validate="{ required:true }"
                                        ref="recaptcha"
                                        v-model="form.recaptcha"
                                        :sitekey="recaptchaKey"
                                        name="recapcha"
                                        data-vv-name="recapcha"
                                        data-vv-as="recapcha"
                                        @verify="onVerify"
                                        @expired="resetCaptcha"></VueRecaptcha>
                                    <span v-show="veeErrors.has('recapcha')" class="form-text text-danger">{{ veeErrors.first('recapcha') }}</span>
                                </b-form-group>
                            </b-col>
                        </b-row>

                    </div>
                    <div class="vue-dialog-buttons">
                        <button :style="buttonStyle" class="vue-dialog-button text-bold">
                            OK
                        </button>
                        <button :style="buttonStyle" class="vue-dialog-button" @click="$modal.hide('register')">
                            CANCEL
                        </button>
                    </div>
                </form>
            </modal>
   
</template>

<script>
const MODAL_WIDTH = 656
import VueRecaptcha from 'vue-recaptcha'
export default {
	components: {
		VueRecaptcha,
	},
	data() {
		return {
			form: {
				name: '',
				username: '',
				password: '',
				email: '',
				password_confirmation: '',
				phone: '',
				bank: '',
				accountid: '',
				accountname: '',
				recaptcha: '',
			},
			recaptchaKey: '',
			itemBank: [],
			modalWidth: MODAL_WIDTH,
		}
	},
	computed: {
		buttonStyle: function() {
			return {
				flex: `1 1 ${100 / 2}%`,
			}
		},
	},
	created() {
		this.recaptchaKey = process.env.RECAPTCHA_KEY
		this.itemBank = this.setting.bank
		this.modalWidth =
			window.innerWidth < MODAL_WIDTH ? MODAL_WIDTH / 2 : MODAL_WIDTH
		this.getIp()
	},
	methods: {
		onVerify(response) {
			let self = this
			self.form.recaptcha = response
		},
		resetCaptcha() {
			this.$refs.recaptcha.reset()
		},
		resetModal() {
			this.form.name = ''
			this.form.username = ''
			this.form.password = ''
			this.form.email = ''
			this.form.password_confirmation = ''
			this.form.phone = ''
			this.form.bank = ''
			this.form.accountid = ''
			this.form.accountname = ''
			this.form.recaptcha = ''
		},
		handleOk(bvModalEvt) {
			// Prevent modal from closing
			bvModalEvt.preventDefault()
			// Trigger submit handler
			this.registerSubmit()
		},
		async registerSubmit() {
			this.$validator.validateAll().then(result => {
				let self = this
				if (result) {
					try {
						this.$axios
							.$post('member/register', self.form)
							.then(() => {
								this.$auth
									.loginWith('local', {
										data: {
											username: self.form.username,
											password: self.form.password,
										},
									})
									.then(() => {
										this.$router.push({
											name: 'member-dashboard',
										})
										this.$nextTick(() => {
											self.$refs.modal.hide()
										})
									})
									.catch(function(error) {
										console.log(error)
									})
							})
							.catch(() => {
								this.$refs.recaptcha.reset()
							})
					} catch (e) {
						console.log(e)
					}
				}
			})
		},
	},
}
</script>
