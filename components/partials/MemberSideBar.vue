<template>
    <div role="tablist">
        <b-card no-body class="mb-2">
            <h4 slot="header" class="m-0"><i class="fa fa-retweet" aria-hidden="true"></i> Transaction</h4>
            <b-list-group flush class="m-menu">
                <template v-for="item in transactions">
                    <b-list-group-item :to="{name:'member-'+item.path}" :key="item.path">{{ item.title }}</b-list-group-item>
                </template>
            </b-list-group>
        </b-card>
        <b-card no-body>
            <h4 slot="header" class="m-0"><i class="fa fa-user" aria-hidden="true"></i> Profile</h4>
            <b-list-group flush class="m-menu">
                <template v-for="item in userprofiles">
                    <b-list-group-item to="#" :key="item.path">{{ item.title }}</b-list-group-item>
                </template>
            </b-list-group>
        </b-card>
    </div>
</template>

<script>
import {
    mapGetters
} from "vuex"
export default {
    data: () => ({
        marketItem: [],
        transactions: [{
                title: 'Dashboard',
                path: 'dashboard'
            },
            {
                title: 'Deposit',
                path: "deposit"
            },
            {
                title: 'Withdraw',
                path: "withdraw"
            },
            {
                title: 'Report',
                path: "reports"
            }
        ],
        itemSelected: null,
        userprofiles: [{
                title: 'Profile',
                path: "profile"
            },
            {
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
    computed: {
        ...mapGetters({
            setting: "frontendconfig/setting"
        })
    },
    mounted() {
        this.marketItem = this.setting.market
    }
}
</script>

<style scoped>
.fa.fa-minus {
    margin-right: 10px;
}

.m-menu.list-group a::before {
    content: "";
    font-size: 8px;
    padding-right: 10px;
    position: relative;
    top: -1px;
    font-family: FontAwesome !important;
}
</style>
