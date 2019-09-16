<template>
    <div>

        <div v-if="isSiteLock">
            <b-row>
                <b-col class="mt-3">
                    <b-form id="frm-quick" inline>
                        <label class="mr-sm-2"> Bet Number</label>
                        <b-form-input
                            v-validate="{is_not:0,max:4,max_value:9999, min:2 }"
                            v-model="number"
                            :name="`betnumber`"
                            :data-vv-name="`betnumber`"
                            :state="!veeErrors.has('betnumber')"
                            class="form-control form-control-sm"
                            type="text"
                            maxlength="4"
                            minlength="2"
                            data-vv-as="bet number"
                            @keypress="isNumberInt($event)">
                        </b-form-input>
                        <label class="mr-sm-2">Bet Price</label>
                        <b-form-input
                            v-model.number="betvalue"
                            :name="`betprice`"
                            :data-vv-name="`betprice`"
                            :state="!veeErrors.has('betprice')"
                            class="form-control form-control-sm"
                            maxlength="4"
                            data-vv-as="bet price"
                            @keypress="isNumberInt($event)">
                        </b-form-input>
                        <label class="mr-sm-2">x 1000</label>
                        <b-button
                            :disabled="veeErrors.any()"
                            variant="primary"
                            @click="generateNumber">Submit</b-button>
                        <b-button variant="info" @click="reset">Reset</b-button>
                    </b-form>
                </b-col>
            </b-row>
            <table class="table table-bordered mt-3">
                <thead class="thead-light">
                    <tr>
                        <th width="1">#</th>
                        <th width="60%"> Number</th>
                        <th>Pay</th>
                        <th width="45"></th>
                    </tr>
                </thead>
                <template v-if="items.length > 0">
                    <tbody>
                        <tr v-for="(items, index) in newArray" :key="index">
                            <td v-if="items.price > 0">
                                {{ index +1 }}
                            </td>
                            <td v-if="items.price > 0">
                                {{ items.list }}
                            </td>
                            <td v-if="items.price > 0">
                                {{ items.price |currency(setting.general.symbol) }}
                            </td>
                            <td v-if="items.price > 0">
								  <span v-if="items.is_not !== true">
                                <button class="btn btn-sm  mr-2 btn-success" @click="isNotBet(index,items,items.xd)"><i class="fa fa-check-square-o" aria-hidden="true"></i></button>
                            </span>
                            <span v-else>
                                <button class="btn btn-sm  mr-2  btn-warning" @click="isBet(index,items,items.xd)"><i class="fa fa-minus-circle" aria-hidden="true"></i></button>
                            </span>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </table>
            <b-col class="mb-5">
                <b-button
                    :disabled="veeErrors.any()"
                    variant="success"
                    @click="showConfirm">Save</b-button>
            </b-col>
            <p>
                <span> 4D Min Bet: {{ gameSetting4d.min_bet |currency(setting.general.symbol)}} | 3D Min Bet: {{ gameSetting3d.min_bet |currency(setting.general.symbol)}} | 2D Min Bet: {{ gameSetting2d.min_bet |currency(setting.general.symbol)}} </span>
                <span> 4D Max Bet: {{ gameSetting4d.max_bet |currency(setting.general.symbol)}} | 3D Max Bet: {{ gameSetting3d.max_bet |currency(setting.general.symbol)}} | 2D Max Bet: {{ gameSetting2d.max_bet |currency(setting.general.symbol)}} </span>
                <span> 4D Bet Modulus: {{ gameSetting4d.bet_mod |currency(setting.general.symbol)}} | 3D Bet Modulus: {{ gameSetting3d.bet_mod |currency(setting.general.symbol)}} | 2D Bet Modulus: {{ gameSetting2d.bet_mod |currency(setting.general.symbol)}} </span>
                <span> 4D Bet Discs: {{ gameSetting4d.discount }} % | 3D Bet Discs: {{ gameSetting3d.discount}} % | 2D Bet Discs: {{ gameSetting2d.discount }} % </span>
                <span> 4D Win: x {{ gameSetting4d.menang }} | 3D Win: x {{ gameSetting3d.menang }} | 2D Win: x {{ gameSetting2d.menang }} </span>

            </p>
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
                        Payment: <span class="text-info">{{ totalPay | currency(setting.general.symbol)}}</span>
                    </h5>
                    <b-col>
                        <p class="text-center mt-3 " style="font-weight:bold">
                            Are you want to process this transaction !!!
                        </p>
                    </b-col>
                </div>

                <div class="vue-dialog-buttons">
                    <button :style="buttonStyle" class="vue-dialog-button text-bold" @click="saveBetGame">
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

import SiteLockInfo from '~/components/gamemarket/SiteLockInfo'
export default {
	layout: 'gamemarket',
	name: 'GameQuickForm',
	components: {
		VueNumeric,
		SiteLockInfo,
	},
	data() {
		return {
			number: '',
			betvalue: 1,
			marketGameSetting: [],
			items: [],
			gameSetting2d: [],
			gameSetting3d: [],
			gameSetting4d: [],
			is_not: false,
			newArray: [],
		}
	},
	computed: {
		totalPay: function() {
			return this.items.reduce(function(a, c) {
				if (c.is_not === false) return a + Number(c.betpay || 0)
				else return a
			}, 0)
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
	},
	methods: {
		subtotal(item) {
			let len = item.numberXd.length
			let settingdiscount
			if (len == 2) {
				settingdiscount = this.gameSetting2d.discount
			} else if (len == 3) {
				settingdiscount = this.gameSetting3d.discount
			} else if (len == 4) {
				settingdiscount = this.gameSetting4d.discount
			}
			item.discount =
				item.numberXd !== ''
					? (item.betvalue * settingdiscount) / 100
					: 0
			item.betpay =
				item.numberXd !== '' ? item.betvalue - item.discount : 0
			return item.numberXd !== ''
				? item.betvalue - (item.betvalue * settingdiscount) / 100
				: 0
		},
		subDiscount(item) {
			let len = item.numberXd.length
			let settingdiscount
			if (len == 2) {
				settingdiscount = this.gameSetting2d.discount
			} else if (len == 3) {
				settingdiscount = this.gameSetting3d.discount
			} else if (len == 4) {
				settingdiscount = this.gameSetting4d.discount
			}

			item.discount =
				item.numberXd !== ''
					? (item.betvalue * settingdiscount) / 100
					: 0
			item.betpay =
				item.numberXd !== '' ? item.betvalue - item.discount : 0
			return item.numberXd !== '' ? item.discount : 0
		},

		async getMarketGameSetting() {
			const input = {
				game: ['4D', '3D', '2D'],
				market: this.$route.params.marketcode,
			}
			const data = await this.$axios.$post(
				'/member/getmarketgamesetting',
				input
			)
			let self = this
			data.forEach(setting => {
				if (setting.game_name === '4D') {
					self.gameSetting4d = setting
				} else if (setting.game_name === '3D') {
					self.gameSetting3d = setting
				} else if (setting.game_name === '2D') {
					self.gameSetting2d = setting
				}
			})
		},
		isNotBet(indexs, items, xd) {
			let self = this
			self.items.forEach((item, index) => {
				if (item.numberXd.length === xd) {
					item.is_not = true
					self.items.splice(index, 1, item)
				}
			})
			items.is_not = true
			self.newArray.splice(indexs, 1, items)
		},
		isBet(indexs, items, xd) {
			let self = this
			self.items.forEach((item, index) => {
				if (item.numberXd.length === xd) {
					item.is_not = false
					self.items.splice(index, 1, item)
				}
			})
			items.is_not = false
			self.newArray.splice(indexs, 1, items)
		},
		async saveBetGame() {
			let self = this
			const input = {
				betitem: self.items,
				market: this.$route.params.marketcode,
				totalpay: self.totalPay,
				gamecode: 'quickbet',
				ip: this.ipPublicClient,
			}
			// if(!this.$validator.validateAll()) return

			const data = await this.$axios.$post(
				'/member/dobetgamequick',
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
		showConfirm() {
			if (
				this.totalPay < this.user.reg_remain_balance &&
				this.totalPay > 0
			) {
				this.$modal.show('preview-bet')
			} else {
				Swal.fire(
					'Invalide Amount',
					"Sorry, you don't have enough balance for this operation Or Zero.",
					'info'
				)
			}
		},
		checkAmount(index, item) {
			let limitMax
			let limitMin
			let modulus

			let len = item.numberXd.length

			if (len == 2) {
				limitMax = this.gameSetting2d.max_bet
				limitMin = this.gameSetting2d.min_bet
				modulus = this.gameSetting2d.bet_mod
			} else if (len == 3) {
				limitMax = this.gameSetting3d.max_bet
				limitMin = this.gameSetting3d.min_bet
				modulus = this.gameSetting3d.bet_mod
			} else if (len == 4) {
				limitMax = this.gameSetting4d.max_bet
				limitMin = this.gameSetting4d.min_bet
				modulus = this.gameSetting4d.bet_mod
			}

			let value_mod = 0
			if (item.betvalue !== 0) {
				value_mod = parseFloat(item.betvalue) % parseFloat(modulus)

				if (
					limitMax < item.betvalue ||
					limitMin > item.betvalue ||
					value_mod !== 0
				) {
					item.betvalue = this.betvalue * 1000
					this.items.splice(index, 1, item)
					Swal.fire(
						'Invalide Amount',
						'Amount cannot less then ' +
							this.setting.general.symbol +
							' ' +
							limitMin +
							' or greater than ' +
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
		async generateNumber() {
			let self = this
			if (self.number === '') {
				Swal.fire({
					type: 'warning',
					title: 'Invalid input.',
					text: 'Please input number to generate !!!',
				})
				return false
			}
			let arr = this.permute(self.number)
			let newArr = []
			arr.forEach(item => {
				var i = 2
				var str = item.toString()
				for (i; i <= str.length; i++) {
					newArr.push(str.substr(-i))
				}
			})
			newArr = this.getUnique(newArr).sort((a, b) => b - a)
			self.items = []
			await newArr.forEach(item => {
				self.items.push({
					numberXd: item,
					betvalue: self.betvalue * 1000,
					discount: 0,
					betpay: 0,
					is_not: false,
				})
			})

			let numberBet4d = []
			let numberBet3d = []
			let numberBet2d = []
			let price4d = 0
			let price3d = 0
			let price2d = 0
			self.items.forEach(item => {
				if (item.numberXd.length === 4) {
					numberBet4d.push(item.numberXd)
					price4d += this.subtotal(item)
				}
				if (item.numberXd.length === 3) {
					numberBet3d.push(item.numberXd)
					price3d += this.subtotal(item)
				}
				if (item.numberXd.length === 2) {
					numberBet2d.push(item.numberXd)
					price2d += this.subtotal(item)
				}
			})

			self.newArray = [
				{
					list: numberBet4d.join(', '),
					price: price4d,
					is_not: false,
					xd: 4,
				},
				{
					list: numberBet3d.join(', '),
					price: price3d,
					is_not: false,
					xd: 3,
				},
				{
					list: numberBet2d.join(', '),
					price: price2d,
					is_not: false,
					xd: 2,
				},
			]
		},
		reset() {
			let self = this
			self.items = []
			self.number = ''
			self.betvalue = 1
		},
		permute(value) {
			var arr = Array.from(value.toString()).map(Number)
			var results = [],
				l = arr.length,
				used = Array(l),
				data = Array(l)
			;(function backtracking(pos) {
				if (pos == l) return results.push(data.slice())
				for (var i = 0; i < l; ++i)
					if (!used[i]) {
						used[i] = true
						data[pos] = arr[i]
						backtracking(pos + 1)
						used[i] = false
					}
			})(0)
			var str = []
			results.forEach(item => {
				str.push(item.join(''))
			})
			return this.getUnique(str)
		},
		getUnique(arr) {
			const final = []
			arr.map((e, i) => !final.includes(e) && final.push(e))
			return final
		},
		filterXd(xd) {
			let self = this
			let str = []
			self.items.forEach(item => {
				if (item.numberXd.length === xd) str.push(item.numberXd)
			})
			return str.join(', ')
		},
		totalPaybyXd(xd) {
			let self = this
			let pay = 0
			self.items.forEach((item, index) => {
				if (item.numberXd.length === xd && item.is_not === false)
					pay += this.subtotal(item)
			})
			return pay
		},
	},
}
</script>

<style scoped>
.form-control.is-valid {
	border-color: #28a745;
	padding-right: 5px;
	background-image: none;
	background-repeat: no-repeat;
	background-position: center right calc(0.375em + 0.1875rem);
	background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}

#frm-quick label {
	font-weight: bold;
	margin-left: 3px;
}

#frm-quick button {
	margin-right: 3px;
}

.form-control.is-invalid {
	padding-right: 5px;
}

table tr td input {
	text-align: right;
}

p span {
	display: block;
	font-weight: bold;
	line-height: 20px;
}
</style>
