<template>
    <div>
        <div v-if="isSiteLock">
            <p class="p-span-white">
                <span> Tengah Min Bet: {{ gameSettingTengah.min_bet |currency(setting.general.symbol)}} | Tepi Min Bet: {{ gameSettingTepi.min_bet |currency(setting.general.symbol)}}  </span>
                <span> Tengah Max Bet: {{ gameSettingTengah.max_bet |currency(setting.general.symbol)}} | Tepi Max Bet: {{ gameSettingTepi.max_bet |currency(setting.general.symbol)}}  </span>
                <span> Tengah Bet Modulus: {{ gameSettingTengah.bet_mod |currency(setting.general.symbol)}} | Tepi Bet Modulus: {{ gameSettingTepi.bet_mod |currency(setting.general.symbol)}} </span>
                <span> Tengah Bet Discs: {{ gameSettingTengah.discount }} % | Tepi Bet Discs: {{ gameSettingTepi.discount}} % </span>
                <span> Tengah Win: {{ (gameSettingTengah.menang === 1)?100:gameSettingTengah.menang }}% | Tepi Win: {{ gameSettingTepi.menang ===1?100:gameSettingTepi.menang }} % </span>

            </p>
            <table class="table table-bordered mt-5 tbl-bet-list">
                <thead class="thead-light">
                    <tr>
                        <th width="20">
                            #
                        </th>
                        <th width="180">
                            Guess
                        </th>
                        <th colspan="2">
                            Kei(%)
                        </th>
                        <th width="135">
                            Bet Price
                        </th>
                        <th>
                            Kei
                        </th>
                        <th>
                            Pay
                        </th>
                        <th width="30"></th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(item,index) in TepiTengah">
                        <tr :key="index">
                            <td>{{ index+1 }}</td>
                            <td>
                                <b-form-radio-group
                                    v-model.number="item.Selected"
                                    :options="item.guess"
                                    :disabled="item.is_not"
                                    :name="`guesss`+index">
                                </b-form-radio-group>
                            </td>
                            <td width="12">{{ gameSettingTepi.kei }}%</td>
                            <td width="12">{{ gameSettingTengah.kei }}%</td>
                            
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
                                    @blur="checkAmountTepiTengah(index,item,TepiTengah)">
                                </vue-numeric>
                            </td>
                            <td class="text-right">
                                {{ totalKeiTepiTengah(item) | currency(setting.general.symbol)}}
                            </td>
                            <td class="text-right">
                                {{ totalPaySubTepiTengah(item) | currency(setting.general.symbol)}}
                            </td>
                            <td>
                                <span v-if="item.is_not !== true">
                                    <button class="btn btn-sm  mr-2 btn-success" @click="isNotBet(index,item,TepiTengah)"><i class="fa fa-check-square-o" aria-hidden="true"></i></button>
                                </span>
                                <span v-else>
                                    <button class="btn btn-sm  mr-2  btn-warning" @click="isNotBet(index,item,TepiTengah)"><i class="fa fa-minus-circle" aria-hidden="true"></i></button>
                                </span>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
            <b-row>
                <b-col>
                    <b-button
                        variant="danger"
                        class="pull-right"
                        @click="addRowTableTepi">Add Row</b-button>
                </b-col>
            </b-row>

              <b-row mt-5>
                <b-col md="2">
                    <b-button variant="success" @click="showConfirm">Save</b-button>
                </b-col>
                <b-col md="3">
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
                        Payment: <span class="text-info">{{ parseFloat(totalPayTepi) | currency(setting.general.symbol)}}</span>
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
	name: 'GameTepiForm',
	components: {
		SiteLockInfo,
		VueNumeric,
	},
	data() {
		return {
			TepiTengah: [
				{
					Selected: 1,
					guess: [
						{
							text: 'Tepi',
							value: 1,
						},
						{
							text: 'Tengah',
							value: 2,
						},
					],

					bet: 0,
					discount: 0,
					kei: 0,
					pay: 0,
					is_not: false,
				},
			],
			marketGameSetting: [],
			gameSettingTengah: [],
			gameSettingTepi: [],
		}
	},
	computed: {
		totalPayTepi: function() {
			let total = 0
			this.TepiTengah.forEach(item => {
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
	},
	methods: {
		totalKeiTepiTengah(item) {
			let total = 0
			let discount = 0
			let discountKei = 0
			let kei = 0
			let betdiscount = 0

			if (item.Selected === 2) {
				kei = this.gameSettingTengah.kei
				betdiscount = this.gameSettingTengah.discount
			} else if (item.Selected === 1) {
				kei = this.gameSettingTepi.kei
				betdiscount = this.gameSettingTepi.discount
			}

			if (item.bet !== 0) {
				discount =
					(parseFloat(item.bet) * parseFloat(betdiscount)) / 100
				discountKei =
					((parseFloat(item.bet) - parseFloat(discount)) *
						parseFloat(kei)) /
					100
				total = discount + discountKei
				item.discount = discount
				item.kei = discountKei
			}

			return total
		},

		totalPaySubTepiTengah(item) {
			let kei = 0
			let betdiscount = 0
			if (item.Selected === 2) {
				kei = this.gameSettingTengah.kei
				betdiscount = this.gameSettingTengah.discount
			} else if (item.Selected === 1) {
				kei = this.gameSettingTepi.kei
				betdiscount = this.gameSettingTepi.discount
			}
			let total = 0
			let discount =
				(parseFloat(item.bet) * parseFloat(betdiscount)) / 100
			let discountKei =
				((parseFloat(item.bet) - parseFloat(discount)) *
					parseFloat(kei)) /
				100
			total =
				parseFloat(item.bet) -
				(parseFloat(discount) + parseFloat(discountKei))
			return (item.pay = total)
		},

		async getMarketGameSetting() {
			const input = {
				game: ['Tepi', 'Tengah'],
				market: this.$route.params.marketcode,
			}
			const data = await this.$axios.$post(
				'/member/getmarketgamesetting',
				input
			)
			let self = this
			data.forEach(setting => {
				if (setting.game_name === 'Tengah') {
					self.gameSettingTengah = setting
				} else if (setting.game_name === 'Tepi') {
					self.gameSettingTepi = setting
				}
			})
		},
		checkAmountTepiTengah(index, item, collect) {
			let limitMax = 0
			let limitMin = 0
			let modulus = 0
			if (item.Selected === 2) {
				limitMax = this.gameSettingTengah.max_bet
				limitMin = this.gameSettingTengah.min_bet
				modulus = this.gameSettingTengah.bet_mod
			} else if (item.Selected === 1) {
				limitMax = this.gameSettingTepi.max_bet
				limitMin = this.gameSettingTepi.min_bet
				modulus = this.gameSettingTepi.bet_mod
			}

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
			if (item.is_not === true) {
				item.is_not = false
			} else {
				item.is_not = true
			}

			collect.splice(index, 1, item)
		},
		addRowTableTepi() {
			this.TepiTengah.push({
				Selected: 1,
				guess: [
					{
						text: 'Tepi',
						value: 1,
					},
					{
						text: 'Tengah',
						value: 2,
					},
				],

				bet: 0,
				discount: 0,
				kei: 0,
				pay: 0,
				is_not: false,
			})
		},
		async save() {
			let totalPay = parseFloat(this.totalPayTepi)
			const input = {
				betTepiTangah: this.TepiTengah.filter(
					value => value.bet !== 0 && value.is_not !== true
				),

				betTotalPay: totalPay,
				market: this.$route.params.marketcode,
				ip: this.ipPublicClient,
			}
			if (totalPay < this.user.reg_remain_balance && totalPay > 0) {
				const data = await this.$axios.$post(
					'member/dobetgametepitangah',
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
		showConfirm() {
			let totalPay = parseFloat(this.totalPayTepi)
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
			this.TepiTengah = [
				{
					Selected: 1,
					guess: [
						{
							text: 'Tepi',
							value: 1,
						},
						{
							text: 'Tengah',
							value: 2,
						},
					],

					bet: 0,
					discount: 0,
					kei: 0,
					pay: 0,
					is_not: false,
				},
			]
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
