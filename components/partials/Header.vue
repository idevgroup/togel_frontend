<template>

    <div class="pre-header">
        <b-container>
            <b-row>
                <b-col class="additional-shop-info">
                    <b-nav class="list-unstyled list-inline">
                        <b-nav-item><i class="fa fa-phone"></i><span>+1 456 6717</span></b-nav-item>
                        <b-nav-item><i class="fa fa-envelope-o"></i><span>info@keenthemes.com</span></b-nav-item>
                    </b-nav>
                </b-col>
                <b-col class="additional-nav">
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
                                    <b-dropdown-item to="#" :key="item.path">{{ item.title }}</b-dropdown-item>
                                </template>
                                  <b-dropdown-divider></b-dropdown-divider>
                                <b-dropdown-item to="#" @click="logoutSubmit">Logout</b-dropdown-item>

                            </b-nav-item-dropdown>

                        </b-nav>
                    </template>
                    <template v-else>
                        <b-nav class="list-unstyled list-inline pull-right">
                            <b-nav-item v-b-modal.modal-login> Log In</b-nav-item>
                            <b-nav-item v-b-modal.modal-register>Registration</b-nav-item>
                        </b-nav>
                    </template>

                </b-col>
            </b-row>
        </b-container>
    </div>

</template>

<script>
import {
    mapGetters
} from "vuex"
export default {
    data: () => ({
        transactions: [
            {
                title: 'Deposit',
                path: "deposit"
            },
            {
                title: 'Withdraw',
                path: "withdraw"
            }
        ],
        itemSelected: null,
        userprofiles: [{
                title: 'Bank',
                path: "bank"
            },
            {
                title: 'Referal',
                path: "referrals"
            },
            {
                title: 'Contact',
                path: "contact"
            }
        ]
    }),
    computed:{
  ...mapGetters({
            setting: "frontendconfig/setting"
        })
    },
    methods: {
        async logoutSubmit() {
            await this.$auth.logout()
        }
    }
};
</script>

<style>
</style>
