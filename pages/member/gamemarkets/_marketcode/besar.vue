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
            <table class="table table-bordered mt-5">
                <thead>
                    <tr>
                        <th colspan="9" class="text-center">Odd / Even</th>
                    </tr>
                    <tr>
                        <th width="20">
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
                        <th width="30"></th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(item,index) in OddEven">
                        <tr :key="index">
                            <td>{{ index+1 }}</td>
                            <td>
                                <b-form-radio-group
                                    v-model.number="item.Selected"
                                    :options="item.guess"
                                    :disabled="item.is_not"
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
                                    :name="`oddevenbetprice`+index"
                                    :data-vv-name="`oddevenbetprice`+index"
                                    :disabled="item.is_not"
                                    :state="!veeErrors.has('oddevenbetprice'+index)"
                                    class="form-control form-control-sm"
                                    separator=","
                                    decimal-separator="."
                                    data-vv-as="bet price"
                                    @blur="checkAmountOddEven(index,item,OddEven)">
                                </vue-numeric>
                            </td>
                            <td class="text-right">
                                {{ totalKeiOddEven(item) | currency(setting.general.symbol)}}
                            </td>
                            <td class="text-right">
                                {{ totalPaySubOddEven(item) | currency(setting.general.symbol)}}
                            </td>
                            <td>
                                <span v-if="item.is_not !== true">
                                    <button class="btn btn-sm  mr-2 btn-success" @click="isNotBet(index,item,OddEven)"><i class="fa fa-check-square-o" aria-hidden="true"></i></button>
                                </span>
                                <span v-else>
                                    <button class="btn btn-sm  mr-2  btn-warning" @click="isNotBet(index,item,OddEven)"><i class="fa fa-minus-circle" aria-hidden="true"></i></button>
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
                        @click="addRowTableOddEven">Add Row</b-button>
                </b-col>
            </b-row>
            <table class="table table-bordered mt-5">
                <thead>
                    <tr>
                        <th colspan="9" class="text-center">Large / Small</th>
                    </tr>
                    <tr>
                        <th width="20">
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
                        <th width="30"></th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(item,index) in SmallLarge">
                        <tr :key="index">
                            <td>{{ index+1 }}</td>
                            <td>
                                <b-form-radio-group
                                    v-model.number="item.Selected"
                                    :options="item.guess"
                                    :disabled="item.is_not"
                                    :name="`bigsmall`+index">
                                </b-form-radio-group>
                            </td>
                            <td width="15">{{ gameSettingBesar.kei }}%</td>
                            <td width="15">{{ gameSettingKecil.kei }}%</td>
                            <td>
                                <vue-numeric
                                    v-validate="{max_value:marketGameSetting.max_bet}"
                                    :currency="setting.general.symbol"
                                    v-model.number="item.bet"
                                    :precision="2"
                                    :name="`bigsmallbetprice`+index"
                                    :data-vv-name="`bigsmallbetprice`+index"
                                    :disabled="item.is_not"
                                    :state="!veeErrors.has('bigsmallbetprice'+index)"
                                    class="form-control form-control-sm"
                                    separator=","
                                    decimal-separator="."
                                    data-vv-as="bet price"
                                    @blur="checkAmountSmallLarge(index,item,SmallLarge)">
                                </vue-numeric>
                            </td>
                            <td class="text-right">
                                {{ totalKeiLargeSmall(item) | currency(setting.general.symbol)}}
                            </td>
                            <td class="text-right">
                                {{ totalPaySubLargeSmall(item) | currency(setting.general.symbol)}}
                            </td>
                            <td>
                                <span v-if="item.is_not !== true">
                                    <button class="btn btn-sm  mr-2 btn-success" @click="isNotBet(index,item,SmallLarge)"><i class="fa fa-check-square-o" aria-hidden="true"></i></button>
                                </span>
                                <span v-else>
                                    <button class="btn btn-sm  mr-2  btn-warning" @click="isNotBet(index,item,SmallLarge)"><i class="fa fa-minus-circle" aria-hidden="true"></i></button>
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
                        @click="addRowTableLargeSmall">Add Row</b-button>
                </b-col>
            </b-row>

              <b-row mt-5>
                <b-col md="2">
                    <b-button variant="success" @click="showConfirm">Save</b-button>
                </b-col>
                <b-col md="3">
                    <b-button variant="outline-primary" @click="reset">Reset</b-button>
                </b-col>
                {{ getIpClient }}
            </b-row>
            <modal
                :scrollable="true"
                :classes="['v--modal', 'vue-dialog']"
                :adaptive="true"
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
                        Payment: <span class="text-info">{{ parseFloat(totalPayOddEven) +
                parseFloat(totalPayBigSmall)| currency(setting.general.symbol)}}</span>
                    </h5>
      
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
            OddEven: [
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
            let total = 0
            this.OddEven.forEach(item => {
                if (item.is_not === false) total += item.pay
            })
            return total
        },
        totalPayBigSmall: function() {
            let total = 0
            this.SmallLarge.forEach(item => {
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
    },
    methods: {
        totalKeiOddEven(item) {
            let total = 0
            let discount = 0
            let discountKei = 0
            let kei = 0
            let betdiscount = 0

            if (item.Selected === 1) {
                kei = this.gameSettingGanjil.kei
                betdiscount = this.gameSettingGanjil.discount
            } else if (item.Selected === 2) {
                kei = this.gameSettingGenap.kei
                betdiscount = this.gameSettingGenap.discount
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
        totalKeiLargeSmall(item) {
            let total = 0
            let discount = 0
            let discountKei = 0
            let kei = 0
            let betdiscount = 0

            if (item.Selected === 1) {
                kei = this.gameSettingBesar.kei
                betdiscount = this.gameSettingBesar.discount
            } else if (item.Selected === 2) {
                kei = this.gameSettingKecil.kei
                betdiscount = this.gameSettingKecil.discount
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

        totalPaySubOddEven(item) {
            let kei = 0
            let betdiscount = 0
            if (item.Selected === 1) {
                kei = this.gameSettingGanjil.kei
                betdiscount = this.gameSettingGanjil.discount
            } else if (item.Selected === 2) {
                kei = this.gameSettingGenap.kei
                betdiscount = this.gameSettingGenap.discount
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
        totalPaySubLargeSmall(item) {
            let kei = 0
            let betdiscount = 0
            if (item.Selected === 1) {
                kei = this.gameSettingBesar.kei
                betdiscount = this.gameSettingBesar.discount
            } else if (item.Selected === 2) {
                kei = this.gameSettingKecil.kei
                betdiscount = this.gameSettingKecil.discount
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
        checkAmountSmallLarge(index, item, collect) {
            let limitMax = 0
            let limitMin = 0
            let modulus = 0
            if (item.Selected === 1) {
                limitMax = this.gameSettingBesar.max_bet
                limitMin = this.gameSettingBesar.min_bet
                modulus = this.gameSettingBesar.bet_mod
            } else if (item.Selected === 2) {
                limitMax = this.gameSettingKecil.max_bet
                limitMin = this.gameSettingKecil.min_bet
                modulus = this.gameSettingKecil.bet_mod
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
                        'info',
                    )
                }
            }
        },
        checkAmountOddEven(index, item, collect) {
            let limitMax = 0
            let limitMin = 0
            let modulus = 0
            console.log(item.Selected)
            if (item.Selected === 1) {
                limitMax = this.gameSettingGanjil.max_bet
                limitMin = this.gameSettingGanjil.min_bet
                modulus = this.gameSettingGanjil.bet_mod
            } else if (item.Selected === 2) {
                limitMax = this.gameSettingGenap.max_bet
                limitMin = this.gameSettingGenap.min_bet
                modulus = this.gameSettingGenap.bet_mod
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
                        'info',
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
        addRowTableOddEven() {
            this.OddEven.push({
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
            })
        },
        addRowTableLargeSmall() {
            this.SmallLarge.push({
                Selected: 1,
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
            })
        },

        async save() {
            let totalPay =
                parseFloat(this.totalPayOddEven) +
                parseFloat(this.totalPayBigSmall)
            const input = {
                betOddEven: this.OddEven.filter(
                    value => value.bet !== 0 && value.is_not !== true,
                ),
                betSmallLarge: this.SmallLarge.filter(
                    value => value.bet !== 0 && value.is_not !== true,
                ),
                betTotalPay: totalPay,
                market: this.$route.params.marketcode,
            }
            if (totalPay < this.user.reg_remain_balance && totalPay > 0) {
                const data = await this.$axios.$post(
                    'member/dobetgamebesar',
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
            this.OddEven = [
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
            ]
            this.SmallLarge = [
                {
                    Selected: 1,
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
