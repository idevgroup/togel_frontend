<template>
    <b-card no-body bg-variant="light">
        <h4 slot="header" class="m-0"><i class="fa fa-money"></i> Withdraw</h4>
        <b-col lg="9" class="m-auto">
            <b-form @submit.stop.prevent="doWithdraw">
                <b-form-group
                    label-cols-sm="4"
                    label-cols-lg="3"
                    label="Bank:"
                    label-for="input-bank"
                    label-class="font-weight-bold"
                    class="mt-2">
                    <b-form-select
                        v-validate="{ required: true }"
                        id="input-bank"
                        v-model="selectedMemberBank"
                        :options="memberBank"
                        name="bank"
                        value-field="id"
                        text-field="bank"
                        data-vv-name="bank"
                        data-vv-as="bank"></b-form-select>
                    <span v-show="veeErrors.has('bank')" class="form-text text-danger">{{ veeErrors.first('bank') }}</span>
                </b-form-group>

                <b-form-group
                    label-cols-sm="4"
                    label-cols-lg="3"
                    label="Amount:"
                    label-for="input-amount"
                    label-class="font-weight-bold">
                    <money
                        v-validate="{ required: true,is_not:0 }"
                        id="input-amount"
                        v-model="amountWithdraw"
                        v-bind="formatmoney"
                        name="amount"
                        class="form-control"
                        data-vv-name="amount"
                        data-vv-as="amount">
                    </money>
                    <span v-show="veeErrors.has('amount')" class="form-text text-danger">{{ veeErrors.first('amount') }}</span>
                </b-form-group>
                <b-form-group
                    label-cols-sm="4"
                    label-cols-lg="3"
                    label="Message:"
                    label-for="input-message"
                    label-class="font-weight-bold">
                    <b-form-textarea
                        v-validate="{ min:10 }"
                        id="input-message"
                        v-model="messageWithdraw"
                        name="message"
                        placeholder="Enter message..."
                        rows="3"
                        max-rows="6"
                        data-vv-name="message"
                        data-vv-as="message">
                        ></b-form-textarea>
                    <span v-show="veeErrors.has('message')" class="form-text text-danger">{{ veeErrors.first('message') }}</span>
                </b-form-group>

                <b-form-group
                    label-cols-sm="4"
                    label-cols-lg="3"
                    label="">
                    <VueRecaptcha
                        v-validate="{ required:true }"
                        ref="recaptcha"
                        v-model="recaptcha"
                        :sitekey="recaptchaKey"
                        name="recapcha"
                        data-vv-name="recapcha"
                        data-vv-as="recapcha"
                        @verify="onVerify"
                        @expired="resetCaptcha" ></VueRecaptcha>

                    <span v-show="veeErrors.has('recapcha')" class="form-text text-danger">{{ veeErrors.first('recapcha') }}</span>
                </b-form-group>

                <b-form-group
                    label-cols-sm="4"
                    label-cols-lg="3"
                    label="">
                    <b-button
                        :disabled="veeErrors.any()"
                        type="submit"
                        variant="primary">Submit</b-button>
                </b-form-group>
            </b-form>
        </b-col>
    </b-card>
</template>

<script>
import { Money } from 'v-money'
import VueRecaptcha from 'vue-recaptcha'
import Swal from 'sweetalert2'
export default {
	layout: ({ isMobile }) => (isMobile ? 'mobile' : 'member'),
	components: {
		Money,
		VueRecaptcha,
	},
	data: () => ({
		memberBank: [],
		selectedMemberBank: null,
		amountWithdraw: '',
		messageWithdraw: '',
		recaptcha: '',
		recaptchaKey: '',
		formatmoney: {
			decimal: '.',
			thousands: ',',
			prefix: '$ ',
			suffix: '',
			precision: 2,
			masked: false,
			allowBlank: false,
		},
	}),

	mounted() {
		this.getMemberBank()
	},
	created() {
		this.recaptchaKey = process.env.RECAPTCHA_KEY
		this.formatmoney.prefix = this.setting.general.symbol + ' '
		this.getIp()
	},
	methods: {
		onVerify(response) {
			let self = this
			self.recaptcha = response
		},
		resetCaptcha() {
			this.$refs.recaptcha.reset()
		},
		async getMemberBank() {
			await this.$axios.$post('member/getmemberbank').then(response => {
				this.memberBank = response
			})
		},
		async doWithdraw() {
			this.$validator.validateAll().then(response => {
				if (response) {
					let self = this
					try {
						const input = {
							amount: self.amountWithdraw,
							recaptcha: self.recaptcha,
							note: self.messageWithdraw,
							memberbank: self.selectedMemberBank,
							ip: this.ipPublicClient,
						}
						this.$axios
							.$post('member/withdraw', input)
							.catch(function(error) {
								self.recaptcha = ''
								self.$refs.recaptcha.reset()
								console.log(error)
							})
							.then(response => {
								if (response.data.success === false) {
									Swal.fire(
										response.data.alert.title,
										response.data.alert.message,
										'info'
									)
								} else {
									Swal.fire(
										response.data.alert.title,
										response.data.alert.message,
										'success'
									)
								}
								// refresh user account to update balance
								this.$auth.fetchUser()
								// Redirect member dashboard.
								this.$router.push({
									name: 'member-dashboard',
								})
							})
					} catch (error) {
						self.recaptcha = ''
						self.$refs.recaptcha.reset()
					}
				}
			})
		},
	},
}
</script>

<style>
</style>
