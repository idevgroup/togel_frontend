<template>
    <div>

        <b-row>
            <b-col id="martket-side" align-self="center">

                <b-card-text id="martket-active">
                    <template v-for="item in marketItem">
                        <div v-if="item.code === $route.params.marketcode" :key="item.id">
                            Active: {{ item.name }} <br>
                        </div>
                    </template>
                    {{ nowDateTime.format('DD-MM-YYYY') }}: {{ $route.params.marketcode.toUpperCase() }} - {{ getPeriod }}
                </b-card-text>
            </b-col>
        </b-row>

        <quick-games />

    </div>
</template>

<script>
import QuickGames from './QuickGames'
export default {
	components: {
		QuickGames,
	},
	data: () => ({
		marketItem: [],
		getMarketActive: [],
		getPeriod: '',
		marketcode: '',
	}),
	mounted() {
		this.marketItem = this.setting.market
	},
	created() {
		this.marketcode = this.$route.params.marketcode
	},
	updated() {
		this.periodMarket(this.$route.params.marketcode)
	},
	methods: {
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
