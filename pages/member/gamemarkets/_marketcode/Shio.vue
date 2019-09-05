<template>
    <div>
        <market-head-active></market-head-active>
        <div v-if="isSiteLock">
            <p>
                <span> Min Bet: {{ marketGameSetting.min_bet |currency(setting.general.symbol, 2, { thousandsSeparator: ',',spaceBetweenAmountAndSymbol: true })}}</span>
                <span> Max Bet: {{ marketGameSetting.max_bet |currency(setting.general.symbol, 2, { thousandsSeparator: ',',spaceBetweenAmountAndSymbol: true })}} </span>
                <span> Discount: {{ marketGameSetting.discount }}%</span>
                <span> Bet Modulus: {{ marketGameSetting.bet_mod |currency(setting.general.symbol, 2, { thousandsSeparator: ',',spaceBetweenAmountAndSymbol: true })}}</span>
                <span> Win: x {{ marketGameSetting.menang }}</span>
            </p>
            <table class="table table-bordered mt-2">
                <thead class="thead-light">
                    <tr>
                        <th width="1">#</th>
                        <th width="20%">Nomor</th>
                        <th width="20%">Bet</th>
                        <th>Discount</th>
                        <th>Bayar</th>
                        <th width="45"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in ItemShio" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>
                            <b-form-select
                                v-model.number="item.selected"
                                :options="items"
                                :disabled="item.is_not"
                                size="sm"></b-form-select>
                        </td>
                        <td>
                            <vue-numeric
                                v-validate="{max_value:marketGameSetting.max_bet}"
                                :currency="setting.general.symbol"
                                v-model.number="item.bet"
                                :precision="2"
                                :name="`betprice`+index"
                                :data-vv-name="`betprice`+index"
                                :disabled="item.is_not"
                                :state="!veeErrors.has('betprice'+index)"
                                class="form-control form-control-sm"
                                separator=","
                                decimal-separator="."
                                data-vv-as="bet price"
                                @blur="checkAmount(index,item,ItemShio)"></vue-numeric>
                        </td>
                        <td>
                            <div class="text-right">{{ subDiscount(item) | currency(setting.general.symbol) }}</div>
                        </td>
                        <td>
                            <div class="text-right">{{ subtotal(item) | currency(setting.general.symbol) }}</div>
                        </td>
                        <td>
                            <span v-if="item.is_not !== true">
                                <button class="btn btn-sm  mr-2 btn-success" @click="isNotBet(index,item)"><i class="fa fa-check-square-o" aria-hidden="true"></i></button>
                            </span>
                            <span v-else>
                                <button class="btn btn-sm  mr-2  btn-warning" @click="isBet(index,item)"><i class="fa fa-minus-circle" aria-hidden="true"></i></button>
                            </span>

                        </td>
                    </tr>
                </tbody>
            </table>
            <b-row class="mb-5">
                <b-col>

                    <b-button variant="success" @click="showConfirm">Save</b-button>

                </b-col>
                <b-col>
                    <b-button
                        variant="info"
                        class="pull-right"
                        @click="reset">Reset</b-button>
                    <b-button
                        variant="danger"
                        class="pull-right"
                        @click="addRow">Add Row</b-button>
                </b-col>
            </b-row>
            <table id="tbl-shio" class="table table-bordered mt-2">
                <thead class="thead-light">
                    <tr>
                        <th>Nama Shio</th>
                        <th>Nomor Terkait</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in items" :key="index">
                        <td>
                            {{ splitString(item.text) }}
                        </td>
                        <td>
                            {{ rangeNumber(index+1) }}
                        </td>
                    </tr>
                </tbody>
            </table>

            <modal
                :scrollable="true"
                :classes="['v--modal', 'vue-dialog']"
                :adaptive="true"
				 resizable
                reset
                name="preview-bet"
                height="auto"
                draggable=".modal-header">

                <div class="modal-header">
                    <h5 class="modal-title">Confirm Information</h5>
                    <button type="button" class="close" aria-label="Close" @click="$modal.hide('preview-bet')">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <h5>
                        Wallet: <span class="text-info">{{ user.reg_remain_balance| currency(setting.general.symbol)}}</span>
                    </h5>
                    <h5>
                        Payment: <span class="text-info">{{ parseFloat(totalPay) | currency(setting.general.symbol)}}</span>
                    </h5>
                    <b-col>
                        <p class="text-center mt-3 " style="font-weight:bold">
                            Are you want to process this transaction !!!
                        </p>
                    </b-col>
                </div>

                <div class="vue-dialog-buttons">
                    <button :style="buttonStyle" class="vue-dialog-button text-bold" @click="save">
                        OK
                    </button>
                    <button :style="buttonStyle" class="vue-dialog-button" @click="$modal.hide('preview-bet')">
                        CANCEL
                    </button>
                </div>

            </modal>
        </div>
        <div v-else>
            <site-lock-info />
        </div>

    </div>
</template>

<script>
import VueNumeric from 'vue-numeric'
import Swal from 'sweetalert2'
import MarketHeadActive from '~/components/gamemarket/MarketHeadActive'
import SiteLockInfo from '~/components/gamemarket/SiteLockInfo'
export default {
	layout: 'gamemarket',
	name: 'GameShioForm',
	components: {
		VueNumeric,
		MarketHeadActive,
		SiteLockInfo,
	},
	data() {
		return {
			index: 1,
			items: [],
			ItemShio: [
				{
					selected: 1,
					bet: 0,
					discount: 0,
					pay: 0,
					is_not: false,
				},
			],
			marketGameSetting: [],
		}
	},
	computed: {
		totalPay: function() {
			let total = 0
			this.ItemShio.forEach(item => {
				if (item.is_not === false) total += item.pay
			})
			return total
		},
		buttonStyle: function() {
			return {
				flex: `1 1 ${100 / 2}%`,
			}
		},
	},
	created() {
		this.getMarketGameSetting()
		this.getIp()
		this.loadShio()
	},
	methods: {
		subtotal(item) {
			return item.bet !== 0
				? item.bet - (item.bet * this.marketGameSetting.discount) / 100
				: 0
		},
		subDiscount(item) {
			item.discount =
				item.bet !== 0
					? (item.bet * this.marketGameSetting.discount) / 100
					: 0
			item.pay = item.bet !== 0 ? item.bet - item.discount : 0
			return item.bet !== 0 ? item.discount : 0
		},

		async loadShio() {
			const input = {
				date: this.nowDateTime,
			}
			const data = await this.$axios.$post('/member/getgameshio', input)
			this.items = data
		},
		async getMarketGameSetting() {
			const input = {
				game: 'Shio',
				market: this.$route.params.marketcode,
			}
			const data = await this.$axios.$post(
				'/member/getmarketgamesetting',
				input
			)
			this.marketGameSetting = data
		},
		isNotBet(index, item) {
			item.is_not = true
			this.ItemShio.splice(index, 1, item)
		},
		isBet(index, item) {
			item.is_not = false
			this.ItemShio.splice(index, 1, item)
		},
		checkAmount(index, item, collect) {
			let limitMax = this.marketGameSetting.max_bet
			let limitMin = this.marketGameSetting.min_bet
			let modulus = this.marketGameSetting.bet_mod
			let value_mod = 0
			if (item.bet !== 0) {
				value_mod = parseFloat(item.bet) % parseFloat(modulus)

				if (
					limitMax < item.bet ||
					limitMin > item.bet ||
					value_mod !== 0
				) {
					item.bet = 0
					collect.splice(index, 1, item)
					Swal.fire(
						'Invalide Amount',
						'Amount cannot less then ' +
							this.setting.general.symbol +
							' ' +
							limitMin +
							'  or greater than ' +
							this.setting.general.symbol +
							' ' +
							limitMax +
							' and also modulus of ' +
							this.setting.general.symbol +
							' ' +
							modulus,
						'info'
					)
				}
			}
		},
		addRow() {
			this.ItemShio.push({
				selected: 1,
				bet: 0,
				discount: 0,
				pay: 0,
				is_not: false,
			})
		},
		reset() {
			this.ItemShio = [
				{
					selected: 1,
					bet: 0,
					discount: 0,
					pay: 0,
					is_not: false,
				},
			]
		},
		showConfirm() {
			let totalPay = parseFloat(this.totalPay)
			if (totalPay < this.user.reg_remain_balance && totalPay > 0) {
				this.$modal.show('preview-bet')
			} else {
				Swal.fire(
					'Invalide Amount',
					"Sorry, you don't have enough balance for this operation or Not be Zero",
					'info'
				)
			}
		},
		async save() {
			const input = {
				betitem: this.ItemShio.filter(
					item => item.bet > 0 && item.is_not === false
				),
				market: this.$route.params.marketcode,
				totalpay: this.totalPay,
				gamecode: 'Shio',
				ip: this.ipPublicClient,
			}
			// if(!this.$validator.validateAll()) return

			const data = await this.$axios.$post('/member/dobetgameshio', input)
			// refresh user account to update balance
			Swal.fire(data.alert.title, data.alert.message, 'success')
			this.$auth.fetchUser()
			this.$modal.hide('preview-bet')
			this.$router.push({
				path: '/member/reports/' + this.$route.params.marketcode,
			})
		},
		splitString(str) {
			var value = ''
			value = str.split('.')
			return value[1]
		},
		rangeNumber(start) {
			let value = []
			for (start; start <= 100; start += 12) {
				value.push(String('0' + start).slice(-2))
			}
			return value.toString()
		},
	},
}
</script>

<style scoped>
table tr td input {
	text-align: right;
}

.form-control.is-valid {
	border-color: #28a745;
	padding-right: 5px;
	background-image: none;
	background-repeat: no-repeat;
	background-position: center right calc(0.375em + 0.1875rem);
	background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}

p span {
	display: block;
	font-weight: bold;
	line-height: 20px;
}
table#tbl-shio tr td,
table#tbl-shio tr th {
	text-align: center;
}
</style>
