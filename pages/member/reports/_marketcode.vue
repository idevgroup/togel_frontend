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
            class="tbl-bet-list"
            @row-clicked="loadModalDetail">
            <template slot="index" slot-scope="data">
                {{ data.index + 1 }}
            </template>
            <template slot="buy" slot-scope="data">
                {{ data.item.buy | currency(setting.general.symbol) }}
            </template>
            <template slot="paid" slot-scope="data">
                {{ data.item.paid | currency(setting.general.symbol) }}
            </template>
            <template slot="win" slot-scope="data">
                {{ data.item.win | currency(setting.general.symbol) }}
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
                    <template slot="guess" slot-scope="data">
                        {{ gameGessOption(data.item.gameId,data.item.guess,data.item.param1) }}
                    </template>
                    <template slot="buy" slot-scope="data">
                        {{ data.item.buy | currency(setting.general.symbol) }}
                    </template>
                    <template slot="pay" slot-scope="data">
                        {{ data.item.pay | currency(setting.general.symbol) }}
                    </template>
                    <template slot="win" slot-scope="data">
                        {{ data.item.win | currency(setting.general.symbol) }}
                    </template>
                    <template slot="discount" slot-scope="data">
                        {{ data.item.discount | currency(setting.general.symbol) }}
                    </template>
                    <template slot="kei" slot-scope="data">
                        {{ data.item.kei + 0 | currency(setting.general.symbol) }}
                    </template>
                    <template slot="bottom-row">
                        <td colspan="3">
                        </td>
                        <td class="text-right">
                            <strong>{{ totalInvDisc | currency(setting.general.symbol) }}</strong>
                        </td>
                        <td class="text-right">
                            <strong>{{ totalInvKei | currency(setting.general.symbol) }}</strong>
                        </td>
                        <td class="text-right">
                            <strong>{{ totalInvPaid | currency(setting.general.symbol) }}</strong>
                        </td>
                        <td class="text-right">
                            <strong>{{ totalInvWin | currency(setting.general.symbol) }}</strong>
                        </td>
                    </template>
                </b-table>
             
            </div>
            <b-col lg="4" class="pb-2">
                <b-button variant="success" @click="print">Print invoice</b-button>
            </b-col>
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
    layout: ({ isMobile }) => (isMobile ? 'layoutreport' : 'member'),
    name: 'ReportTransactionView',
    data: () => ({
        periodItem: [],
        selectPeriod: null,
        fields: [{
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
        fieldsInvoice: [{
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
                key: 'kei',
                label: 'Kei',
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
        ItemBetTransactionHasParent: [],
        //Game Option
        game5050AndBesar: {
            oddeven: [{
                    text: 'Odd',
                    value: 1,
                },
                {
                    text: 'Even',
                    value: 2,
                },
            ],
            largesmall: [{
                    text: 'Big',
                    value: 1,
                },
                {
                    text: 'Small',
                    value: 2,
                },
            ],
        },

        gameColokJitu: [{
                value: 1,
                text: 'As',
            },
            {
                value: 2,
                text: 'Kop',
            },
            {
                value: 3,
                text: 'Kepala',
            },
            {
                value: 4,
                text: 'Ekor',
            },
        ],
        gameKembang: [{
                name: 'Depan',
                key: 1,
            },
            {
                name: 'Tengah',
                key: 2,
            },
            {
                name: 'Belakang',
                key: 3,
            },
        ],
        gameKombinasi: [{
                value: 1,
                text: 'As Ganjil',
            },
            {
                value: 2,
                text: 'As Genap',
            },
            {
                value: 3,
                text: 'As Besar',
            },
            {
                value: 4,
                text: 'As Kecil',
            },
            {
                value: 5,
                text: 'Kop Ganjil',
            },
            {
                value: 6,
                text: 'Kop Genap',
            },
            {
                value: 7,
                text: 'Kop Besar',
            },
            {
                value: 8,
                text: 'Kop Kecil',
            },
            {
                value: 9,
                text: 'Kepala Ganjil',
            },
            {
                value: 10,
                text: 'Kepala Genap',
            },
            {
                value: 11,
                text: 'Kepala Besar',
            },
            {
                value: 12,
                text: 'Kepala Kecil',
            },
            {
                value: 13,
                text: 'Ekor Ganjil',
            },
            {
                value: 14,
                text: 'Ekor Genap',
            },
            {
                value: 15,
                text: 'Ekor Besar',
            },
            {
                value: 16,
                text: 'Ekor Kecil',
            },
        ],
        gameShio: [],
        gameTepi: [{
                text: 'Tepi',
                value: 1,
            },
            {
                text: 'Tengah',
                value: 2,
            },
        ],
    }),
    computed: {
        totalBuy: function () {
            return this.listBetTransaction.reduce(function (a, c) {
                return a + Number(c.buy || 0)
            }, 0)
        },
        totalPaid: function () {
            return this.listBetTransaction.reduce(function (a, c) {
                return a + Number(c.paid || 0)
            }, 0)
        },
        totalWin: function () {
            return this.listBetTransaction.reduce(function (a, c) {
                return a + Number(c.win || 0)
            }, 0)
        },
        totalInvDisc: function () {
            return this.itemDetailInvoice.reduce(function (a, c) {
                return a + Number(c.discount || 0)
            }, 0)
        },
        totalInvPaid: function () {
            return this.itemDetailInvoice.reduce(function (a, c) {
                return a + Number(c.pay || 0)
            }, 0)
        },
        totalInvWin: function () {
            return this.itemDetailInvoice.reduce(function (a, c) {
                return a + Number(c.win || 0)
            }, 0)
        },
        totalInvKei: function () {
            return this.itemDetailInvoice.reduce(function (a, c) {
                return a + Number(c.kei || 0)
            }, 0)
        },
    },
    async mounted() {
        await this.getTransactionPeriod()
        this.getListTransaction()
	},
	created(){
		this.loadShio()
	},
    methods: {
        async loadShio() {
            const input = {
                date: this.nowDateTime,
            }
            const data = await this.$axios.$post('/member/getgameshio', input)
            this.gameShio = data
        },
        totalAmountHasSub(collect = [], column) {
            let value = 0
            if (column === 'buy') {
                collect.forEach(item => {
                    value += item.buy
                })
            } else if (column === 'paid') {
                collect.forEach(item => {
                    value += item.paid
                })
            } else if (column === 'win') {
                collect.forEach(item => {
                    value += item.win
                })
            }

            return value
        },
        async getListTransaction() {
            this.listBetTransaction = []
            const input = {
                period: this.selectPeriod,
            }
            const data = await this.$axios.$post('member/transgamelist', input)
            this.listBetTransaction = data.filter(
                value => value.buy !== 0 && value.sub === 0
            )
            this.ItemBetTransactionHasParent = data.filter(
                item => item.sub !== 0 && item.buy !== 0
            )
            let gameidparent
            this.listBetTransaction.forEach((item, index) => {
                gameidparent = item.gameid
                let getparent = this.ItemBetTransactionHasParent.filter(
                    item => item.sub === gameidparent
                )
                item.buy =
                    parseFloat(item.buy) +
                    parseFloat(this.totalAmountHasSub(getparent, 'buy'))
                item.paid =
                    parseFloat(item.paid) +
                    parseFloat(this.totalAmountHasSub(getparent, 'paid'))
                item.win =
                    parseFloat(item.win) +
                    parseFloat(this.totalAmountHasSub(getparent, 'win'))
                getparent.forEach(itemsub => {
                    itemsub.invoicedetail.forEach(items => {
                        item.invoicedetail.push(items)
                    })
                })
                this.listBetTransaction.splice(index, 1, item)
            })
        },
        async getTransactionPeriod() {
            const input = {
                marketcode: this.$route.params.marketcode,
            }
            const data = await this.$axios.$post(
                'member/transperiodlist',
                input
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
        gameGessOption(gameId, guess, param = null) {
            let str
            if (parseInt(gameId) === 7 || parseInt(gameId) === 15) {
                str = this.game5050AndBesar.largesmall.filter(
                    item => item.value === parseInt(guess)
                )
                str = str[0].text
            } else if (parseInt(gameId) === 12 || parseInt(gameId) === 13) {
                str = this.game5050AndBesar.oddeven.filter(
                    item => item.value === parseInt(guess)
                )
                str = str[0].text
            } else if (parseInt(gameId) === 10) {
                str = this.gameColokJitu.filter(
                    item => item.value === parseInt(param)
                )
				str = str[0].text +' - '+ guess
			 } else if (parseInt(gameId) === 16 || parseInt(gameId) === 17 || parseInt(gameId) === 18) {
                str = this.gameKembang.filter(
                    item => item.key === parseInt(guess)
				)
				let getGameName = this.setting.gameitem.filter(item => item.id === parseInt(gameId) )
			
                str =  getGameName[0].name+' - '+ str[0].name 
			} else if (parseInt(gameId) === 19 ) {
                str = this.gameKombinasi.filter(
                    item => item.value === parseInt(guess)
				)
				let str1 = this.gameKombinasi.filter(
                    item => item.value === parseInt(param)
				)
				str = str[0].text + ' - ' + str1[0].text
			 } else if (parseInt(gameId) === 22 || parseInt(gameId) === 23 ) {
                str = this.gameTepi.filter(
                    item => item.value === parseInt(guess)
				)			
				str =  str[0].text 
			 } else if (parseInt(gameId) === 20) {
                str = this.gameShio.filter(
                    item => item.value === parseInt(guess)
                )
				str = this.splitString(str[0].text) 
            } else {
                str = guess
            }
            return str
		},
		splitString(str) {
			var value = ''
			value = str.split('.')
			return value[1]
		},
    },
}
</script>

<style>
</style>
