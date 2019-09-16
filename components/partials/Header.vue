<template>
    <div class="mt-3">
        <div
            id="contact-wrap"
            class="contact-wrap"
            style="left: -190px">
            <div class="contact">

            </div>
        </div>
        <div
            id="contact-wrap-right"
            class="contact-wrap-right"
            style="right: -190px">
            <ul class="contact">
                <a href="#">
                    <div class="fb">
                        <p>350TOTO</p>
                    </div>
                </a>
                <a href="#">
                    <div class="line">
                        <p>350TOTO</p>
                    </div>
                </a>
                <a href="#">
                    <div class="telegram">
                        <p>350TOTO</p>
                    </div>
                </a>
                <a href="#">
                    <div class="wechat">
                        <p>350TOTO</p>
                    </div>
                </a>
            </ul>
        </div>
        <b-container>
            <b-row>
                <b-col>
                    <div class="logo">
                        <b-img
                            src="~/assets/media/images/logo.png"
                            class="img-fluid"
                            alt="logo" />
                    </div>
                </b-col>
                <b-col class="mt-4 pull-right form-wrap">
                    <div class="row">
                        <div class="col-sm-12 col-md-6 col-lg-6 pr-0 live-chat-wrap">
                            <div class="live-chat ml-5">
                                <p class="live-chat"><span>LIVE CHAT</span><span><img src="~/assets/media/images/icons/live-chat.png" class="img-fluid" alt="live-chat"></span></p>
                            </div>
                            <div class="timezone mt-4 ml-2">
                                <p>{{currentTime}} (GMT+7)</p>
                                <!-- {{currentTime}} -->
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-6 ml-0">
                            <template v-if="authenticated">
                                <b-nav class="pull-right">
                                    <b-nav-item to="/member/gamemarkets">Play</b-nav-item>
                                    <b-nav-item to="/member/dashboard">{{user.reg_remain_balance| currency(setting.general.symbol, 2, { thousandsSeparator: ',',spaceBetweenAmountAndSymbol: true })}}</b-nav-item>
                                    <b-nav-item-dropdown
                                        id="my-nav-dropdown"
                                        :text="user.reg_name"
                                        toggle-class="nav-link-custom"
                                        right>

                                        <template v-for="item in transactions">
                                            <b-dropdown-item :to="{name:'member-'+item.path}" :key="item.path">{{ item.title }}</b-dropdown-item>
                                        </template>
                                        <template v-for="item in userprofiles">
                                            <b-dropdown-item :key="item.path" to="#">{{ item.title }}</b-dropdown-item>
                                        </template>
                                        <b-dropdown-divider></b-dropdown-divider>
                                        <b-dropdown-item to="#" @click="logoutSubmit">Logout</b-dropdown-item>

                                    </b-nav-item-dropdown>

                                </b-nav>
                            </template>
                            <template v-else>
                                <!-- Form -->
                                <form
                                    ref="form"
                                    class="my-form"
                                    @submit.stop.prevent="loginSubmit">
                                    <input v-validate="{ required: true }" id="username-input" v-model="login.username" name="username" data-vv-name="username" data-vv-as="user name" placeholder="USERNAME" />
                                    <input v-validate="{ required: true }" id="password-input" v-model="login.password" name="password" type="password" data-vv-name="password" data-vv-as="password" placeholder="PASSWORD" />

                                    <div class="clear"></div>
                                    <!-- <button class="daftar hvr-wobble-skew" name="daftar"></button>
                                    <button class="login hvr-wobble-skew" name="login"></button> -->
                                    <input type="button" name="daftar" value="DAFTAR" @click="registerForm" />
                                    <input type="submit" name="login" value="LOGIN" />
                                </form>
                                <!-- /Form -->
                            </template>
                        </div>
                    </div>
                </b-col>
            </b-row>
            <Register />
        </b-container>
    </div>

</template>

<script>
import moment from 'moment'
import VueRecaptcha from 'vue-recaptcha'
import Register from '~/components/auth/Register'
export default {
	components: {
		VueRecaptcha,
		Register,
	},
	data: () => ({
		hover: false,
		transactions: [
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
		currentTime: null,
		login: {
			username: '',
			password: '',
		},
	}),

	created() {
		this.currentTime = moment()
			.tz(this.setting.general.timezone)
			.format('YYYY/MM/DD H:mm:ss')
		let vm = this
		setInterval(() => vm.updateCurrentTime(), 1 * 1000)
	},
	methods: {
		updateCurrentTime() {
			this.currentTime = moment()
				.tz(this.setting.general.timezone)
				.format('YYYY/MM/DD H:mm:ss')
		},
		async logoutSubmit() {
			await this.$auth.logout()
		},

		async loginSubmit() {
			this.$validator.validateAll().then(result => {
				if (result) {
					try {
						this.$auth
							.loginWith('local', {
								data: this.login,
							})
							.then(() => {
								this.$router.push({
									name: 'member-dashboard',
								})
							})
							.catch(function(error) {
								console.log(error)
							})
					} catch (e) {
						console.log(e)
					}
				}
			})
		},
		registerForm() {
			this.$modal.show('register')
		},
	},
}
</script>
<style scoped>
form.my-form input[name='username'],
form.my-form input[name='password'] {
	color: black;
}
</style>>
