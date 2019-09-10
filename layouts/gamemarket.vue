<template>
    <div>
        <Header ></Header>
        <nav-bar ></nav-bar>
        <b-container>
            <b-row class="mt-2">
                <b-col>
                    <b-card
                        overlay
                        img-src="https://picsum.photos/900/250/?image=3"
                        img-alt="Card Image"
                        text-variant="white">
                    </b-card>
                </b-col>
            </b-row>
            <b-row class="mt-4">
                <b-col col md="3">
                    <b-card no-body class="mb-2">
                        <h4 slot="header" class="m-0"><i class="fa fa-bookmark"></i> Market</h4>
                        <b-list-group flush class="m-menu">
                            <template v-for="item in marketItem">
                                <b-list-group-item :to="{path:'/member/gamemarkets/'+item.code}" :key="item.id">{{ item.name }}</b-list-group-item>
                            </template>
                        </b-list-group>
                    </b-card>
                    <template v-if="$route.params.marketcode">
                        <transition name="router-anim" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                            <b-card no-body class="mb-2">
                                <h4 slot="header" class="m-0"><i class="fa fa-archive" aria-hidden="true"></i> Bet Game</h4>
                                <b-list-group flush class="m-menu">
                                    <template v-for="item in gameItem">
                                        <b-list-group-item :to="{path:'/member/gamemarkets/'+$route.params.marketcode+'/'+item.code}" :key="item.id">{{ item.name }}</b-list-group-item>
                                    </template>
                                </b-list-group>
                            </b-card>
                        </transition>
                    </template>
                </b-col>
                <b-col md="9" class="pl-0">
                    <template v-if="$route.params.marketcode">
                    <market-head-active></market-head-active>
                    </template>
                    <transition name="router-anim" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                        <nuxt ></nuxt>
                    </transition>
                </b-col>
                <Footer />
            </b-row>
        </b-container>
    </div>
</template>

<script>
import Header from '~/components/partials/Header'
import NavBar from '~/components/partials/NavBar'
import Footer from '~/components/partials/Footer'
import MarketHeadActive from '~/components/gamemarket/MarketHeadActive'
export default {
	middleware: 'guest',
	name: 'MarketCodeLayoutView',
	components: {
		Header,
		NavBar,
		Footer,
		MarketHeadActive,
	},
	data: () => ({
		marketItem: [],
		gameItem: [],
		getMarketActive: [],
		periodMarket: '',
	}),
	mounted() {
		this.gameItem = this.setting.gameitem.filter(
			item => !this.isNotIn.includes(parseInt(item.id))
		)
		this.marketItem = this.setting.market
	},
}
</script>

<style>
</style>
