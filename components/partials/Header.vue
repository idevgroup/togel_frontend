<template>
    <div class="mt-3">
        <div id="contact-wrap" class="contact-wrap"  style="left: -190px" >
            <div class="contact">

            </div>
        </div>
        <div id="contact-wrap-right" class="contact-wrap-right"  style="right: -190px">
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
                        <b-img src="~/assets/media/images/logo.png" class="img-fluid" alt="logo" />
                    </div>
                </b-col>
                <b-col class="mt-4 pull-right form-wrap">
                    <div class="row">
                                    <div class="col-sm-12 col-md-6 col-lg-6 pr-0 live-chat-wrap">
                                        <div class="live-chat ml-5">
                                            <p class="live-chat"><span>LIVE CHAT</span><span><img
                                                    src="~/assets/media/images/icons/live-chat.png" class="img-fluid"
                                                    alt="live-chat"></span></p>
                                        </div>
                                        <div class="timezone mt-4 ml-2">
                                            <p>{{currentTime}} (GMT+7)</p>
                                            <!-- {{currentTime}} -->
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-6 col-lg-6 ml-0">
                                        <!-- Form -->
                                        <form method="POST" action="#" class="my-form">
                                            <input type="text" name="txtUsername" placeholder="USERNAME">
                                            <input type="password" name="txtPassword" placeholder="PASSWORD" />
                                            <div class="clear"></div>
                                            <!-- <button class="daftar hvr-wobble-skew" name="daftar"></button>
                                            <button class="login hvr-wobble-skew" name="login"></button> -->
                                            <input type="button" name="daftar" value="DAFTAR" />
                                            <input type="button" name="login" value="LOGIN" />
                                        </form>
                                        <!-- /Form -->
                                    </div>
                                </div>
                </b-col>
            </b-row>
        </b-container>
    </div>

</template>

<script>
import moment from 'moment'
export default {
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
    }),
    created() {
        this.currentTime = moment().format('YYYY/MM/DD H:mm:ss')
        let vm = this
        setInterval(() => vm.updateCurrentTime(), 1 * 1000)
    },
    methods: {
        updateCurrentTime() {
            this.currentTime = moment().format('YYYY/MM/DD H:mm:ss')
        },
        async logoutSubmit() {
            await this.$auth.logout()
        },

    },
}
</script>

<style>
</style>
