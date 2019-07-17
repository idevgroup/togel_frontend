<template>
	<div>
		<v-toolbar flat color="white">
			<v-toolbar-title>{{ $t("transaction") }}</v-toolbar-title>
		</v-toolbar>
		<v-data-table
			:headers="headers"
			:items="transItems"
			:pagination.sync="pagination"
			:loading="loading"
		>
			<template v-slot:headers="props">
				<tr>
					<th
						v-for="header in props.headers"
						:key="header.text"
						:class="[
							'column sortable',
							pagination.descending ? 'desc' : 'asc',
							header.value === pagination.sortBy ? 'active' : ''
						]"
						@click="changeSort(header.value)"
					>
						<v-icon small>arrow_upward</v-icon>
						{{ header.text }}
					</th>
				</tr>
			</template>
			<template v-slot:items="props">
				<td>{{ props.item.transactiondate }}</td>
				<td>{{ props.item.transtype.toUpperCase() }}</td>
				<td class="text-right">{{ props.item.amount }}</td>
				<td>
					<strong
						v-if="props.item.status === 0"
						class="green--text text--darken-4"
					>
						Pending
					</strong>
					<strong
						v-if="props.item.status === 1"
						class="blue--text text--darken-4"
					>
						Approved
					</strong>
					<strong
						v-if="props.item.status === 2"
						class="red--text text--darken-4"
					>
						Reject
					</strong>
				</td>
			</template>
		</v-data-table>
	</div>
</template>

<script>
import { mapGetters } from "vuex"
import Form from "vform"
import Swal from "sweetalert2"
export default {
	middleware: "auth",
	name: "TransactionListView",
	data: () => ({
		form: new Form({
			memberid: ""
		}),
		pagination: {
			sortBy: "transactiondate",
			descending: true
		},
		loading: false,
		headers: [
			{
				text: "Trans-Date",
				align: "left",
				value: "transactiondate"
			},
			{
				text: "Trans-Is",
				align: "left",
				value: "transtype"
			},
			{ text: "Amount", value: "amount", align: "right" },
			{ text: "Status", value: "status" }
		],
		transItems: []
	}),
	computed: mapGetters({
		user: "auth/user"
	}),
	created() {
		this.initialize()
	},

	methods: {
		async initialize() {
			this.loading = true
			this.form.memberid = this.user.id
			const { data } = await this.form
				.post("member/dashboard")
				.catch(function(error) {
					Swal.fire(
						"Oops...",
						"Something went wrong!\t" + error,
						"error"
					)
				})
				.finally(() => (this.loading = false))
			this.transItems = data
		},
		changeSort(column) {
			if (this.pagination.sortBy === column) {
				this.pagination.descending = !this.pagination.descending
			} else {
				this.pagination.sortBy = column
				this.pagination.descending = false
			}
		}
	}
}
</script>

<style>
.text-right {
	text-align: right;
}
</style>
