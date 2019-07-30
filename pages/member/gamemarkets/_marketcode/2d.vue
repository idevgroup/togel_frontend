<template>
    <div>

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
                            v-model="item.number2d"
                            v-validate="{ required: true,is_not:0,max:2,max_value:99, min:2 }"
                            :name="`number`+index"
                            :data-vv-name="`number`+index"
                            data-vv-as="bet number"> </b-form-input>
                        <span class="form-text text-danger" v-show="veeErrors.has('number'+index)">{{ veeErrors.first('number'+index) }}</span>

                    </td>
                    <td>
                        <vue-numeric
                            class="form-control form-control-sm"
                            :currency="setting.general.symbol"
                            separator=","
                            v-model="item.betvalue"
                            v-bind:precision="2"
                            decimal-separator="."
                            v-validate="{ required: true}"
                            :min="marketGameSetting.min_bet"
                            :max="marketGameSetting.max_bet"
                            :name="`betprice`+index"
                            :data-vv-name="`betprice`+index"
                            data-vv-as="bet price"></vue-numeric>
                        <span class="form-text text-danger" v-show="veeErrors.has('betprice'+index)">{{ veeErrors.first('betprice'+index) }}</span>
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
                <tr>
                    <td colspan="6">
                        <div class="text-right" style="padding-right:55px">
                            <strong> Total Pay: {{ subTotalPay |currency(setting.general.symbol, 2, { thousandsSeparator: ',',spaceBetweenAmountAndSymbol: true }) }}</strong>
                        </div>
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
            var total = this.items.reduce(function (value, item) {
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
            var i = 0;
            for (i = 0; i < 20; i++) {
                this.items[i] = {
                    number2d: '',
                    betvalue: 0,
                    discount: 0,
                    betpay: 0,
                    is_not: false
                }
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

    }
}
</script>

<style>

</style>
