<template>
	<v-layout row wrap>
		<v-flex ma-3>
			<transaction-list />
		</v-flex>
	</v-layout>
</template>

<script>
import transactionList from "./transactionlist"
export default {
	name: "DashboardView",
	layout: "members",
	components: {
		transactionList
	},
	head() {
		return { title: this.$t("dashboard") }
	}
}
</script>
