<template>
    <div>

        <Header />
        <div class="clear"></div>
        <template v-if="$route.params.marketcode">
            <b-row>
                <b-col class="mt-4">
                    <template v-if="$route.params.marketcode">
                        <b-col id="market-active">
                            <market-head-active></market-head-active>
                        </b-col>

                    </template>
                    <b-card>
                        <h3 class="title">Market</h3>
                        <b-form-select
                            v-model="selected"
                            :options="marketItem"
                            value-field="code"
                            text-field="name"
                            @change="martketChange"></b-form-select>
                    </b-card>
                </b-col>

            </b-row>
            <b-row>
                <b-col>

                    <div id="section-game" class="text-center mt-2 mb-2">
                        <label v-for="item in gameItem" :key="item.id">
                            <b-button :to="{path:'/member/gamemarkets/'+$route.params.marketcode+'/'+item.code}" variant="info">{{ item.name }}</b-button>
                        </label>
                    </div>

                </b-col>
            </b-row>

            <quick-games />

        </template>
        <b-row>
            <b-col class="mb-5 pl-4 pb-5">
                <nuxt></nuxt>
            </b-col>
        </b-row>
        <Footer />
    </div>
</template>

<script>
import Header from '~/components/mobile/Header'
import Footer from '~/components/mobile/Footer'
import MarketHeadActive from '~/components/gamemarket/MarketHeadActive'
import QuickGames from '~/components/gamemarket/QuickGames'
export default {
	components: {
		Header,
		Footer,
		MarketHeadActive,
		QuickGames,
	},

	head() {
		return {
			link: [
				{
					rel: 'stylesheet',
					href: require('assets/media/css/mobile.css'),
				},
			],
		}
	},
	data: () => ({
		selected: null,
		marketItem: [],
		gameItem: [],
		getMarketActive: [],
		periodMarket: '',
	}),
	mounted() {
		this.selected = this.$route.params.marketcode
		this.gameItem = this.setting.gameitem.filter(
			item => !this.isNotIn.includes(parseInt(item.id))
		)
		this.marketItem = this.setting.market
	},
	methods: {
		martketChange() {
			this.$router.push({
				path: '/member/gamemarkets/' + this.selected,
			})
		},
	},
}
</script>
