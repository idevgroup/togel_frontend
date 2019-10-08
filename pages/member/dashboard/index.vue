<template>

    <transaction-list ></transaction-list>

</template>

<script>
import TransactionList from '~/components/member/TransactionList.vue'
export default {
	layout: ({ isMobile }) => (isMobile ? 'mobile' : 'member'),
	components: {
		TransactionList,
	},
}
</script>

<style>
</style>
