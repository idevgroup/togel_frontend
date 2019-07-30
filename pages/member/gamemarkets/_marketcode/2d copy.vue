<template>
    <div>
        <table class="table table-bordered">
            <thead class="thead-light">
                <tr>
                    <th width="1">#</th>
                    <th width="20%">2 Digit Number</th>
                    <th width="20%">Bet</th>
                    <th width="20%">Discount</th>
                    <th>Pay</th>
                    <th width="110"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in items" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>
                        <span v-if="editIndex !== index">{{ item.number2d }}</span>
                        <span v-if="editIndex === index">
                            <b-form-input
                                class="form-control form-control-sm"
                                type="text"
                                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                                maxlength="2"
                                min="0"
                                max="99"
                                v-model="item.number2d"
                                v-validate="{ required: true,is_not:0,max:2,max_value:99, min:2 }"
                                name="number"
                                data-vv-name="number"
                                data-vv-as="bet number"> </b-form-input>
                            <span class="form-text text-danger" v-show="veeErrors.has('number')">{{ veeErrors.first('number') }}</span>
                        </span>
                    </td>

                    <td class="position-relative">
                        <span v-if="editIndex !== index">{{ item.betvalue | money }}</span>
                        <span v-if="editIndex === index">
                            <vue-numeric
                                class="form-control form-control-sm"
                                :currency="setting.general.symbol"
                                separator=","
                                v-model="item.betvalue"
                                v-bind:precision="2"
                                decimal-separator="."
                                v-validate="{ required: true,is_not:0,max_value:marketGameSetting.max_bet,min_value:marketGameSetting.min_bet }"
                                :min="0"
                                :max="marketGameSetting.max_bet"
                                name="betprice"
                                data-vv-name="betprice"
                                data-vv-as="bet price"></vue-numeric>

                        </span>
                        <template v-show="veeErrors.has('betprice')">
                            <div class="invalid-tooltip">{{ veeErrors.first('betprice') }}</div>
                        </template>
                    </td>
                    <td>
                        <div class="text-right">{{ subDiscount(item) | money }}</div>
                    </td>
                    <td>
                        <div class="text-right">{{ subtotal(item) | money }}</div>
                    </td>
                    <td>
                        <span v-if="editIndex !== index">
                            <button @click="edit(item, index)" class="btn btn-sm mr-2 btn-primary"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                            <button @click="remove(item, index)" class="btn btn-sm  mr-2 btn-danger"><i class="fa fa-minus-square" aria-hidden="true"></i></button>
                        </span>
                        <span v-else>
                            <button class="btn btn-sm  mr-2  btn-warning" @click="cancel(item)"><i class="fa fa-minus-circle" aria-hidden="true"></i></button>
                            <button class="btn btn-sm  mr-2 btn-success" @click="save(item)"><i class="fa fa-check-square-o" aria-hidden="true"></i></button>
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="col-3 offset-9 text-right my-3">
            <button v-show="!editIndex" @click="add" class="btn btn-sm btn-secondary">Add item</button>
        </div>

        <div class="col-4 offset-8">

            <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">Sub total</span>
                </div>
                <input class="form-control form-control-sm text-right" disabled :value="this.allSubTotal | money">
            </div>
        </div>
        {{marketGameSetting}}
        <br />
        <hr />
        {{ items }}
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
    filters: {
        money: (value) => new Intl.NumberFormat('', {
            style: 'currency',
            currency: this.setting.general.currency
        }).format(value)
    },

    data() {
        return {
            editIndex: null,
            originalData: null,
            getDicount: 0,
            marketGameSetting: [],
            items: [{
                number2d: '',
                betvalue: '',
                discount: '',
                is_not: true
            }, ],
            tax: 0,
        }
    },
    methods: {

        add() {
            this.originalData = null
            this.items.push({
                number2d: '',
                betvalue: '',
                discount: '',
                is_not: true
            })
            this.editIndex = this.items.length - 1
        },

        edit(item, index) {
            this.originalData = Object.assign({}, item)
            this.editIndex = index
        },

        cancel(item) {
            this.editIndex = null
            if (!this.originalData) {
                this.items.splice(this.items.indexOf(item), 1)
                return
            }
            Object.assign(item, this.originalData)
            this.originalData = null
        },

        remove(item, index) {
            this.items.splice(index, 1)
        },

        save(item) {
            this.originalData = null
            this.editIndex = null
        },

        subtotal(item) {
            return item.betvalue - (item.betvalue * this.marketGameSetting.discount / 100)
        },
        subDiscount(item) {
            return item.discount = (item.betvalue * this.marketGameSetting.discount) / 100
        },

        async getMarketGameSetting() {
            const input = {
                game: '2D',
                market: this.$route.params.marketcode
            }
            const data = await this.$axios.$post('/member/getmarketgamesetting', input)
            this.marketGameSetting = data
        }
    },
    created() {
        this.getMarketGameSetting()
    },
    computed: {
        allSubTotal() {
            return this.items
                .map(item => this.subtotal(item))
                .reduce((a, b) => a + b, 0)
        },
        ...mapGetters({
            setting: "frontendconfig/setting"
        })

    },
}
</script>

<style>

</style>
