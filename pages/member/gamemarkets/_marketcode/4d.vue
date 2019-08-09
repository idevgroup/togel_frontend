<template>
    <div>
        <market-head-active ></market-head-active>
         <div v-if="isSiteLock">
        <p>
            <span> 4D Min Bet: {{ marketGameSetting.min_bet |currency(setting.general.symbol, 2, { thousandsSeparator: ',',spaceBetweenAmountAndSymbol: true })}}</span>
            <span> 4D Max Bet: {{ marketGameSetting.max_bet |currency(setting.general.symbol, 2, { thousandsSeparator: ',',spaceBetweenAmountAndSymbol: true })}} </span>
            <span> 4D Discount: {{ marketGameSetting.discount }}%</span>
            <span> 4D Bet Modulus: {{ marketGameSetting.bet_mod |currency(setting.general.symbol, 2, { thousandsSeparator: ',',spaceBetweenAmountAndSymbol: true })}}</span>
            <span> Win 4D: x {{ marketGameSetting.menang }}</span>
        </p>
        <table class="table table-bordered">
            <thead class="thead-light">
                <tr>
                    <th width="1">#</th>
                    <th width="20%">4 Digit Number</th>
                    <th width="25%">Bet</th>
                    <th width="20%">Discount</th>
                    <th>Pay</th>
                    <th width="45"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in items" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>
                        <b-form-input
                            v-validate="{is_not:0,max:4,max_value:9999, min:4 }"
                            v-model.trim="item.numberXd"
                            :name="`number`+index"
                            :data-vv-name="`number`+index"
                            :disabled="item.is_not"
                            :state="!veeErrors.has('number'+index)"
                            class="form-control form-control-sm"
                            type="text"
                            maxlength="4"
                            data-vv-as="bet number"
                            @blur="checkNumberBetLimit(index,item)"
                            @keypress="isNumberInt($event)">
                        </b-form-input>

                    </td>
                    <td>
                        <vue-numeric
                            v-validate="{max_value:marketGameSetting.max_bet}"
                            :currency="setting.general.symbol"
                            v-model.number="item.betvalue"
                            :precision="2"
                            :name="`betprice`+index"
                            :data-vv-name="`betprice`+index"
                            :disabled="item.is_not"
                            :state="!veeErrors.has('betprice'+index)"
                            class="form-control form-control-sm"
                            separator=","
                            decimal-separator="."
                            data-vv-as="bet price"
                            @blur="checkAmount(index,item)"></vue-numeric>
                    </td>
                    <td>
                        <div class="text-right">{{ subDiscount(item) | currency(setting.general.symbol, 2, { thousandsSeparator: ',',spaceBetweenAmountAndSymbol: true }) }}</div>
                    </td>
                    <td>
                        <div class="text-right">{{ subtotal(item) | currency(setting.general.symbol, 2, { thousandsSeparator: ',',spaceBetweenAmountAndSymbol: true }) }}</div>
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
                <tr style="display:none">
                    <td colspan="6">
                        <div class="text-right" style="padding-right:55px">
                            <strong> Total Pay: {{ subTotalPay |currency(setting.general.symbol, 2, { thousandsSeparator: ',',spaceBetweenAmountAndSymbol: true }) }}</strong>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="6">
                        <b-row>
                            <b-col cols="9">
                                <b-button
                                    :disabled="veeErrors.any()"
                                    variant="success"
                                    @click="ShowPreview">Preview Bet</b-button>
                                <b-button variant="outline-primary" @click="loadRowTable">Reset</b-button>
                            </b-col>
                            <b-col cols="3" class="text-right">
                                <b-button variant="warning" @click="addRowTable"><i class="fa fa-plus" aria-hidden="true"></i> Add</b-button>
                            </b-col>
                        </b-row>
                    </td>
                </tr>
            </tbody>
        </table>
        <modal
            :scrollable="true"
            name="preview-bet"
            height="auto"
            draggable=".modal-header"
            @before-open="beforeOpen"
            @before-close="beforeClose">

            <div class="modal-header">
                <h5 class="modal-title">Your Bet</h5>
                <button
                    type="button"
                    class="close"
                    aria-label="Close"
                    @click="$modal.hide('preview-bet')">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <h5>
                    Wallet: <span class="text-info">{{ user.reg_remain_balance| currency(setting.general.symbol, 2, { thousandsSeparator: ',',spaceBetweenAmountAndSymbol: true })}}</span>
                </h5>

                <table class="table table-bordered">
                    <thead class="thead-light">
                        <tr>
                            <th width="1">#</th>
                            <th width="15%">Number</th>
                            <th width="25%">Bet Price</th>
                            <th width="25%">Discount</th>
                            <th>Pay</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in previewbet" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>
                                {{ item.betnumber }}
                            </td>
                            <td>
                                <div class="text-right"> {{ item.betprice |currency(setting.general.symbol, 2, { thousandsSeparator: ',',spaceBetweenAmountAndSymbol: true })}}</div>
                            </td>
                            <td>
                                <div class="text-right"> {{ item.betdiscount |currency(setting.general.symbol, 2, { thousandsSeparator: ',',spaceBetweenAmountAndSymbol: true }) }}</div>
                            </td>
                            <td>
                                <div class="text-right"> {{ item.betpay  |currency(setting.general.symbol, 2, { thousandsSeparator: ',',spaceBetweenAmountAndSymbol: true })}}</div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4">
                                <div class="text-right"> <strong> Total Pay:</strong></div>
                            </td>
                            <td>

                                <div class="text-right">{{ totalBet | currency(setting.general.symbol, 2, { thousandsSeparator: ',',spaceBetweenAmountAndSymbol: true }) }}</div>

                            </td>
                        </tr>
                    </tbody>
                </table>
                <b-row>
                    <b-col>
                        <p v-if="user.reg_remain_balance < totalBet" class="text-danger">
                            Sorry, you don't have enough balance for this operation.
                        </p>
                    </b-col>
                </b-row>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="$modal.hide('preview-bet')">Close</button>
                <button
                    v-if=" previewbet.length > 0"
                    :disabled="user.reg_remain_balance < totalBet"
                    type="button"
                    class="btn btn-primary"
                    @click="saveBetGame">Save</button>
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
    name: 'Game4DForm',
    components: {
        VueNumeric,
        MarketHeadActive,
        SiteLockInfo,
    },
    data() {
        return {
            noIndex: null,
            originalData: null,
            getDicount: 0,
            marketGameSetting: [],
            items: [
                {
                    numberXd: '',
                    betvalue: 0,
                    discount: 0,
                    betpay: 0,
                    is_not: false,
                },
            ],
            previewbet: [],
            totalBet: 0,
        }
    },
    computed: {
        subTotalPay: function() {
            let self = this
            var total = self.items.reduce(function(value, item) {
                return value + item.betpay
            }, 0)
            return total
        },
    },
    created() {
        this.getMarketGameSetting()
        this.loadRowTable()
    },
    methods: {
        subtotal(item) {
            return item.numberXd !== ''
                ? item.betvalue -
                      (item.betvalue * this.marketGameSetting.discount) / 100
                : 0
        },
        subDiscount(item) {
            item.discount =
                item.numberXd !== ''
                    ? (item.betvalue * this.marketGameSetting.discount) / 100
                    : 0
            item.betpay =
                item.numberXd !== '' ? item.betvalue - item.discount : 0
            return item.numberXd !== '' ? item.discount : 0
        },

        async getMarketGameSetting() {
            const input = {
                game: '4D',
                market: this.$route.params.marketcode,
            }
            const data = await this.$axios.$post(
                '/member/getmarketgamesetting',
                input,
            )
            this.marketGameSetting = data
        },
        loadRowTable() {
            let self = this
            var i = 0
            self.items = []
            for (i = 0; i < 20; i++) {
                self.items[i] = {
                    numberXd: '',
                    betvalue: 0,
                    discount: 0,
                    betpay: 0,
                    is_not: false,
                }
            }

            this.veeErrors.items.clean
            //  this.veeFields = []
        },
        addRowTable() {
            var i = 0
            for (i = 0; i < 10; i++) {
                this.items.push({
                    numberXd: '',
                    betvalue: 0,
                    discount: 0,
                    betpay: 0,
                    is_not: false,
                })
            }
        },
        isNotBet(index, item) {
            item.is_not = true
            this.items.splice(index, 1, item)
        },
        isBet(index, item) {
            item.is_not = false
            this.items.splice(index, 1, item)
        },
        async saveBetGame() {
            let self = this
            const input = {
                betitem: self.previewbet,
                market: this.$route.params.marketcode,
                totalpay: self.totalBet,
                gamecode: '4D',
            }
            // if(!this.$validator.validateAll()) return

            const data = await this.$axios.$post('/member/dobetgame', input)
            // refresh user account to update balance
            Swal.fire(data.alert.title, data.alert.message, 'success')
            this.$auth.fetchUser()
            this.$modal.hide('preview-bet')
            this.$router.push({
                path: '/member/reports/' + this.$route.params.marketcode,
            })
        },
        ShowPreview() {
            let self = this
            let itemValueBet = []
            let totalPay = 0
            self.items.forEach(item => {
                if (item.numberXd !== '' && !item.is_not && item.betpay > 0) {
                    itemValueBet.push({
                        betnumber: item.numberXd,
                        betprice: item.betvalue,
                        betdiscount: item.discount,
                        betpay: item.betpay,
                    })
                    totalPay += item.betpay
                }
            })

            if (totalPay < this.user.reg_remain_balance) {
                this.$modal.show('preview-bet', {
                    itembet: itemValueBet,
                    totalPay,
                })
            } else {
                Swal.fire(
                    'Invalide Amount',
                    "Sorry, you don't have enough balance for this operation.",
                    'info',
                )
            }
        },
        beforeOpen(event) {
            this.totalBet = event.params.totalPay
            this.previewbet = event.params.itembet
        },
        beforeClose() {
            this.previewbet = []
        },
        checkAmount(index, item) {
            let limitMax = this.marketGameSetting.max_bet
            let limitMin = this.marketGameSetting.min_bet
            let modulus = this.marketGameSetting.bet_mod
            let value_mod = 0
            if (item.betvalue !== 0) {
                value_mod = parseFloat(item.betvalue) % parseFloat(modulus)

                if (
                    limitMax < item.betvalue ||
                    limitMin > item.betvalue ||
                    value_mod !== 0
                ) {
                    item.betvalue = 0
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
                        'info',
                    )
                }
            }
        },
        async checkNumberBetLimit(index, item) {
            const input = {
                numberbet: item.numberXd,
                marketcode: this.$route.params.marketcode,
                gamecode: '4D',
            }
            let filtered = this.items
            let count = 0
            if (this.marketGameSetting.bet_times !== 0) {
                if (item.numberXd !== '') {
                    filtered = this.items.filter(
                        m => m.numberXd === item.numberXd,
                    )
                    const result = await this.$axios.$post(
                        '/member/checklimitnumerberbet',
                        input,
                    )
                    count = parseInt(filtered.length) + parseInt(result.count)
                    console.log(count)
                    if (count > this.marketGameSetting.bet_times) {
                        item.numberXd = ''
                        this.items.splice(index, 1, item)
                        Swal.fire(
                            'Guess Limit Number',
                            'Your input value is limited, please try other number',
                            'info',
                        )
                    }
                }
            }
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
</style>
