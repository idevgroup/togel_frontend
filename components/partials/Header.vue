<template>
    <div class="mt-3">
        <div
            id="contact-wrap"
            class="contact-wrap"
            style="left: -190px">
            <div class="contact"></div>
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
        <div class="wrapper">
            <!-- <b-row class="mr-0 ml-0"> -->
            <!-- <b-col> -->
            <div class="pull-left">
                <div class="logo">
                    <b-img
                        src="~/assets/media/images/logo.png"
                        class="img-fluid"
                        alt="logo" />
                </div>
            </div>
            <!-- </b-col> -->

            <!-- <b-col class="pull-right form-wrap"> -->
            <div class="mr-0 ml-0 pull-right time">
                <div class="pr-0">
                    <div class="timezone-wrap">
                        <div>
                            <p>{{currentTime}}</p>
                        </div>
                        <!-- {{currentTime}} -->
                    </div>
                    <div class="timezone-auth">
                        <b-dropdown class="lang-drop">
                            <template v-slot:button-content>
                                <img src="~/assets/media/images/Bahas-flag.png" />
                            </template>
                            <b-dropdown-item href="#">
                                <img src="~/assets/media/images/Bahas-flag.png" />
                                <p>Bahas</p>
                            </b-dropdown-item>
                            <b-dropdown-item href="#">
                                <img src="~/assets/media/images/en-flag.png" />
                                <p>English</p>
                            </b-dropdown-item>
                            <b-dropdown-item href="#">
                                <img src="~/assets/media/images/th-flag.png" />
                                <p>Thailand</p>
                            </b-dropdown-item>
                        </b-dropdown>
                    </div>
                </div>
                <template v-if="authenticated">
                  
                    <div class="profile-wrap mt-4 pt-2">
                          <b-link to="/member/gamemarkets/cam" class="play btn">Play</b-link>
                        <div class="profile">
                            <p>
                                Hello,
                                <b-link to="/member/dashboard">{{ user.reg_name }}</b-link>
                            </p>
                        </div>
                        <div class="money">
                            <b-dropdown>
                                <template v-slot:button-content>{{user.reg_remain_balance| currency(setting.general.symbol)}}</template>
                                <template v-for="item in transactions">
                                    <b-dropdown-item :to="{name:'member-'+item.path}" :key="item.path">{{ item.title }}</b-dropdown-item>
                                </template>
                                <template v-for="item in userprofiles">
                                    <b-dropdown-item :key="item.path" to="#">{{ item.title }}</b-dropdown-item>
                                </template>
                                <b-dropdown-divider></b-dropdown-divider>
                                <b-dropdown-item to="#" @click="logoutSubmit">Logout</b-dropdown-item>
                            </b-dropdown>
                        </div>
                         <div class="sign-out">
                            <span id="logout-icon" @click="logoutSubmit"></span>
                        </div>
                    </div>
                    <div class="clear"></div>

                </template>
                <template v-else>
                    <b-col class="pt-3 pull-right form-wrap">
                        <div class="row">
                                <!-- Form -->
                                <form
                                    ref="form"
                                    class="my-form"
                                    @submit.stop.prevent="loginSubmit">
                                    <input v-validate="{ required: true }" id="username-input" v-model="login.username" name="username" data-vv-name="username" data-vv-as="user name" placeholder="USERNAME" />
                                    <input v-validate="{ required: true }" id="password-input" v-model="login.password" name="password" type="password" data-vv-name="password" data-vv-as="password" placeholder="PASSWORD" />
                                    <input type="submit" name="login" value="LOGIN" />
                                     <input type="button" name="daftar" value="DAFTAR" @click="registerForm" />
                                </form>
                                <!-- /Form -->
                        </div>
                    </b-col>
                </template>
                <div class="contact-wrapp-top">
                    <div class="live-chat-auth">
                        <span>
                            <img src="~/assets/media/images/icons/live-chat.png" class="img-fluid" alt="live-chat" />
                        </span>
                        <span>LIVE CHAT</span>
                    </div>
                    <div class="live-chat-auth">
                        <span>
                            <img src="~/assets/media/images/icons/live-chat.png" class="img-fluid" alt="live-chat" />
                        </span>
                        <span>test@gmail.com</span>
                    </div>
                    <div class="live-chat-auth">
                        <span>
                            <img src="~/assets/media/images/icons/live-chat.png" class="img-fluid" alt="live-chat" />
                        </span>
                        <span>85586706688</span>
                    </div>
                </div>
            </div>
            <!-- </b-col> -->

            <!-- </b-row> -->
            <Register />
        </div>
    </div>
</template>

<script>
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fasSignOut } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import moment from 'moment'
import VueRecaptcha from 'vue-recaptcha'
import Register from '~/components/auth/Register'
// library.add(fasSignOut)
export default {
	components: {
		VueRecaptcha,
		Register,
		// FontAwesomeIcon
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
.logo {
	width: 440px;
}

form.my-form input[name='username'],
form.my-form input[name='password'] {
	color: black;
}

.play {
	background: url(~assets/media/images/btn.png) no-repeat;
	width: 110px;
	position: relative;
	top: -8px;
	left: 5px;
	font-weight: bold;
}

.balance {
	background: url(~assets/media/images/bg-balance.png) no-repeat;
	text-align: center;
	/* width: 110px */
}

.dropdown-name {
	margin-right: -11px;
	margin-left: 15px;
	background-color: white;
}

#logout-icon {
	position: relative;
}

#logout-icon::before {
	content: '\f08b';
	font-family: FontAwesome;
	font-style: normal;
	font-weight: normal;
	color: #fff;
	font-size: 20px;

	position: absolute;
	left: 10px;
}

.sign-out {
	border-left: 2px solid #777243;
	float: right !important;
	cursor: pointer;
}
</style>
