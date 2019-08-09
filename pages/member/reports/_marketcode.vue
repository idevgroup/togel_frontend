<template>
    <div>

        <b-col lg="8" class="m-auto">
            <b-form-group
                label-cols-sm="4"
                label-cols-lg="4"
                label="Transaction Period:"
                label-for="select-period"
                label-class="font-weight-bold"
                class="mt-3">
                <b-form-select
                    v-validate="{ required: true }"
                    id="select-period"
                    v-model="selectPeriod"
                    :options="periodItem"
                    name="bank"
                    value-field="key"
                    text-field="value"
                    @change="getListTransaction"></b-form-select>
            </b-form-group>
        </b-col>
        <b-table
            :fields="fields"
            :items="listBetTransaction"
            hover
            striped
            responsive
            bordered
            flex
            head-variant="light"
            @row-clicked="loadModalDetail">
            <template slot="index" slot-scope="data">
                {{ data.index + 1 }}
            </template>
            <template slot="buy" slot-scope="data">
                {{ data.item.buy | currency(setting.general.symbol, 2, { thousandsSeparator: ',',spaceBetweenAmountAndSymbol: true }) }}
            </template>
            <template slot="paid" slot-scope="data">
                {{ data.item.paid | currency(setting.general.symbol, 2, { thousandsSeparator: ',',spaceBetweenAmountAndSymbol: true }) }}
            </template>
            <template slot="win" slot-scope="data">
                {{ data.item.win | currency(setting.general.symbol, 2, { thousandsSeparator: ',',spaceBetweenAmountAndSymbol: true }) }}
            </template>
             <template slot="bottom-row">
                 <td colspan="2">
                 </td>
                 <td class="text-right">
                     <strong>{{ totalBuy | currency(setting.general.symbol) }}</strong>
                 </td>
                 <td class="text-right">
                      <strong>{{ totalPaid | currency(setting.general.symbol) }}</strong>
                 </td>
                 <td class="text-right">
                     <strong> {{ totalWin | currency(setting.general.symbol) }}</strong>
                 </td>
                 
            </template>
        </b-table>
        <modal
            :scrollable="true"
            name="transaction-bet"
            height="auto"
            draggable=".modal-header"
            resizable
            adaptive
            reset
            width="750px"
            @before-open="beforeOpen"
            @before-close="beforeClose">
            <div class="modal-header">
                <h5 class="modal-title">Invoice</h5>
                <button type="button" class="close" aria-label="Close" @click="$modal.hide('transaction-bet')">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div id="printMe" class="modal-body">

                <b-table
                    :fields="fieldsInvoice"
                    :items="itemDetailInvoice"
                    hover
                    striped
                    responsive
                    bordered
                    flex
                    show-empty
                    head-variant="light">
                    <template slot="index" slot-scope="data">
                        {{ data.index + 1 }}
                    </template>
                    <template slot="buy" slot-scope="data">
                        {{ data.item.buy | currency(setting.general.symbol, 2, { thousandsSeparator: ',',spaceBetweenAmountAndSymbol: true }) }}
                    </template>
                    <template slot="pay" slot-scope="data">
                        {{ data.item.pay | currency(setting.general.symbol, 2, { thousandsSeparator: ',',spaceBetweenAmountAndSymbol: true }) }}
                    </template>
                    <template slot="win" slot-scope="data">
                        {{ data.item.win | currency(setting.general.symbol, 2, { thousandsSeparator: ',',spaceBetweenAmountAndSymbol: true }) }}
                    </template>
                     <template slot="discount" slot-scope="data">
                        {{ data.item.discount | currency(setting.general.symbol, 2, { thousandsSeparator: ',',spaceBetweenAmountAndSymbol: true }) }}
                    </template>
                </b-table>
            </div>
 <b-col lg="4" class="pb-2"><b-button variant="success" @click="print">Print invoice</b-button></b-col>
        </modal>
    </div>
</template>

<script>
import Vue from 'vue'
import VueHtmlToPaper from 'vue-html-to-paper'
const options = {
    name: '_blank',
    specs: ['fullscreen=yes', 'titlebar=yes', 'scrollbars=yes'],
    styles: ['https://unpkg.com/kidlat-css/css/kidlat.css'],
}
Vue.use(VueHtmlToPaper, options)
export default {
    layout: 'member',
    name: 'ReportTransactionView',
    data: () => ({
        periodItem: [],
        selectPeriod: null,
        fields: [
            {
                key: 'index',
                label: 'No',
                class: 'text-center',
            },
            {
                key: 'gamename',
                label: 'Game Name',
            },
            {
                key: 'buy',
                label: 'Buy',
                class: 'text-right',
            },
            {
                key: 'paid',
                label: 'Paid',
                class: 'text-right',
            },
            {
                key: 'win',
                label: 'Win',
                class: 'text-right',
            },
        ],
        fieldsInvoice: [
            {
                key: 'index',
                label: 'No',
                class: 'text-center',
            },
            {
                key: 'guess',
                label: 'Guess Number',
                class: 'text-center',
            },
            {
                key: 'buy',
                label: 'Bet',
                class: 'text-right',
            },
            {
                key: 'discount',
                label: 'Discount',
                class: 'text-right',
            },
            {
                key: 'pay',
                label: 'Paid',
                class: 'text-right',
            },
            {
                key: 'win',
                label: 'Win',
                class: 'text-right',
            },
        ],
        listBetTransaction: [],
        itemDetailInvoice: [],
    }),
    computed: {
        totalBuy: function() {
            return this.listBetTransaction.reduce(function(a, c) {
                return a + Number(c.buy || 0)
            }, 0)
        },
        totalPaid: function() {
            return this.listBetTransaction.reduce(function(a, c) {
                return a + Number(c.paid || 0)
            }, 0)
        },
        totalWin: function() {
            return this.listBetTransaction.reduce(function(a, c) {
                return a + Number(c.win || 0)
            }, 0)
        },
    },
    async mounted() {
        await this.getTransactionPeriod()
        this.getListTransaction()
    },
    methods: {
        async getListTransaction() {
            this.listBetTransaction = []
            const input = {
                period: this.selectPeriod,
            }
            const data = await this.$axios.$post('member/transgamelist', input)
            this.listBetTransaction = data
        },
        async getTransactionPeriod() {
            const input = {
                marketcode: this.$route.params.marketcode,
            }
            const data = await this.$axios.$post(
                'member/transperiodlist',
                input,
            )
            this.periodItem = data
            this.selectPeriod = data[0].key
        },
        loadModalDetail(data) {
            this.$modal.show('transaction-bet', {
                gamebet: data,
            })
        },

        beforeOpen(event) {
            this.itemDetailInvoice = event.params.gamebet.invoicedetail
        },
        beforeClose() {
            this.itemDetailInvoice = []
        },
        print() {
            // Pass the element id here
            this.$htmlToPaper('printMe', () => {
                console.log('Printing done or got cancelled!')
            })
        },
    },
}
</script>

<style>
</style>
