<template>
    <div>
        <p>
            <span> 2D Min Bet: {{ marketGameSetting.min_bet |currency(setting.general.symbol, 2, { thousandsSeparator: ',',spaceBetweenAmountAndSymbol: true })}}</span>
            <span> 2D Max Bet: {{ marketGameSetting.max_bet |currency(setting.general.symbol, 2, { thousandsSeparator: ',',spaceBetweenAmountAndSymbol: true })}} </span>
            <span> 2D Discount: {{ marketGameSetting.discount }}%</span>
            <span> 2D Bet Modulus: {{ marketGameSetting.bet_mod |currency(setting.general.symbol, 2, { thousandsSeparator: ',',spaceBetweenAmountAndSymbol: true })}}</span>
            <span> Win 2D: x{{ marketGameSetting.menang }}</span>
        </p>

        <table class="table table-bordered">
            <thead class="thead-light">
                <tr>
                    <th width="1">#</th>
                    <th width="20%">2 Digit Number</th>
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
                            class="form-control form-control-sm"
                            type="text"
                            maxlength="2"
                            v-model.trim="item.number2d"
                            v-validate="{is_not:0,max:2,max_value:99, min:2 }"
                            :name="`number`+index"
                            :data-vv-name="`number`+index"
                            data-vv-as="bet number"
                            :disabled="item.is_not"
                            :state="!veeErrors.has('number'+index)">
                        </b-form-input>

                    </td>
                    <td>
                        <vue-numeric
                            class="form-control form-control-sm"
                            :currency="setting.general.symbol"
                            separator=","
                            v-model.trim="item.betvalue"
                            v-bind:precision="2"
                            decimal-separator="."
                            v-validate="{max_value:marketGameSetting.max_bet}"
                            :min="marketGameSetting.min_bet"
                            :max="marketGameSetting.max_bet"
                            :name="`betprice`+index"
                            :data-vv-name="`betprice`+index"
                            data-vv-as="bet price"
                            :disabled="item.is_not"
                            :state="!veeErrors.has('betprice'+index)"></vue-numeric>
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
                                    variant="success"
                                    :disabled="veeErrors.any()"
                                    @click="saveBetGame">Save</b-button>
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
    </div>
</template>

<script>
import {
    mapGetters
} from "vuex"
import VueNumeric from 'vue-numeric'
import Swal from 'sweetalert2';
export default {
    layout: "gamemarket",
    name: 'game2DForm',
    components: {
        VueNumeric
    },
    data() {
        return {
            noIndex: null,
            originalData: null,
            getDicount: 0,
            marketGameSetting: [],
            items: [{
                number2d: '',
                betvalue: 0,
                discount: 0,
                betpay: 0,
                is_not: false
            }]
        }
    },
    computed: {
        subTotalPay: function () {
            let self = this
            var total = self.items.reduce(function (value, item) {
                return value + item.betpay;
            }, 0)
            return total;
        },
        ...mapGetters({
            setting: "frontendconfig/setting"
        })

    },
    created() {
        this.getMarketGameSetting()
        this.loadRowTable()
    },
    methods: {
        subtotal(item) {
            return (item.number2d !== '') ? item.betvalue - (item.betvalue * this.marketGameSetting.discount / 100) : 0
        },
        subDiscount(item) {
            item.discount = (item.number2d !== '') ? (item.betvalue * this.marketGameSetting.discount) / 100 : 0
            item.betpay = (item.number2d !== '') ? item.betvalue - item.discount : 0
            return (item.number2d !== '') ? item.discount : 0
        },

        async getMarketGameSetting() {
            const input = {
                game: '2D',
                market: this.$route.params.marketcode
            }
            const data = await this.$axios.$post('/member/getmarketgamesetting', input)
            this.marketGameSetting = data
        },
        loadRowTable() {
            let self = this
            var i = 0;
            self.items = []
            for (i = 0; i < 20; i++) {
                self.items[i] = {
                    number2d: '',
                    betvalue: 0,
                    discount: 0,
                    betpay: 0,
                    is_not: false
                }

            }

            this.veeErrors.items.clean
          //  this.veeFields = []
        },
        addRowTable() {
            this.items.push({
                number2d: '',
                betvalue: 0,
                discount: 0,
                betpay: 0,
                is_not: false
            })
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
            let totalBet = this.subTotalPay
            let tempArray = self.items
            if (totalBet < this.user.reg_remain_balance) {
               let itemEl = []
                tempArray.forEach(element => {
                    var el = element
                    if(el.number2d !== "" || el.number2d !== null || el.is_not !== true ){
                         itemEl.push({number2d:el.number2d,betvalue:el.betvalue,discount:el.discount})   
                    }

                });    
                console.log(itemEl)
                const input = {
                    'betitem': self.items,
                    'market': this.$route.params.marketcode
                }
                //const data = await this.$axios.$post('/member/dobetgame', input)
                //console.log(data)
            }
        }

    }
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
