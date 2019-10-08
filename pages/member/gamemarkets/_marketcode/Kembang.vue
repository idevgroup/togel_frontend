<template>
    <div>
     
        <div v-if="isSiteLock">
            <p class="p-span-white">
                <span> Kembang Min Bet: {{ gameSettingKembang.min_bet |currency(setting.general.symbol)}} | Kempis Min Bet: {{ gameSettingKempis.min_bet |currency(setting.general.symbol)}} | Kembar Min Bet: {{ gameSettingKembar.min_bet |currency(setting.general.symbol)}}</span>
                <span> Kembang Max Bet: {{ gameSettingKembang.max_bet |currency(setting.general.symbol)}} | Kempis Max Bet: {{ gameSettingKempis.max_bet |currency(setting.general.symbol)}} | Kembar Max Bet: {{ gameSettingKembar.max_bet |currency(setting.general.symbol)}}</span>
                <span> Kembang Bet Modulus: {{ gameSettingKembang.bet_mod |currency(setting.general.symbol)}} | Kempis Bet Modulus: {{ gameSettingKempis.bet_mod |currency(setting.general.symbol)}} | Kembar Bet Modulus: {{ gameSettingKembar.bet_mod |currency(setting.general.symbol)}} </span>
                <span> Kembang Bet Discs: {{ gameSettingKembang.discount }} % | Kempis Bet Discs: {{ gameSettingKempis.discount}} % </span>
                <span> Win Kembang: {{ (gameSettingKembang.menang === 1)?100:gameSettingKembang.menang }}% | Win Kempis: {{ gameSettingKempis.menang ===1?100:gameSettingKempis.menang }} % | Win Kempis: {{ gameSettingKembar.menang ===1?100:gameSettingKembar.menang }} %</span>
            </p>

            <table class="table table-bordered mt-5 tbl-bet-list">
                <thead class="thead-light">
                    <tr>
                        <th colspan="9" class="text-center">Kembang</th>
                    </tr>
                    <tr>
                        <th width="20">
                            #
                        </th>
                        <th width="160">
                            Guess
                        </th>
                        <th>
                            Kei(%)
                        </th>
                        <th width="165">
                            Bet Price
                        </th>
                        <th>
                            Kei
                        </th>
                        <th>
                            Pay
                        </th>

                    </tr>
                </thead>
                <tbody>
                    <template v-for="(item,index) in Kembang">
                        <tr :key="index">
                            <td>{{ index+1 }}</td>
                            <td>{{ item.name }}</td>
                            <td width="15">{{ gameSettingKembang.kei }}%</td>
                            <td>
                                <vue-numeric
                                    v-validate="{max_value:gameSettingKembang.max_bet}"
                                    :currency="setting.general.symbol"
                                    v-model.number="item.bet"
                                    :precision="2"
                                    :name="`Kembangbetprice`+index"
                                    :data-vv-name="`Kembangbetprice`+index"
                                    :state="!veeErrors.has('Kembangbetprice'+index)"
                                    class="form-control form-control-sm"
                                    separator=","
                                    decimal-separator="."
                                    data-vv-as="bet price"
                                    @blur="checkAmountKembang(index,item,Kembang)">
                                </vue-numeric>
                            </td>
                            <td class="text-right">
                                {{ totalKei(item,gameSettingKembang) | currency(setting.general.symbol)}}
                            </td>
                            <td class="text-right">
                                {{ totalPay(item,gameSettingKembang) | currency(setting.general.symbol)}}
                            </td>

                        </tr>
                    </template>
                </tbody>
            </table>
            <table class="table table-bordered mt-5 tbl-bet-list">
                <thead class="thead-light">
                    <tr>
                        <th colspan="9" class="text-center">Kempis</th>
                    </tr>
                    <tr>
                        <th width="20">
                            #
                        </th>
                        <th width="160">
                            Guess
                        </th>
                        <th>
                            Kei(%)
                        </th>
                        <th width="165">
                            Bet Price
                        </th>
                        <th>
                            Kei
                        </th>
                        <th>
                            Pay
                        </th>

                    </tr>
                </thead>
                <tbody>
                    <template v-for="(item,index) in Kempis">
                        <tr :key="index">
                            <td>{{ index+1 }}</td>
                            <td>{{ item.name }}</td>
                            <td width="15">{{ gameSettingKempis.kei }}%</td>
                            <td>
                                <vue-numeric
                                    v-validate="{max_value:gameSettingKempis.max_bet}"
                                    :currency="setting.general.symbol"
                                    v-model.number="item.bet"
                                    :precision="2"
                                    :name="`Kempisbetprice`+index"
                                    :data-vv-name="`Kempisbetprice`+index"
                                    :state="!veeErrors.has('Kempisbetprice'+index)"
                                    class="form-control form-control-sm"
                                    separator=","
                                    decimal-separator="."
                                    data-vv-as="bet price"
                                    @blur="checkAmountKempis(index,item,Kempis)">
                                </vue-numeric>
                            </td>
                            <td class="text-right">
                                {{ totalKei(item,gameSettingKempis) | currency(setting.general.symbol)}}
                            </td>
                            <td class="text-right">
                                {{ totalPay(item,gameSettingKempis) | currency(setting.general.symbol)}}
                            </td>

                        </tr>
                    </template>
                </tbody>
            </table>

             <table class="table table-bordered mt-5 tbl-bet-list">
                <thead class="thead-light">
                    <tr>
                        <th colspan="9" class="text-center">Kembar</th>
                    </tr>
                    <tr>
                        <th width="20">
                            #
                        </th>
                        <th width="160">
                            Guess
                        </th>
                        <th>
                            Kei(%)
                        </th>
                        <th width="165">
                            Bet Price
                        </th>
                        <th>
                            Kei
                        </th>
                        <th>
                            Pay
                        </th>

                    </tr>
                </thead>
                <tbody>
                    <template v-for="(item,index) in Kembar">
                        <tr :key="index">
                            <td>{{ index+1 }}</td>
                            <td>{{ item.name }}</td>
                            <td width="15">{{ gameSettingKembar.kei }}%</td>
                            <td>
                                <vue-numeric
                                    v-validate="{max_value:gameSettingKembar.max_bet}"
                                    :currency="setting.general.symbol"
                                    v-model.number="item.bet"
                                    :precision="2"
                                    :name="`Kembarbetprice`+index"
                                    :data-vv-name="`Kembarbetprice`+index"
                                    :state="!veeErrors.has('Kembarbetprice'+index)"
                                    class="form-control form-control-sm"
                                    separator=","
                                    decimal-separator="."
                                    data-vv-as="bet price"
                                    @blur="checkAmountKembar(index,item,Kembar)">
                                </vue-numeric>
                            </td>
                            <td class="text-right">
                                {{ totalKei(item,gameSettingKembar) | currency(setting.general.symbol)}}
                            </td>
                            <td class="text-right">
                                {{ totalPay(item,gameSettingKembar) | currency(setting.general.symbol)}}
                            </td>

                        </tr>
                    </template>
                </tbody>
            </table>


            <b-row>
                <b-col>
                    <b-button variant="success" @click="showConfirm">Save</b-button>
                </b-col>
                <b-col>
                    <b-button variant="outline-primary" @click="reset">Reset</b-button>
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
                        Payment: <span class="text-info">{{ parseFloat(totalPayKembang) +
                parseFloat(totalPayKempis) +  parseFloat(totalPayKembar) | currency(setting.general.symbol)}}</span>
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
	layout: ({ isMobile }) => (isMobile ? 'mobile' : 'gamemarket'),
	name: 'GameKembangForm',
	components: {
		VueNumeric,
		SiteLockInfo,
	},
	data() {
		return {
			Kembang: [
				{
					name: 'Depan',
					bet: 0,
					kei: 0,
					pay: 0,
					discount: 0,
					key: 1,
				},
				{
					name: 'Tengah',
					bet: 0,
					kei: 0,
					pay: 0,
					discount: 0,
					key: 2,
				},
				{
					name: 'Belakang',
					bet: 0,
					kei: 0,
					pay: 0,
					discount: 0,
					key: 3,
				},
			],
			Kempis: [
				{
					name: 'Depan',
					bet: 0,
					kei: 0,
					pay: 0,
					discount: 0,
					key: 1,
				},
				{
					name: 'Tengah',
					bet: 0,
					kei: 0,
					pay: 0,
					discount: 0,
					key: 2,
				},
				{
					name: 'Belakang',
					bet: 0,
					kei: 0,
					pay: 0,
					discount: 0,
					key: 3,
				},
			],
			Kembar: [
				{
					name: 'Depan',
					bet: 0,
					kei: 0,
					pay: 0,
					discount: 0,
					key: 1,
				},
				{
					name: 'Tengah',
					bet: 0,
					kei: 0,
					pay: 0,
					discount: 0,
					key: 2,
				},
				{
					name: 'Belakang',
					bet: 0,
					kei: 0,
					pay: 0,
					discount: 0,
					key: 3,
				},
			],
			gameSettingKembang: [],
			gameSettingKempis: [],
			gameSettingKembar: [],
		}
	},
	computed: {
		totalPayKembang: function() {
			return this.Kembang.reduce(function(a, c) {
				return a + Number(c.pay || 0)
			}, 0)
		},
		totalPayKempis: function() {
			return this.Kempis.reduce(function(a, c) {
				return a + Number(c.pay || 0)
			}, 0)
		},
		totalPayKembar: function() {
			return this.Kembar.reduce(function(a, c) {
				return a + Number(c.pay || 0)
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
		totalKei(item, gamesetting) {
			let total = 0
			if (item.bet !== 0) {
				let discount =
					(parseFloat(item.bet) * parseFloat(gamesetting.discount)) /
					100
				let discountKei =
					((parseFloat(item.bet) - parseFloat(discount)) *
						parseFloat(gamesetting.kei)) /
					100
				total = discount + discountKei
				item.discount = discount
				item.kei = discountKei
			}

			return total
		},
		totalPay(item, gamesetting) {
			let total = 0
			let discount =
				(parseFloat(item.bet) * parseFloat(gamesetting.discount)) / 100
			let discountKei =
				((parseFloat(item.bet) - parseFloat(discount)) *
					parseFloat(gamesetting.kei)) /
				100
			total =
				parseFloat(item.bet) -
				(parseFloat(discount) + parseFloat(discountKei))
			return (item.pay = total)
		},

		async getMarketGameSetting() {
			const input = {
				game: ['Kempis', 'Kembang', 'Kembar'],
				market: this.$route.params.marketcode,
			}
			const data = await this.$axios.$post(
				'/member/getmarketgamesetting',
				input
			)
			let self = this
			data.forEach(setting => {
				if (setting.game_name === 'Kembang') {
					self.gameSettingKembang = setting
				} else if (setting.game_name === 'Kempis') {
					self.gameSettingKempis = setting
				} else if (setting.game_name === 'Kembar') {
					self.gameSettingKembar = setting
				}
			})
		},
		checkAmountKembang(index, item, collect) {
			let limitMax = 0
			let limitMin = 0
			let modulus = 0
			limitMax = this.gameSettingKembang.max_bet
			limitMin = this.gameSettingKembang.min_bet
			modulus = this.gameSettingKembang.bet_mod
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
		checkAmountKempis(index, item, collect) {
			let limitMax = 0
			let limitMin = 0
			let modulus = 0
			limitMax = this.gameSettingKempis.max_bet
			limitMin = this.gameSettingKempis.min_bet
			modulus = this.gameSettingKempis.bet_mod
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
		checkAmountKembar(index, item, collect) {
			let limitMax = 0
			let limitMin = 0
			let modulus = 0
			limitMax = this.gameSettingKembar.max_bet
			limitMin = this.gameSettingKembar.min_bet
			modulus = this.gameSettingKembar.bet_mod
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

		showConfirm() {
			let totalPay =
				parseFloat(this.totalPayKembang) +
				parseFloat(this.totalPayKempis) +
				parseFloat(this.totalPayKembar)
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
		reset() {
			let self = this
			Object.keys(this.Kembang).forEach(function(key, index) {
				self.Kembang[key].bet = 0
			})
			Object.keys(this.Kempis).forEach(function(key, index) {
				self.Kempis[key].bet = 0
			})
			Object.keys(this.Kembar).forEach(function(key, index) {
				self.Kembar[key].bet = 0
			})
		},
		async save() {
			let totalPay =
				parseFloat(this.totalPayKembang) +
				parseFloat(this.totalPayKempis) +
				parseFloat(this.totalPayKembar)
			const input = {
				betKembang: this.Kembang.filter(value => value.bet > 0),
				betKempis: this.Kempis.filter(value => value.bet > 0),
				betKembar: this.Kembar.filter(value => value.bet > 0),
				betTotalPay: totalPay,
				market: this.$route.params.marketcode,
				ip: this.ipPublicClient,
			}
			if (totalPay < this.user.reg_remain_balance && totalPay > 0) {
				const data = await this.$axios.$post(
					'member/dobetgamekembang',
					input
				)
				// refresh user account to update balance
				this.$modal.hide('preview-bet')
				Swal.fire(data.alert.title, data.alert.message, 'success')
				this.$auth.fetchUser()
				this.$router.push({
					path: '/member/reports/' + this.$route.params.marketcode,
				})
			} else {
				Swal.fire(
					'Invalide Amount',
					"Sorry, you don't have enough balance for this operation or Not be Zero",
					'info'
				)
			}
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
