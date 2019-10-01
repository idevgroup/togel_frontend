<template>
    <div>
        <div v-if="isSiteLock">
            <table class="table table-bordered mt-2 tbl-bet-list">
                <thead class="thead-light">
                    <tr>
                        <th width="1">#</th>
                        <th width="20%">Tebak As</th>
                        <th width="20%">Tebak Kop</th>
                        <th width="20%">Bet</th>
                        <th>Discount</th>
                        <th>Bayar</th>
                        <th width="45"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in tebakAsItem" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>
                            <b-form-select
                                v-model.number="item.selected1"
                                :options="tebakAs"
                                :disabled="item.is_not"
                                size="sm"></b-form-select>
                        </td>
                        <td>
                            <b-form-select
                                v-model.number="item.selected2"
                                :options="tebakKop"
                                :disabled="item.is_not"
                                size="sm"></b-form-select>
                        </td>
                        <td>
                            <vue-numeric
                                v-validate="{max_value:marketGameSetting.max_bet}"
                                :currency="setting.general.symbol"
                                v-model.number="item.bet"
                                :precision="2"
                                :name="`tebakAsbetprice`+index"
                                :data-vv-name="`tebakAsbetprice`+index"
                                :disabled="item.is_not"
                                :state="!veeErrors.has('tebakAsbetprice'+index)"
                                class="form-control form-control-sm"
                                separator=","
                                decimal-separator="."
                                data-vv-as="bet price"
                                @blur="checkAmount(index,item,tebakAsItem)"></vue-numeric>
                        </td>
                        <td>
                            <div class="text-right">{{ subDiscount(item) | currency(setting.general.symbol) }}</div>
                        </td>
                        <td>
                            <div class="text-right">{{ subtotal(item) | currency(setting.general.symbol) }}</div>
                        </td>
                        <td>
                            <span v-if="item.is_not !== true">
                                <button class="btn btn-sm  mr-2 btn-success" @click="isNotBet(index,item,tebakAsItem)"><i class="fa fa-check-square-o" aria-hidden="true"></i></button>
                            </span>
                            <span v-else>
                                <button class="btn btn-sm  mr-2  btn-warning" @click="isBet(index,item,tebakAsItem)"><i class="fa fa-minus-circle" aria-hidden="true"></i></button>
                            </span>

                        </td>
                    </tr>
                </tbody>
            </table>
            <b-row>
                <b-col>
                    <b-button
                        variant="info"
                        class="pull-left"
                        @click="Reset(1)">Reset</b-button>
                </b-col>
                <b-col>
                    <b-button
                        variant="danger"
                        class="pull-right"
                        @click="addRow(tebakAsItem,1,5)">Add Row</b-button>
                </b-col>
            </b-row>
            <table class="table table-bordered mt-2 tbl-bet-list">
                <thead class="thead-light">
                    <tr>
                        <th width="1">#</th>
                        <th width="20%">Tebak Kepala</th>
                        <th width="20%">Tebak Ekor</th>
                        <th width="20%">Bet</th>
                        <th>Discount</th>
                        <th>Bayar</th>
                        <th width="45"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in tebakKepalaItem" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>
                            <b-form-select
                                v-model.number="item.selected1"
                                :options="tebakKepala"
                                :disabled="item.is_not"
                                size="sm"></b-form-select>
                        </td>
                        <td>
                            <b-form-select
                                v-model.number="item.selected2"
                                :options="tebakEkor"
                                :disabled="item.is_not"
                                size="sm"></b-form-select>
                        </td>
                        <td>
                            <vue-numeric
                                v-validate="{max_value:marketGameSetting.max_bet}"
                                :currency="setting.general.symbol"
                                v-model.number="item.bet"
                                :precision="2"
                                :name="`Kepalabetprice`+index"
                                :data-vv-name="`Kepalabetprice`+index"
                                :disabled="item.is_not"
                                :state="!veeErrors.has('Kepalabetprice'+index)"
                                class="form-control form-control-sm"
                                separator=","
                                decimal-separator="."
                                data-vv-as="bet price"
                                @blur="checkAmount(index,item,tebakKepalaItem)"></vue-numeric>
                        </td>
                        <td>
                            <div class="text-right">{{ subDiscount(item) | currency(setting.general.symbol) }}</div>
                        </td>
                        <td>
                            <div class="text-right">{{ subtotal(item) | currency(setting.general.symbol) }}</div>
                        </td>
                        <td>
                            <span v-if="item.is_not !== true">
                                <button class="btn btn-sm  mr-2 btn-success" @click="isNotBet(index,item,tebakKepalaItem)"><i class="fa fa-check-square-o" aria-hidden="true"></i></button>
                            </span>
                            <span v-else>
                                <button class="btn btn-sm  mr-2  btn-warning" @click="isBet(index,item,tebakKepalaItem)"><i class="fa fa-minus-circle" aria-hidden="true"></i></button>
                            </span>

                        </td>
                    </tr>
                </tbody>
            </table>
            <b-row>
                <b-col>
                    <b-button
                        variant="info"
                        class="pull-left"
                        @click="Reset(2)">Reset</b-button>
                </b-col>
                <b-col>
                    <b-button
                        variant="danger"
                        class="pull-right"
                        @click="addRow(tebakKepalaItem,9,13)">Add Row</b-button>
                </b-col>
            </b-row>
            <table class="table table-bordered mt-2 tbl-bet-list">
                <thead class="thead-light">
                    <tr>
                        <th width="1">#</th>
                        <th width="20%">Tebak Angka 1</th>
                        <th width="20%">Tebak Angka 2</th>
                        <th width="20%">Bet</th>
                        <th>Discount</th>
                        <th>Bayar</th>
                        <th width="45"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in tebakAngkaItem" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>
                            <b-form-select
                                v-model.number="item.selected1"
                                :options="tebakAngka1"
                                :disabled="item.is_not"
                                size="sm"></b-form-select>
                        </td>
                        <td>
                            <b-form-select
                                v-model.number="item.selected2"
                                :options="tebakAngka2"
                                :disabled="item.is_not"
                                size="sm"></b-form-select>
                        </td>
                        <td>
                            <vue-numeric
                                v-validate="{max_value:marketGameSetting.max_bet}"
                                :currency="setting.general.symbol"
                                v-model.number="item.bet"
                                :precision="2"
                                :name="`Kepalabetprice`+index"
                                :data-vv-name="`Kepalabetprice`+index"
                                :disabled="item.is_not"
                                :state="!veeErrors.has('Kepalabetprice'+index)"
                                class="form-control form-control-sm"
                                separator=","
                                decimal-separator="."
                                data-vv-as="bet price"
                                @blur="checkAmount(index,item,tebakAngkaItem)"></vue-numeric>
                        </td>
                        <td>
                            <div class="text-right">{{ subDiscount(item) | currency(setting.general.symbol) }}</div>
                        </td>
                        <td>
                            <div class="text-right">{{ subtotal(item) | currency(setting.general.symbol) }}</div>
                        </td>
                        <td>
                            <span v-if="item.is_not !== true">
                                <button class="btn btn-sm  mr-2 btn-success" @click="isNotBet(index,item,tebakAngkaItem)"><i class="fa fa-check-square-o" aria-hidden="true"></i></button>
                            </span>
                            <span v-else>
                                <button class="btn btn-sm  mr-2  btn-warning" @click="isBet(index,item,tebakAngkaItem)"><i class="fa fa-minus-circle" aria-hidden="true"></i></button>
                            </span>

                        </td>
                    </tr>
                </tbody>
            </table>
            <b-row class="mb-5">
                <b-col>
                    <b-button
                        variant="info"
                        class="pull-left"
                        @click="Reset(3)">Reset</b-button>
                </b-col>
                <b-col>
                    <b-button
                        variant="danger"
                        class="pull-right"
                        @click="addRow(tebakAngkaItem,1,9)">Add Row</b-button>
                </b-col>
            </b-row>
            <p class="p-span-white">
                <span> Min Bet: {{ marketGameSetting.min_bet |currency(setting.general.symbol, 2, { thousandsSeparator: ',',spaceBetweenAmountAndSymbol: true })}}</span>
                <span> Max Bet: {{ marketGameSetting.max_bet |currency(setting.general.symbol, 2, { thousandsSeparator: ',',spaceBetweenAmountAndSymbol: true })}} </span>
                <span> Discount: {{ marketGameSetting.discount }}%</span>
                <span> Bet Modulus: {{ marketGameSetting.bet_mod |currency(setting.general.symbol, 2, { thousandsSeparator: ',',spaceBetweenAmountAndSymbol: true })}}</span>
                <span> Win: x {{ marketGameSetting.menang }}</span>
            </p>

            <b-row mt-5>
                <b-col class="text-center">
                    <b-button variant="success" @click="showConfirm">Save</b-button>
                </b-col>
            </b-row>
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
import SiteLockInfo from '~/components/gamemarket/SiteLockInfo'
import VueNumeric from 'vue-numeric'
import Swal from 'sweetalert2'
export default {
	layout: 'gamemarket',
	name: 'GameKombinasiForm',
	components: {
		VueNumeric,
		SiteLockInfo,
	},
	data() {
		return {
			items: [
				{
					value: 1,
					text: 'As Ganjil',
				},
				{
					value: 2,
					text: 'As Genap',
				},
				{
					value: 3,
					text: 'As Besar',
				},
				{
					value: 4,
					text: 'As Kecil',
				},
				{
					value: 5,
					text: 'Kop Ganjil',
				},
				{
					value: 6,
					text: 'Kop Genap',
				},
				{
					value: 7,
					text: 'Kop Besar',
				},
				{
					value: 8,
					text: 'Kop Kecil',
				},
				{
					value: 9,
					text: 'Kepala Ganjil',
				},
				{
					value: 10,
					text: 'Kepala Genap',
				},
				{
					value: 11,
					text: 'Kepala Besar',
				},
				{
					value: 12,
					text: 'Kepala Kecil',
				},
				{
					value: 13,
					text: 'Ekor Ganjil',
				},
				{
					value: 14,
					text: 'Ekor Genap',
				},
				{
					value: 15,
					text: 'Ekor Besar',
				},
				{
					value: 16,
					text: 'Ekor Kecil',
				},
			],
			tebakAs: [],
			tebakKop: [],
			tebakKepala: [],
			tebakEkor: [],
			tebakAngka1: [],
			tebakAngka2: [],
			tebakAsItem: [
				{
					selected1: 1,
					selected2: 5,
					bet: 0,
					discount: 0,
					pay: 0,
					is_not: false,
				},
			],
			tebakKepalaItem: [
				{
					selected1: 9,
					selected2: 13,
					bet: 0,
					discount: 0,
					pay: 0,
					is_not: false,
				},
			],
			tebakAngkaItem: [
				{
					selected1: 1,
					selected2: 9,
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
			this.tebakAsItem.forEach(item => {
				if (item.is_not === false) total += item.pay
			})
			this.tebakKepalaItem.forEach(item => {
				if (item.is_not === false) total += item.pay
			})
			this.tebakAngkaItem.forEach(item => {
				if (item.is_not === false) total += item.pay
			})
			return total
		},
		buttonStyle: function() {
			return {
				flex: `1 1 ${100 / 2}%`,
			}
		},
		itemBet: function() {
			let v
			v = this.tebakAngkaItem.concat(this.tebakKepalaItem)
			v = v.concat(this.tebakAsItem)
			return v
		},
	},
	mounted() {
		this.tebakAs = this.items.filter(
			item => item.value >= 1 && item.value <= 4
		)
		this.tebakKop = this.items.filter(
			item => item.value >= 5 && item.value <= 8
		)
		this.tebakKepala = this.items.filter(
			item => item.value >= 9 && item.value <= 12
		)
		this.tebakEkor = this.items.filter(
			item => item.value >= 13 && item.value <= 16
		)
		this.tebakAngka1 = this.items.filter(
			item => item.value >= 1 && item.value <= 8
		)
		this.tebakAngka2 = this.items.filter(
			item => item.value >= 9 && item.value <= 16
		)
	},
	created() {
		this.getMarketGameSetting()
		this.getIp()
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

		async getMarketGameSetting() {
			const input = {
				game: 'Kombinasi',
				market: this.$route.params.marketcode,
			}
			const data = await this.$axios.$post(
				'/member/getmarketgamesetting',
				input
			)
			this.marketGameSetting = data
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
		isNotBet(index, item, collect) {
			item.is_not = true
			collect.splice(index, 1, item)
		},
		isBet(index, item, collect) {
			item.is_not = false
			collect.splice(index, 1, item)
		},
		addRow(collect, op1, op2) {
			collect.push({
				selected1: op1,
				selected2: op2,
				bet: 0,
				discount: 0,
				pay: 0,
				is_not: false,
			})
		},
		Reset(op) {
			if (op === 1) {
				this.tebakAsItem = [
					{
						selected1: 1,
						selected2: 5,
						bet: 0,
						discount: 0,
						pay: 0,
						is_not: false,
					},
				]
			} else if (op === 2) {
				this.tebakKepalaItem = [
					{
						selected1: 9,
						selected2: 13,
						bet: 0,
						discount: 0,
						pay: 0,
						is_not: false,
					},
				]
			} else if (op === 3) {
				this.tebakAngkaItem = [
					{
						selected1: 1,
						selected2: 9,
						bet: 0,
						discount: 0,
						pay: 0,
						is_not: false,
					},
				]
			}
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
				betitem: this.itemBet.filter(
					item => item.bet > 0 && item.is_not === false
				),
				market: this.$route.params.marketcode,
				totalpay: this.totalPay,
				gamecode: 'Kombinasi',
				ip: this.ipPublicClient,
			}
			// if(!this.$validator.validateAll()) return

			const data = await this.$axios.$post(
				'/member/dobetgamekombinasi',
				input
			)
			// refresh user account to update balance
			Swal.fire(data.alert.title, data.alert.message, 'success')
			this.$auth.fetchUser()
			this.$modal.hide('preview-bet')
			this.$router.push({
				path: '/member/reports/' + this.$route.params.marketcode,
			})
		},
	},
}
</script>

<style scoped>
p span {
	display: block;
	font-weight: bold;
	line-height: 20px;
}

table tr td input {
	text-align: right;
}
</style>
