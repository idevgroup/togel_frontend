<template>
    <div>
        <market-head-active></market-head-active>
        <div v-if="isSiteLock">
            <p>
               <span> Odd Min Bet: {{ gameSettingGanjil.min_bet |currency(setting.general.symbol)}} | Even Min Bet: {{ gameSettingGenap.min_bet |currency(setting.general.symbol)}} | Large Min Bet: {{ gameSettingBesar.min_bet |currency(setting.general.symbol)}} | Small Min Bet: {{ gameSettingKecil.min_bet |currency(setting.general.symbol)}} </span>
               <span> Odd Max Bet: {{ gameSettingGanjil.max_bet |currency(setting.general.symbol)}} | Even Max Bet: {{ gameSettingGenap.max_bet |currency(setting.general.symbol)}} | Large Max Bet: {{ gameSettingBesar.max_bet |currency(setting.general.symbol)}} | Small Max Bet: {{ gameSettingKecil.max_bet |currency(setting.general.symbol)}} </span>
               <span> Odd Bet Modulus: {{ gameSettingGanjil.bet_mod |currency(setting.general.symbol)}} | Even Bet Modulus: {{ gameSettingGenap.bet_mod |currency(setting.general.symbol)}} | Large Bet Modulus: {{ gameSettingBesar.bet_mod |currency(setting.general.symbol)}} | Small Bet Modulus: {{ gameSettingKecil.bet_mod |currency(setting.general.symbol)}} </span>
               <span> Odd Bet Discs: {{ gameSettingGanjil.discount }} % | Even Bet Discs: {{ gameSettingGenap.discount}} % | Large Bet Discs: {{ gameSettingBesar.discount }} % | Small Bet Discs: {{ gameSettingKecil.discount }} % </span>
               <span> Odd Win: {{ (gameSettingGanjil.menang === 1)?100:gameSettingGanjil.menang }}% | Even Win: {{ gameSettingGenap.menang ===1?100:gameSettingGenap.menang }} % | Large Win: {{ gameSettingBesar.menang === 1?100:gameSettingBesar.menang }} % | Small Win: {{ gameSettingKecil.menang === 1?100:gameSettingKecil.menang  }} % </span>
 
            </p>
              <table class="table table-bordered game5050">
                <thead>
                    <tr>
                        <th colspan="9" class="text-center">Odd / Even</th>
                    </tr>
                    <tr>
                        <th>
                            #
                        </th>
                        <th width="160">
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
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(item,index) in OddEvent">
                        <tr :key="index">
                            <td>{{ index+1 }}</td>
                            <td>
                                <b-form-radio-group
                                    v-model="item.Selected"
                                    :options="item.guess"
                                    :name="`oddeven`+index">
                                </b-form-radio-group>
                            </td>
                            <td width="15">{{ gameSettingGanjil.kei }}%</td>
                            <td width="15">{{ gameSettingGenap.kei }}%</td>
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
                                    @blur="checkAmount(index,item,OddEvent)">
                                </vue-numeric>
                            </td>
                            <td class="text-right">
                                {{ totalKei(item) | currency(setting.general.symbol)}}
                            </td>
                            <td class="text-right">
                                {{ totalPay(item) | currency(setting.general.symbol)}}
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
        <div v-else>
            <site-lock-info />
        </div>
    </div>
</template>

<script>
import MarketHeadActive from '~/components/gamemarket/MarketHeadActive'
import SiteLockInfo from '~/components/gamemarket/SiteLockInfo'
import VueNumeric from 'vue-numeric'
import Swal from 'sweetalert2'
export default {
    layout: 'gamemarket',
    name: 'GameBesarForm',
    components: {
        MarketHeadActive,
        SiteLockInfo,
        VueNumeric,
    },
    data() {
        return {
            OddEvent: [
                {
                    Selected: 1,
                    guess: [
                        {
                            text: 'Odd',
                            value: '1',
                        },
                        {
                            text: 'Even',
                            value: '2',
                        },
                    ],

                    bet: 0,
                    discount: 0,
                    kei: 0,
                    pay: 0,
                    is_not: false,
                },
            ],
            SmallLarge: [
                {
                    Selected: 1,
                    key: 5,
                    position: 'US',
                    guess: [
                        {
                            text: 'Big',
                            value: '1',
                        },
                        {
                            text: 'Small',
                            value: '2',
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
            gameSettingGanjil: [],
            gameSettingGenap: [],
            gameSettingKecil: [],
            gameSettingBesar: [],
        }
    },
    computed: {
        totalPayOddEven: function() {
            return this.OddEvent.reduce(function(a, c) {
                return a + Number(c.pay || 0)
            }, 0)
        },
        totalPayBigSmall: function() {
            return this.SmallLarge.reduce(function(a, c) {
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
    },
    methods: {
        totalKei(item) {
            let total = 0
            if (item.bet !== 0) {
                let discount =
                    (parseFloat(item.bet) *
                        parseFloat(this.marketGameSetting.discount)) /
                    100
                let discountKei =
                    ((parseFloat(item.bet) - parseFloat(discount)) *
                        parseFloat(this.marketGameSetting.kei)) /
                    100
                total = discount + discountKei
                item.discount = discount
                item.kei = discountKei
            }

            return total
        },
        totalPay(item) {
            let total = 0
            let discount =
                (parseFloat(item.bet) *
                    parseFloat(this.marketGameSetting.discount)) /
                100
            let discountKei =
                ((parseFloat(item.bet) - parseFloat(discount)) *
                    parseFloat(this.marketGameSetting.kei)) /
                100
            total =
                parseFloat(item.bet) -
                (parseFloat(discount) + parseFloat(discountKei))
            return (item.pay = total)
        },

        async getMarketGameSetting() {
            const input = {
                game: ['Ganjil', 'Genap', 'Kecil', 'Besar'],
                market: this.$route.params.marketcode,
            }
            const data = await this.$axios.$post(
                '/member/getmarketgamesetting',
                input,
            )
            let self = this
            data.forEach(setting => {
                if (setting.game_name === 'Ganjil') {
                    self.gameSettingGanjil = setting
                } else if (setting.game_name === 'Genap') {
                    self.gameSettingGenap = setting
                } else if (setting.game_name === 'Kecil') {
                    self.gameSettingKecil = setting
                } else if (setting.game_name === 'Besar') {
                    self.gameSettingBesar = setting
                }
            })
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
                        'info',
                    )
                }
            }
        },
        async save() {
            let totalPay =
                parseFloat(this.totalPayOddEven) +
                parseFloat(this.totalPayBigSmall)
            const input = {
                betOddEven: this.OddEvent,
                betSmallLarge: this.SmallLarge,
                betTotalPay: totalPay,
                market: this.$route.params.marketcode,
            }
            if (totalPay < this.user.reg_remain_balance && totalPay > 0) {
                const data = await this.$axios.$post(
                    'member/dobetgame50',
                    input,
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
                    'info',
                )
            }
        },
        showConfirm() {
            let totalPay =
                parseFloat(this.totalPayOddEven) +
                parseFloat(this.totalPayBigSmall)
            if (totalPay < this.user.reg_remain_balance && totalPay > 0) {
                this.$modal.show('preview-bet')
            } else {
                Swal.fire(
                    'Invalide Amount',
                    "Sorry, you don't have enough balance for this operation or Not be Zero",
                    'info',
                )
            }
        },
        reset() {
            let self = this
            Object.keys(this.OddEvent).forEach(function(key, index) {
                self.OddEvent[key].Selected = 1
                self.OddEvent[key].bet = 0
            })
            Object.keys(this.SmallLarge).forEach(function(key, index) {
                self.SmallLarge[key].Selected = 1
                self.SmallLarge[key].bet = 0
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
