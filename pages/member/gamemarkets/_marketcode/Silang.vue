<template>
    <div>
        <div v-if="isSiteLock">
            <p class="p-span-white">
                <span> Silang Min Bet: {{ gameSettingSilang.min_bet |currency(setting.general.symbol)}} | Homo Min Bet: {{ gameSettingHomo.min_bet |currency(setting.general.symbol)}} </span>
                <span> Silang Max Bet: {{ gameSettingSilang.max_bet |currency(setting.general.symbol)}} | Homo Max Bet: {{ gameSettingHomo.max_bet |currency(setting.general.symbol)}} </span>
                <span> Silang Bet Modulus: {{ gameSettingSilang.bet_mod |currency(setting.general.symbol)}} | Homo Bet Modulus: {{ gameSettingHomo.bet_mod |currency(setting.general.symbol)}} </span>
                <span> Silang Bet Discs: {{ gameSettingSilang.discount }} % | Homo Bet Discs: {{ gameSettingHomo.discount}} % </span>
                <span> Win Silang: {{ (gameSettingSilang.menang === 1)?100:gameSettingSilang.menang }}% | Win Homo: {{ gameSettingHomo.menang ===1?100:gameSettingHomo.menang }} % </span>
            </p>

            <table class="table table-bordered mt-5 tbl-bet-list">
                <thead class="thead-light">
                    <tr>
                        <th colspan="9" class="text-center">Silang</th>
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
                    <template v-for="(item,index) in Silang">
                        <tr :key="index">
                            <td>{{ index+1 }}</td>
                            <td>{{ item.name }}</td>
                            <td width="15">{{ gameSettingSilang.kei }}%</td>
                            <td>
                                <vue-numeric
                                    v-validate="{max_value:gameSettingSilang.max_bet}"
                                    :currency="setting.general.symbol"
                                    v-model.number="item.bet"
                                    :precision="2"
                                    :name="`silangbetprice`+index"
                                    :data-vv-name="`silangbetprice`+index"
                                    :state="!veeErrors.has('silangbetprice'+index)"
                                    class="form-control form-control-sm"
                                    separator=","
                                    decimal-separator="."
                                    data-vv-as="bet price"
                                    @blur="checkAmountSilang(index,item,Silang)">
                                </vue-numeric>
                            </td>
                            <td class="text-right">
                                {{ totalKei(item,gameSettingSilang) | currency(setting.general.symbol)}}
                            </td>
                            <td class="text-right">
                                {{ totalPay(item,gameSettingSilang) | currency(setting.general.symbol)}}
                            </td>

                        </tr>
                    </template>
                </tbody>
            </table>
            <table class="table table-bordered mt-5">
                <thead class="thead-light">
                    <tr>
                        <th colspan="9" class="text-center">Homo</th>
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
                    <template v-for="(item,index) in Homo">
                        <tr :key="index">
                            <td>{{ index+1 }}</td>
                            <td>{{ item.name }}</td>
                            <td width="15">{{ gameSettingHomo.kei }}%</td>
                            <td>
                                <vue-numeric
                                    v-validate="{max_value:gameSettingHomo.max_bet}"
                                    :currency="setting.general.symbol"
                                    v-model.number="item.bet"
                                    :precision="2"
                                    :name="`Homobetprice`+index"
                                    :data-vv-name="`Homobetprice`+index"
                                    :state="!veeErrors.has('Homobetprice'+index)"
                                    class="form-control form-control-sm"
                                    separator=","
                                    decimal-separator="."
                                    data-vv-as="bet price"
                                    @blur="checkAmountHomo(index,item,Homo)">
                                </vue-numeric>
                            </td>
                            <td class="text-right">
                                {{ totalKei(item,gameSettingHomo) | currency(setting.general.symbol)}}
                            </td>
                            <td class="text-right">
                                {{ totalPay(item,gameSettingHomo) | currency(setting.general.symbol)}}
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
                        Payment: <span class="text-info">{{ parseFloat(totalPaySilang) +
                parseFloat(totalPayHomo)| currency(setting.general.symbol)}}</span>
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
	name: 'GameSilangForm',
	components: {
		VueNumeric,
		SiteLockInfo,
	},
	data() {
		return {
			Silang: [
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
			Homo: [
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
			gameSettingSilang: [],
			gameSettingHomo: [],
		}
	},
	computed: {
		totalPaySilang: function() {
			return this.Silang.reduce(function(a, c) {
				return a + Number(c.pay || 0)
			}, 0)
		},
		totalPayHomo: function() {
			return this.Homo.reduce(function(a, c) {
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
				game: ['Homo', 'Silang'],
				market: this.$route.params.marketcode,
			}
			const data = await this.$axios.$post(
				'/member/getmarketgamesetting',
				input
			)
			let self = this
			data.forEach(setting => {
				if (setting.game_name === 'Silang') {
					self.gameSettingSilang = setting
				} else if (setting.game_name === 'Homo') {
					self.gameSettingHomo = setting
				}
			})
		},
		checkAmountSilang(index, item, collect) {
			let limitMax = 0
			let limitMin = 0
			let modulus = 0
			limitMax = this.gameSettingSilang.max_bet
			limitMin = this.gameSettingSilang.min_bet
			modulus = this.gameSettingSilang.bet_mod
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
		checkAmountHomo(index, item, collect) {
			let limitMax = 0
			let limitMin = 0
			let modulus = 0
			limitMax = this.gameSettingHomo.max_bet
			limitMin = this.gameSettingHomo.min_bet
			modulus = this.gameSettingHomo.bet_mod
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
				parseFloat(this.totalPaySilang) + parseFloat(this.totalPayHomo)
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
			Object.keys(this.Silang).forEach(function(key, index) {
				self.Silang[key].bet = 0
			})
			Object.keys(this.Homo).forEach(function(key, index) {
				self.Homo[key].bet = 0
			})
		},
		async save() {
			let totalPay =
				parseFloat(this.totalPaySilang) + parseFloat(this.totalPayHomo)
			const input = {
				betSilang: this.Silang.filter(value => value.bet > 0),
				betHomo: this.Homo.filter(value => value.bet > 0),
				betTotalPay: totalPay,
				market: this.$route.params.marketcode,
				ip: this.ipPublicClient,
			}
			if (totalPay < this.user.reg_remain_balance && totalPay > 0) {
				const data = await this.$axios.$post(
					'member/dobetgamesilang',
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
