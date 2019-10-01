<template>
    <div>
        <div v-if="isSiteLock">
             <p class="p-span-white">
            <span> Min Bet: {{ marketGameSetting.min_bet |currency(setting.general.symbol )}}</span>
            <span> Max Bet: {{ marketGameSetting.max_bet |currency(setting.general.symbol )}} </span>
            <span> Discount: {{ marketGameSetting.discount }}%</span>
            <span> Bet Modulus: {{ marketGameSetting.bet_mod |currency(setting.general.symbol )}}</span>
            <span> Win : {{ marketGameSetting.menang * 100 }} %</span>
            <span>Double Win: x{{ marketGameSetting.menang_dbl  }} | Triple Win: x{{ marketGameSetting.menang_triple  }} | Quadruple wins: x{{ marketGameSetting.menang_quadruple  }} </span>
        </p>
             <table class="table table-bordered mt-5 tbl-bet-list">
                <thead class="thead-light">
                    <tr>
                        <th colspan="9" class="text-center">Colok Bebas</th>
                    </tr>
                    <tr>
                        <th width="20">
                            #
                        </th>
                        <th width="160">
                            Guess
                        </th>
                        <th width="165">
                            Bet Price
                        </th>
                        <th>
                            Discount
                        </th>
                        <th>
                            Pay
                        </th>

                    </tr>
                </thead>
                <tbody>
                    <template v-for="(item,index) in items">
                        <tr :key="index">
                            <td>{{ index+1 }}</td>
                            <td>{{ item.key }}</td>
                            <td>
                                <vue-numeric
                                    v-validate="{max_value:marketGameSetting.max_bet}"
                                    :currency="setting.general.symbol"
                                    v-model.number="item.bet"
                                    :precision="2"
                                    :name="`betprice`+index"
                                    :data-vv-name="`betprice`+index"
                                    :state="!veeErrors.has('betprice'+index)"
                                    class="form-control form-control-sm"
                                    separator=","
                                    decimal-separator="."
                                    data-vv-as="bet price"
                                    @blur="checkAmount(index,item)"
                                   >
                                </vue-numeric>
                            </td>
                            <td class="text-right">
                              {{  subDiscount(item) | currency(setting.general.symbol) }}
                            </td>
                            <td class="text-right">
                               {{  subtotal(item) | currency(setting.general.symbol) }}
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
                        Payment: <span class="text-info">{{ totalPay | currency(setting.general.symbol) }}</span>
                    </h5>
                    <b-col>
                      <p class="text-center mt-3 " style="font-weight:bold">
                          Are you want to process this transaction !!!
                      </p> 
                    </b-col>      
                </div>

                <div class="vue-dialog-buttons">
                    <button :style="buttonStyle" class="vue-dialog-button text-bold" @click="save" >
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
	name: 'GameColokBabasForm',
	components: {
		VueNumeric,
		SiteLockInfo,
	},
	data() {
		return {
			items: [],
			marketGameSetting: [],
		}
	},
	computed: {
		totalPay: function() {
			return this.items.reduce(function(a, c) {
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
		this.addItems()
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
			item.pay = item.bet - item.discount
			return item.discount
		},
		addItems() {
			let i = 0
			for (i; i < 10; i++) {
				this.items.push({
					key: i,
					bet: 0,
					pay: 0,
					discount: 0,
				})
			}
		},
		async getMarketGameSetting() {
			const input = {
				game: 'Colok Bebas',
				market: this.$route.params.marketcode,
			}
			const data = await this.$axios.$post(
				'/member/getmarketgamesetting',
				input
			)
			this.marketGameSetting = data
		},
		reset() {
			let self = this
			Object.keys(this.items).forEach(function(key, index) {
				self.items[key].bet = 0
			})
		},
		checkAmount(index, item) {
			let limitMax = this.marketGameSetting.max_bet
			let limitMin = this.marketGameSetting.min_bet
			let modulus = this.marketGameSetting.bet_mod
			let value_mod = 0
			if (item.bet !== 0) {
				value_mod = parseFloat(item.bet) % parseFloat(modulus)

				if (
					limitMax < item.betvalue ||
					limitMin > item.betvalue ||
					value_mod !== 0
				) {
					item.bet = 0
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
		showConfirm() {
			if (
				this.totalPay < this.user.reg_remain_balance &&
				this.totalPay > 0
			) {
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
			let self = this
			const input = {
				betitem: self.items.filter(value => value.bet > 0),
				market: this.$route.params.marketcode,
				totalpay: this.totalPay,
				gamecode: 'Colok Bebas',
				ip: this.ipPublicClient,
			}
			// if(!this.$validator.validateAll()) return
			const data = await this.$axios.$post(
				'/member/dobetgamecolokbebas',
				input
			)
			// refresh user account to update balance
			this.$auth.fetchUser()
			Swal.fire(data.alert.title, data.alert.message, 'success')
			this.$modal.hide('preview-bet')
			this.$router.push({
				path: '/member/reports/' + this.$route.params.marketcode,
			})
		},
	},
}
</script>
<style scoped>
table th,
table td {
	text-align: center;
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