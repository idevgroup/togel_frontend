<template>
    <div class="mt-3">
        <div id="contact-wrap" class="contact-wrap" style="left: -190px">
            <div class="contact"></div>
        </div>
        <div id="contact-wrap-right" class="contact-wrap-right" style="right: -190px">
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
                    <b-img src="~/assets/media/images/logo.png" class="img-fluid" alt="logo" />
                </div>
            </div>
            <!-- </b-col> -->
            <template v-if="authenticated">
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
                    <div class="profile-wrap">
                        <div class="profile">
                            <p>
                                Hello,
                                <a href="#">Lyhuoth</a>
                            </p>
                        </div>
                        <div class="money">
                            <p>IDR:</p>
                            <b-dropdown>
                                <template v-slot:button-content>0.00</template>
                                <b-dropdown-item href="#">An item</b-dropdown-item>
                                <b-dropdown-item href="#">Another item</b-dropdown-item>
                            </b-dropdown>
                        </div>
                        <div class="money">
                            <b-dropdown>
                                <template v-slot:button-content>
                                    Wallet
                                    <span class="badge badge-danger news-notification">1</span>
                                </template>
                                <b-dropdown-item href="#">An item</b-dropdown-item>
                                <b-dropdown-item href="#">Another item</b-dropdown-item>
                            </b-dropdown>
                        </div>
                        <div class="sign-out">
                              <!-- <font-awesome-icon icon="fas-sign-out" /> -->
                            <!-- <li class="far fa-sign-out-alt"><a href="#">asdasd</a></li> -->
                            <!-- <li class="far fa-sign-out-alt"></li>
                            <li class="fal fa-sign-out-alt"></li>
                            <li class="fas fa-sign-out-alt"></li>
                            <li class="fad fa-sign-out-alt"></li>-->
                        </div>
                    </div>
                    <div class="clear"></div>
                    <div class="contact-wrapp-top">
                        <div class="live-chat-auth">
                            <span>
                                <img
                                    src="~/assets/media/images/icons/live-chat.png"
                                    class="img-fluid"
                                    alt="live-chat"
                                />
                            </span>
                            <span>LIVE CHAT</span>
                        </div>
                        <div class="live-chat-auth">
                            <span>
                                <img
                                    src="~/assets/media/images/icons/live-chat.png"
                                    class="img-fluid"
                                    alt="live-chat"
                                />
                            </span>
                            <span>test@gmail.com</span>
                        </div>
                        <div class="live-chat-auth">
                            <span>
                                <img
                                    src="~/assets/media/images/icons/live-chat.png"
                                    class="img-fluid"
                                    alt="live-chat"
                                />
                            </span>
                            <span>85586706688</span>
                        </div>
                    </div>
                </div>
                <!-- </b-col> -->
            </template>
            <template v-else>
                <b-col class="mt-4 pull-right form-wrap">
                    <div class="row">
                        <div class="col-sm-12 col-md-6 col-lg-6 pr-0 live-chat-wrap">
                            <div class="live-chat ml-5">
                                <p class="live-chat">
                                    <span>LIVE CHAT</span>
                                    <span>
                                        <img
                                            src="~/assets/media/images/icons/live-chat.png"
                                            class="img-fluid"
                                            alt="live-chat"
                                        />
                                    </span>
                                </p>
                            </div>
                            <div class="timezone mt-4 ml-2">
                                <p>{{currentTime}} (GMT+7)</p>
                                <!-- {{currentTime}} -->
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-6 ml-0 pr-0 pl-0 mt-3">
                            <!-- Form -->
                            <form ref="form" class="my-form" @submit.stop.prevent="loginSubmit">
                                <input
                                    v-validate="{ required: true }"
                                    id="username-input"
                                    v-model="login.username"
                                    name="username"
                                    data-vv-name="username"
                                    data-vv-as="user name"
                                    placeholder="USERNAME"
                                />
                                <input
                                    v-validate="{ required: true }"
                                    id="password-input"
                                    v-model="login.password"
                                    name="password"
                                    type="password"
                                    data-vv-name="password"
                                    data-vv-as="password"
                                    placeholder="PASSWORD"
                                />

                                <div class="clear"></div>
                                <!-- <button class="daftar hvr-wobble-skew" name="daftar"></button>
                                <button class="login hvr-wobble-skew" name="login"></button>-->
                                <input
                                    type="button"
                                    name="daftar"
                                    value="DAFTAR"
                                    @click="registerForm"
                                />
                                <input type="submit" name="login" value="LOGIN" />
                            </form>
                            <!-- /Form -->
                        </div>
                    </div>
                </b-col>
            </template>
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
    text-align: center;
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
</style>
