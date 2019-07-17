<template>
	<v-layout row wrap>
		<v-flex ms11 md11 ma-auto mb-5 mt-5>
			<v-card flat>
				<progress-bar :show="form.busy" />
				<form
					@keydown="form.onKeydown($event)"
					@submit.prevent="deposit"
				>
					<v-card-title>
						<v-icon large left>
							account_balance_wallet
						</v-icon>
						<span class="title font-weight-light">{{
							$t("deposit")
						}}</span>
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
								<label class="label">{{
									$t("deposit to")
								}}</label>
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
								<v-currency-field
									v-model="form.amount"
									v-validate="'required'"
									v-bind="formatmoney"
									:error-messages="errors.amount"
									name="amount"
									:label="$t('amount')"
									solo
									data-vv-name="amount"
									data-vv-as="Amount"
								></v-currency-field>
								<span v-if="errors.has('amount')" class="vdsms">
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
								<span
									v-if="errors.has('recaptcha')"
									class="vdsms"
								>
									{{ errors.first("recaptcha") }}
								</span>
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
import Vue from "vue"
import Form from "vform"
import { mapGetters } from "vuex"
import VueRecaptcha from "vue-recaptcha"
import Swal from "sweetalert2"
import currency from "v-currency-field"
import "v-currency-field/dist/index.css"

Vue.use(currency)
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
		formatmoney: {
			decimal: ".",
			thousands: ",",
			prefix: "$ ",
			suffix: "",
			precision: 2,
			masked: true,
			allowBlank: false
		}
	}),
	computed: {
		...mapGetters({
			user: "auth/user",
			setting: "frontsetting/setting"
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
			let vm = this
			//const data = await this.$axios.$post("member/deposit", this.form)
			const { data } = await this.form
				.post("member/deposit")
				.catch(function(error) {
					vm.errors.add({
						field: "amount",
						msg: error.response.data.errors.amount[0]
					})
					vm.$refs.recaptcha.reset()
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
		async getBankList() {
			await this.form
				.get(
					"member/get-bank-operator?bankmember=" +
						this.form.memberbank
				)
				.then(response => {
					this.bankitems = response.data
				})
				.catch(function(error) {
					console.log(error)
				})
		},
		setValue() {
			this.form.memberid = this.user.id
			this.formatmoney.prefix = this.setting.general.symbol + " "
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
.vdsms {
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
