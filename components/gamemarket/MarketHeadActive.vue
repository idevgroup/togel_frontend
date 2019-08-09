<template>
    <div>
        <b-row>
            <b-col id="martket-side" align-self="center">

                <b-card-text id="martket-active">
                    <template v-for="item in marketItem">
                        <div v-if="item.code === $route.params.marketcode" :key="item.id">
                            Active:{{ item.name }} <br >
                        </div>
                    </template>
                    {{ getDate() }}: {{ $route.params.marketcode.toUpperCase() }} - {{ getPeriod }}
                </b-card-text>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    data: () => ({
        marketItem: [],
        getMarketActive: [],
        getPeriod: '',
    }),
    mounted() {
        this.marketItem = this.setting.market
        this.periodMarket(this.$route.params.marketcode)
    },

    methods: {
        getDate() {
            const toTwoDigits = num => (num < 10 ? '0' + num : num)
            let today = new Date()
            let year = today.getFullYear()
            let month = toTwoDigits(today.getMonth() + 1)
            let day = toTwoDigits(today.getDate())
            return `${year}-${month}-${day}`
        },
        async periodMarket(marketcode) {
            let self = this
            const valuePeriod = await this.$axios.$post('/getperiod', {
                marketcode: marketcode,
            })
            self.getPeriod = valuePeriod.period
        },
    },
}
</script>

<style scoped>
#martket-side {
    display: table;
    height: 140px;
}

#martket-active {
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    line-height: 30px;
    color: #540606;
    vertical-align: middle;
    display: table-cell;
}
</style>
