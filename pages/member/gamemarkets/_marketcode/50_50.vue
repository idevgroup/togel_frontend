<template>
    <div>
      
        <div v-if="isSiteLock">
            <p class="p-span-white">
                <span> Min Bet: {{ marketGameSetting.min_bet |currency(setting.general.symbol)}}</span>
                <span> Max Bet: {{ marketGameSetting.max_bet |currency(setting.general.symbol)}} </span>
                <span> Discount: {{ marketGameSetting.discount }}%</span>
                <span> Bet Modulus: {{ marketGameSetting.bet_mod |currency(setting.general.symbol)}}</span>
                <span> Win: {{ (marketGameSetting.menang ===1)?100:marketGameSetting.menang }}%</span>
            </p>
            <table class="table table-bordered game5050 tbl-bet-list">
                <thead class="thead-light">
                    <tr>
                        <th colspan="9" class="text-center">Odd / Even</th>
                    </tr>
                    <tr>
                        <th>
                            #
                        </th>
                        <th width="50">
                            Position
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
                    <template v-for="(item,index) in OddEven">
                        <tr :key="item.key">
                            <td>{{ index+1 }}</td>
                            <td>{{ item.position }}</td>
                            <td>
                                <b-form-radio-group
                                    v-model="item.Selected"
                                    :options="item.guess"
                                    :name="`oddeven`+item.key">
                                </b-form-radio-group>
                            </td>
                            <td width="15">{{ marketGameSetting.kei }}%</td>
                            <td width="15">{{ marketGameSetting.kei }}%</td>
                            <td>
                                <vue-numeric
                                    v-validate="{max_value:marketGameSetting.max_bet}"
                                    :currency="setting.general.symbol"
                                    v-model.number="item.bet"
                                    :precision="2"
                                    :name="`betprice`+item.key"
                                    :data-vv-name="`betprice`+item.key"
                                    :state="!veeErrors.has('betprice'+item.key)"
                                    class="form-control form-control-sm"
                                    separator=","
                                    decimal-separator="."
                                    data-vv-as="bet price"
                                    @blur="checkAmount(index,item,OddEven)">
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
            <table class="table table-bordered game5050 tbl-bet-list">
                <thead class="thead-light">
                    <tr>
                        <th colspan="8" class="text-center">Large / Small</th>
                    </tr>
                    <tr>
                        <th>
                            #
                        </th>
                        <th width="50">
                            Position
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
                    <template v-for="(item,index) in SmallLarge">
                        <tr :key="item.key">
                            <td>{{ index+1 }}</td>
                            <td>{{ item.position }}</td>
                            <td>
                                <b-form-radio-group
                                    v-model="item.Selected"
                                    :options="item.guess"
                                    :name="`oddeven`+item.key">
                                </b-form-radio-group>
                            </td>
                            <td width="15">{{ marketGameSetting.kei }}%</td>
                            <td width="15">{{ marketGameSetting.kei }}%</td>
                            <td>
                                <vue-numeric
                                    v-validate="{max_value:marketGameSetting.max_bet}"
                                    :currency="setting.general.symbol"
                                    v-model.number="item.bet"
                                    :precision="2"
                                    :name="`betprice`+item.key"
                                    :data-vv-name="`betprice`+item.key"
                                    :state="!veeErrors.has('betprice'+item.key)"
                                    class="form-control form-control-sm"
                                    separator=","
                                    decimal-separator="."
                                    data-vv-as="bet price"
                                    @blur="checkAmount(index,item,SmallLarge)"></vue-numeric>
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

import SiteLockInfo from '~/components/gamemarket/SiteLockInfo'
import VueNumeric from 'vue-numeric'
import Swal from 'sweetalert2'
export default {
    layout: ({ isMobile }) => (isMobile ? 'mobile' : 'gamemarket'),
    name: 'Game5050Form',
    components: {
        SiteLockInfo,
        VueNumeric,
    },
    data() {
        return {
            OddEven: [{
                    Selected: 1,
                    key: 1,
                    position: 'US',
                    guess: [{
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
                },
                {
                    Selected: 1,
                    key: 2,
                    position: 'Kop',
                    guess: [{
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
                },
                {
                    Selected: 1,
                    key: 3,
                    position: 'Head',
                    guess: [{
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
                },
                {
                    Selected: 1,
                    key: 4,
                    position: 'Tail',
                    guess: [{
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
                },
            ],
            SmallLarge: [{
                    Selected: 1,
                    key: 5,
                    position: 'US',
                    guess: [{
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
                },
                {
                    Selected: 1,
                    key: 6,
                    position: 'Kop',
                    guess: [{
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
                },
                {
                    Selected: 1,
                    key: 7,
                    position: 'Head',
                    guess: [{
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
                },
                {
                    Selected: 1,
                    key: 8,
                    position: 'Tail',
                    guess: [{
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
                },
            ],
            marketGameSetting: [],
        }
    },
    computed: {
        totalPayOddEven: function () {
            return this.OddEven.reduce(function (a, c) {
                return a + Number(c.pay || 0)
            }, 0)
        },
        totalPayBigSmall: function () {
            return this.SmallLarge.reduce(function (a, c) {
                return a + Number(c.pay || 0)
            }, 0)
        },
        buttonStyle: function () {
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
                game: '50-50',
                market: this.$route.params.marketcode,
            }
            const data = await this.$axios.$post(
                '/member/getmarketgamesetting',
                input,
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
                betOddEven: this.OddEven,
                betSmallLarge: this.SmallLarge,
                betTotalPay: totalPay,
                market: this.$route.params.marketcode,
                ip: this.ipPublicClient,
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
            Object.keys(this.OddEven).forEach(function (key, index) {
                self.OddEven[key].Selected = 1
                self.OddEven[key].bet = 0
            })
            Object.keys(this.SmallLarge).forEach(function (key, index) {
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
