<template>
    <div>
        <div class="header">
            <div class="pull-left">
                <div class="sidebar-menu">
                    <Slide>
                        <b-link to="/">Home</b-link>
                        <b-link to="#">Buku Mimipi </b-link>
                        <b-link to="#">Peraturan</b-link>
                        <b-link to="#">Promo</b-link>
                        <b-link to="#">Kontak</b-link>
                    </Slide>
                </div>

                <div class="logo-wrap">
                    <b-img
                        src="~/assets/media/mobile-images/homepage/logo1.png"
                        class="img-fluid"
                        alt="logo" />
                </div>
            </div>
            <div class="pull-right">
                <template v-if="authenticated">
                    <b-row>
                        <b-col class="pt-2">
                            <b-link to="/member/gamemarkets/cam" class="btn btn-danger btn-play">Play</b-link>
                            <div class="dropdown">
                                <button class="dropbtn"><i class="icon-user-d"></i></button>
                                <div class="dropdown-content">
                                    <b-link to="#">{{ user.reg_name}}</b-link>
                                    <b-link to="/member/dashboard">{{ user.reg_remain_balance| currency(setting.general.symbol)}}</b-link>
                                    <template v-for="item in transactions">
                                        <b-link :to="{name:'member-'+item.path}" :key="item.path">{{ item.title }}</b-link>
                                    </template>
                                    <template v-for="item in userprofiles">
                                        <b-link :key="item.path" to="#">{{ item.title }}</b-link>
                                    </template>
                                  
                                    <b-link to="#" @click="logoutSubmit">Logout</b-link>
                                </div>
                            </div>
                        </b-col>
                    </b-row>

                </template>
                <template v-else>
                    <div class="my-form">
                        <b-link to="/register" class="daftar hvr-wobble-skew" />
                        <b-link to="/login" class="login hvr-wobble-skew" />
                    </div>
                </template>
            </div>
        </div>
        <div class="clear"></div>
    </div>
</template>

<script>
import { Slide } from 'vue-burger-menu'

export default {
	components: {
		Slide,
	},
	data: () => ({
		transactions: [
			{
				title: 'Dashbord',
				path: 'dashboard',
			},
			{
				title: 'Deposit',
				path: 'deposit',
			},
			{
				title: 'Withdraw',
				path: 'withdraw',
			},
		],
		itemSelected: null,
		userprofiles: [
			{
				title: 'Bank',
				path: 'bank',
			},
			{
				title: 'Referal',
				path: 'referrals',
			},
			{
				title: 'Contact',
				path: 'contact',
			},
		],
	}),
	methods: {
		async logoutSubmit() {
			await this.$auth.logout()
		},
	},
}
</script>

<style scoped>
@media (max-width: 575.98px) {
	.sidebar-menu a {
		display: block;
		margin-top: 0px;
	}
}

.sidebar-menu a {
	display: block;
	color: whitesmoke;
}

.bm-item-list > * {
	display: flex;
	padding: 0.2em;
	text-decoration: none;
}

.bm-item-list > * {
	display: flex;
	text-decoration: none;
	padding: 0.4em;
}

.bm-item-list {
	color: #b8b7ad;
	font-size: 20px;
	margin-left: 5%;
}
</style>
