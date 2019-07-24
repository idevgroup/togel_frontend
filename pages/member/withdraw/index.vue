<template>
    <b-card no-body bg-variant="light">
        <h4 slot="header" class="m-0"><i class="fa fa-money"></i> Withdraw</h4>
        <b-col lg="9" class="m-auto">
            <b-form @submit.stop.prevent="doWithdraw">
                <b-form-group
                    label-cols-sm="4"
                    label-cols-lg="3"
                    label="Bank:"
                    label-for="input-bank"
                    label-class="font-weight-bold"
                    class="mt-2">
                    <b-form-select
                        id="input-bank"
                        name="bank"
                        v-model="selectedMemberBank"
                        :options="memberBank"
                        value-field="id"
                        text-field="bank"
                        v-validate="{ required: true }"
                        data-vv-name="bank"
                        data-vv-as="bank"></b-form-select>
                    <span class="form-text text-danger" v-show="veeErrors.has('bank')">{{ veeErrors.first('bank') }}</span>
                </b-form-group>

                <b-form-group
                    label-cols-sm="4"
                    label-cols-lg="3"
                    label="Amount:"
                    label-for="input-amount"
                    label-class="font-weight-bold">
                    <money
                        id="input-amount"
                        name="amount"
                        v-model="amountWithdraw"
                        v-bind="formatmoney"
                        class="form-control"
                        v-validate="{ required: true,is_not:0 }"
                        data-vv-name="amount"
                        data-vv-as="amount">
                    </money>
                    <span class="form-text text-danger" v-show="veeErrors.has('amount')">{{ veeErrors.first('amount') }}</span>
                </b-form-group>
                <b-form-group
                    label-cols-sm="4"
                    label-cols-lg="3"
                    label="Message:"
                    label-for="input-message"
                    label-class="font-weight-bold">
                    <b-form-textarea
                        v-model="messageWithdraw"
                        id="input-message"
                        name="message"
                        placeholder="Enter message..."
                        rows="3"
                        max-rows="6"
                        v-validate="{ min:10 }"
                        data-vv-name="message"
                        data-vv-as="message">
                        ></b-form-textarea>
                    <span class="form-text text-danger" v-show="veeErrors.has('message')">{{ veeErrors.first('message') }}</span>
                </b-form-group>

                <b-form-group
                    label-cols-sm="4"
                    label-cols-lg="3"
                    label="">
                    <VueRecaptcha
                        ref="recaptcha"
                        name="recapcha"
                        v-model="recaptcha"
                        :sitekey="recaptchaKey"
                        @verify="onVerify"
                        @expired="resetCaptcha"
                        v-validate="{ required:true }"
                        data-vv-name="recapcha"
                        data-vv-as="recapcha" />

                    <span class="form-text text-danger" v-show="veeErrors.has('recapcha')">{{ veeErrors.first('recapcha') }}</span>
                </b-form-group>

                <b-form-group
                    label-cols-sm="4"
                    label-cols-lg="3"
                    label="">
                    <b-button
                        type="submit"
                        variant="primary"
                        :disabled="veeErrors.any()">Submit</b-button>
                </b-form-group>
            </b-form>
        </b-col>
    </b-card>
</template>

<script>
import {
    mapGetters
} from "vuex";
import {
    Money
} from "v-money";
import VueRecaptcha from "vue-recaptcha";

export default {
    layout: "member",
    components: {
        Money,
        VueRecaptcha
    },
    data: () => ({
        memberBank: [],
        selectedMemberBank: null,
        amountWithdraw: '',
        messageWithdraw: "",
        recaptcha: "",
        recaptchaKey: '',
        formatmoney: {
            decimal: ".",
            thousands: ",",
            prefix: "$ ",
            suffix: "",
            precision: 2,
            masked: false,
            allowBlank: false
        }
    }),
    computed: {
        ...mapGetters({
            setting: "frontendconfig/setting"
        }),
    },
    mounted() {
        this.getMemberBank();
    },
    created() {
        this.recaptchaKey = process.env.RECAPTCHA_KEY;
        this.formatmoney.prefix = this.setting.general.symbol + " ";
    },
    methods: {
        onVerify(response) {
            let self = this;
            self.recaptcha = response;
        },
        resetCaptcha() {
            this.$refs.recaptcha.reset();
        },
        async getMemberBank() {
            await this.$axios.$post("member/getmemberbank").then(response => {
                this.memberBank = response;
            });
        },
        async doWithdraw() {

            this.$validator.validateAll().then((response) => {
                if (response) {
                    let self = this
                    try {
                        const input = {
                            amount: self.amountWithdraw,
                            recaptcha: self.recaptcha,
                            note: self.messageWithdraw,
                            memberbank: self.selectedMemberBank
                        }
                        this.$axios.$post('member/withdraw', input).catch(function (error) {
                            self.recaptcha = ''
                            self.$refs.recaptcha.reset();
                        }).then((response) => {
                            if (response.data.success === false) {
                                Swal.fire(response.data.alert.title, response.data.alert.message, "info")
                            } else {
                                Swal.fire(response.data.alert.title, response.data.alert.message, "success")
                            }
                            //refresh user account to update balance
                            this.$auth.fetchUser()
                            // Redirect member dashboard.
                            this.$router.push({
                                name: "member-dashboard"
                            })
                        })
                    } catch (error) {
                        self.recaptcha = ''
                        self.$refs.recaptcha.reset();
                    }
                }
            })
        }
    }
};
</script>

<style>

</style>
