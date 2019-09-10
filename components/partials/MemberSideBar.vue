<template>
    <div role="tablist">
        <b-card no-body class="mb-2">
            <h4 slot="header" class="m-0"><i class="fa fa-retweet" aria-hidden="true"></i> Transaction</h4>
            <b-list-group flush class="m-menu">

                <template v-for="item in transactions">
                    <b-list-group-item
                        v-if="!item.subitems"
                        :to="{name:'member-'+item.path}"
                        :key="item.path">{{ item.title }}</b-list-group-item>
                    <b-list-group-item
                        v-b-toggle="`sub-`+item.path"
                        v-if="item.subitems"
                        :key="item.path">{{ item.title }}
                        <span class="menu-ico-collapse"><i class="fa fa-chevron-down"></i></span>
                    </b-list-group-item>
                    <b-collapse
                        v-if="item.subitems"
                        :id="`sub-`+item.path"
                        :key="`keysub-`+item.path"
                        :visible="($route.params.marketcode)?true:false"
                        class="list-group-submenu">
                        <template v-for="sublist in item.subitems">
                            <b-list-group-item :to="{path:'/member/'+item.path+'/'+sublist.code}" :key="sublist.id">{{ sublist.name }}</b-list-group-item>
                        </template>
                    </b-collapse>

                </template>

            </b-list-group>
        </b-card>
        <b-card no-body>
            <h4 slot="header" class="m-0"><i class="fa fa-user" aria-hidden="true"></i> Profile</h4>
            <b-list-group flush class="m-menu">
                <template v-for="item in userprofiles">
                    <b-list-group-item :to="{name:'member-'+item.path}" :key="item.path">{{ item.title }}</b-list-group-item>
                </template>
            </b-list-group>
        </b-card>
    </div>
</template>

<script>
export default {
	data: () => ({
		transactions: [
			{
				title: 'Dashboard',
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
			{
				title: 'Bet Report',
				path: 'reports',
				subitems: [],
			},
		],
		itemSelected: null,
		userprofiles: [
			{
				title: 'Profile',
				path: 'profile',
			},
			{
				title: 'Bank',
				path: 'bank',
			},
			{
				title: 'Referal',
				path: 'referal',
			},
			{
				title: 'Contact',
				path: 'contact',
			},
		],
	}),

	mounted() {
		this.transactions.forEach(element => {
			if (element.path === 'reports') {
				element.subitems = this.setting.market
			}
		})
	},
}
</script>
