<template>
    <div>
        <Header></Header>
        <nav-bar></nav-bar>
        <b-container>
            <b-col id="wrapper">
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

                <transition
                    name="router-anim"
                    enter-active-class="animated fadeIn"
                    leave-active-class="animated fadeOut">
                    <template v-if="$route.params.marketcode">
                        <b-row class="mt-4">
                            <b-col id="section-game">
                                <b-list-group horizontal class="m-menu-game">
                                    <template v-for="item in gameItem">
                                        <b-list-group-item :to="{path:'/member/gamemarkets/'+$route.params.marketcode+'/'+item.code}" :key="item.id">{{ item.name }}</b-list-group-item>
                                    </template>
                                </b-list-group>
                            </b-col>
                        </b-row>
                    </template>
                </transition>

                <b-row class="mt-4">
                    <b-col col md="3">
                        <template v-if="$route.params.marketcode">
                           <b-col id="market-active">
                               <market-head-active></market-head-active>
                           </b-col>     
                            
                        </template>
                        <b-card no-body class="mb-2">
                            <h4 slot="header" class="m-0"><i class="fa fa-bookmark"></i> Market</h4>
                            <b-list-group flush class="m-menu">
                                <template v-for="item in marketItem">
                                    <b-list-group-item :to="{path:'/member/gamemarkets/'+item.code}" :key="item.id">{{ item.name }}</b-list-group-item>
                                </template>
                            </b-list-group>
                        </b-card>
                    </b-col>
                    <b-col md="9" class="pl-0">
                        <template v-if="$route.params.marketcode">
                            <quick-games />
                        </template>
                        <transition
                            name="router-anim"
                            enter-active-class="animated fadeIn"
                            leave-active-class="animated fadeOut">
                            <nuxt></nuxt>
                        </transition>
                    </b-col>
                    <Footer />
                </b-row>
            </b-col>
        </b-container>
    </div>
</template>

<script>
import Header from '~/components/partials/Header'
import NavBar from '~/components/partials/NavBar'
import Footer from '~/components/partials/Footer'
import MarketHeadActive from '~/components/gamemarket/MarketHeadActive'
import QuickGames from '~/components/gamemarket/QuickGames'
export default {
	middleware: 'guest',
	name: 'MarketCodeLayoutView',
	components: {
		Header,
		NavBar,
		Footer,
		MarketHeadActive,
		QuickGames,
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
