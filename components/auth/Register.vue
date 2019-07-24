<template>
    <div>
        <b-modal
            id="modal-register"
            title="Member Register "
            ok-only
            @ok="handleOk"
            @show="resetModal"
            @hidden="resetModal">
            <form ref="form" @submit.stop.prevent="registerSubmit">
                <b-form-group label="Name" label-for="ame-input">
                    <b-form-input
                        id="name-input"
                        name="name"
                        v-model="form.name"
                        v-validate="{ required: true }"
                        data-vv-name="name"
                        data-vv-as="name">
                        ></b-form-input>
                    <span class="form-text text-danger" v-show="veeErrors.has('name')">{{ veeErrors.first('name') }}</span>
                </b-form-group>
                <b-form-group label="User Name" label-for="username-input">
                    <b-form-input
                        id="username-input"
                        name="username"
                        v-model="form.username"
                        v-validate="{ required: true }"
                        data-vv-name="username"
                        data-vv-as="username">
                        ></b-form-input>
                    <span class="form-text text-danger" v-show="veeErrors.has('username')">{{ veeErrors.first('username') }}</span>
                </b-form-group>
                <b-form-group label="Email" label-for="email-input">
                    <b-form-input
                        id="email-input"
                        name="email"
                        v-model="form.email"
                        v-validate="{ required: true,email:true }"
                        type="email"
                        data-vv-name="email"
                        data-vv-as="email">
                        ></b-form-input>
                    <span class="form-text text-danger" v-show="veeErrors.has('email')">{{ veeErrors.first('email') }}</span>
                </b-form-group>
                <b-form-group label="Password" label-for="password-input">
                    <b-form-input
                        id="password-input"
                        name="password"
                        ref="password"
                        v-model="form.password"
                        type="password"
                        v-validate="{ required: true }"
                        data-vv-name="password"
                        data-vv-as="password">
                        ></b-form-input>
                    <span class="form-text text-danger" v-show="veeErrors.has('password')">{{ veeErrors.first('password') }}</span>
                </b-form-group>
                <b-form-group label="Password Confirm" label-for="confirm-input">
                    <b-form-input
                        id="confirm-input"
                        name="confirmed"
                        v-model="form.password_confirmation"
                        type="password"
                        v-validate="{required:true,confirmed:'password'}"
                        data-vv-name="confirmed"
                        data-vv-as="password confirm">
                        ></b-form-input>
                    <span class="form-text text-danger" v-show="veeErrors.has('confirmed')">{{ veeErrors.first('confirmed') }}</span>
                </b-form-group>
                <b-form-group label="Phone" label-for="phone-input">
                    <b-form-input
                        id="phone-input"
                        name="phone"
                        v-model="form.phone"
                        v-validate="{ required: true }"
                        type="tel"
                        data-vv-name="phone"
                        data-vv-as="phone">
                        ></b-form-input>
                    <span class="form-text text-danger" v-show="veeErrors.has('phone')">{{ veeErrors.first('phone') }}</span>
                </b-form-group>
                <b-form-group label="Bank Info" label-for="bank-input">
                    <b-form-select
                        id="bank-input"
                        name="bank"
                        v-model="form.bank"
                        :options="itemBank"
                        value-field="id"
                        text-field="bk_name"
                        v-validate="{ required: true }"
                        data-vv-name="bank"
                        data-vv-as="bank info"></b-form-select>
                    <span class="form-text text-danger" v-show="veeErrors.has('bank')">{{ veeErrors.first('bank') }}</span>
                </b-form-group>
                <b-form-group label="Account Name" label-for="accountname-input">
                    <b-form-input
                        id="accountname-input"
                        name="accountname"
                        v-model="form.accountname"
                        v-validate="{ required: true }"
                        data-vv-name="accountname"
                        data-vv-as="account name">
                        ></b-form-input>
                    <span class="form-text text-danger" v-show="veeErrors.has('accountname')">{{ veeErrors.first('accountname') }}</span>
                </b-form-group>
                <b-form-group label="Account Number" label-for="account-input">
                    <b-form-input
                        id="account-input"
                        name="accountid"
                        v-model="form.accountid"
                        v-validate="{ required: true }"
                        type="number"
                        data-vv-name="accountid"
                        data-vv-as="account">
                        ></b-form-input>
                    <span class="form-text text-danger" v-show="veeErrors.has('accountid')">{{ veeErrors.first('accountid') }}</span>
                </b-form-group>
                <b-form-group>
                    <VueRecaptcha
                        ref="recaptcha"
                        name="recapcha"
                        v-model="form.recaptcha"
                        :sitekey="recaptchaKey"
                        @verify="onVerify"
                        @expired="resetCaptcha"
                        v-validate="{ required:true }"
                        data-vv-name="recapcha"
                        data-vv-as="recapcha" />
                    <span class="form-text text-danger" v-show="veeErrors.has('recapcha')">{{ veeErrors.first('recapcha') }}</span>
                </b-form-group>
            </form>
        </b-modal>
    </div>
</template>

<script>
import {
    mapGetters
} from "vuex";
import VueRecaptcha from "vue-recaptcha";
export default {
    components: {
        VueRecaptcha
    },
    data() {
        return {
            form: {
                name: '',
                username: '',
                password: '',
                email: '',
                password_confirmation: '',
                phone: '',
                bank: '',
                accountid: '',
                accountname: '',
                recaptcha: ''
            },
            recaptchaKey: '',
            itemBank: []
        }
    },
    computed: {
        ...mapGetters({
            setting: "frontendconfig/setting"
        }),
    },
    created() {
        this.recaptchaKey = process.env.RECAPTCHA_KEY
        this.itemBank = this.setting.bank
    },
    methods: {
        onVerify(response) {
            let self = this;
            self.form.recaptcha = response;
        },
        resetCaptcha() {
            this.$refs.recaptcha.reset();
        },
        resetModal() {
            this.form.name = ''
            this.form.username = ''
            this.form.password = ''
            this.form.email = ''
            this.form.password_confirmation = ''
            this.form.phone = ''
            this.form.bank = ''
            this.form.accountid = ''
            this.form.accountname = ''
            this.form.recaptcha = ''

        },
        handleOk(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            this.registerSubmit()
        },
        async registerSubmit() {
            this.$validator.validateAll().then((result) => {
                let self = this
                if (result) {
                    try {
                        this.$axios.$post('member/register', self.form).then(() => {
                            this.$auth.loginWith('local', {
                                data: {
                                    username: self.form.username,
                                    password: self.form.password
                                }
                            }).then(() => {
                                this.$router.push({
                                    name: 'member-dashboard'
                                })
                                this.$nextTick(() => {
                                    this.$refs.modal.hide()
                                })
                            }).catch(function (error) {
                                console.log(error)
                            })
                        }).catch(() => {
                             this.$refs.recaptcha.reset();
                        })

                    } catch (e) {
                        console.log(e)
                    }
                }
            })
        }
    }
}
</script>
