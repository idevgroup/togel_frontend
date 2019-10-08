<template>
    <div>

        <Header />
        <div class="clear"></div>
        <template v-if="$route.params.marketcode">
            <b-row>
                <b-col class="mt-4">
                    <b-card>
                        <h3 class="title">Report Market</h3>
                        <b-form-select
                            v-model="selected"
                            :options="marketItem"
                            value-field="code"
                            text-field="name"
                            @change="martketChange"></b-form-select>
                    </b-card>
                </b-col>

            </b-row>
        </template>
        <b-row>
            <b-col class="mb-5 pl-4 pb-5 mt-5">
                <nuxt></nuxt>
            </b-col>
        </b-row>
        <Footer />
    </div>
</template>

<script>
import Header from '~/components/mobile/Header'
import Footer from '~/components/mobile/Footer'

export default {
	components: {
		Header,
		Footer,
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
	}),
	mounted() {
		this.selected = this.$route.params.marketcode
		this.marketItem = this.setting.market
	},
	methods: {
		martketChange() {
			this.$router.push({
				path: '/member/reports/' + this.selected,
			})
		},
	},
}
</script>
