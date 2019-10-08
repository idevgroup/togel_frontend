<template>
    <b-card no-body bg-variant="light" class="mb-2">
        <h4 slot="header" class="m-0"><i class="fa fa-retweet" aria-hidden="true"></i> Transaction</h4>
        <vue-bootstrap4-table
            :rows="transactionItem"
            :columns="heasders"
            :config="config"
            :classes="classes"
            small
        >
            <template slot="status" slot-scope="props">
                <b-badge v-if="props.cell_value === ''" variant="info">Success</b-badge>
                <b-badge v-if="props.cell_value === 1" variant="primary">Approved</b-badge>
                <b-badge v-if="props.cell_value === 2" variant="danger">Reject</b-badge>
                <b-badge v-if="props.cell_value === 0" variant="warning">Pending</b-badge>
            </template>
            <template slot="transtype" slot-scope="props">
                {{ props.cell_value.toUpperCase()  }}
            </template>
        </vue-bootstrap4-table>
    </b-card>
</template>

<script>
import Swal from 'sweetalert2'
import VueBootstrap4Table from 'vue-bootstrap4-table'
export default {
	name: 'TransactionListView',
	components: {
		VueBootstrap4Table,
	},
	data: () => ({
		heasders: [
			{
				name: 'transactiondate',
				label: 'Trans-Date',
				sort: true,
				initial_sort_order: 'desc',
				initial_sort: true,
				row_text_alignment: 'text-left',
			},
			{
				name: 'transtype',
				label: 'Trans-Is',
				sort: true,
				row_text_alignment: 'text-left',
			},
			{
				name: 'amount',
				label: 'Amount',
				sort: true,
				row_text_alignment: 'text-right',
			},
			{
				name: 'status',
				label: 'Status',
			},
		],
		transactionItem: [],

		config: {
			selected_rows_info: true,
			show_refresh_button: false,
			show_reset_button: false,
			pagination_info: false,
			pagination: true,
			per_page: 10,
			preservePageOnDataChange: true,
			highlight_row_hover_color: 'rgba(0, 0, 0, 0.06)',
			card_mode: false,
		},
		classes: {
			table: 'table-bordered table-striped tbl-bet-list',
		},
	}),

	mounted() {
		this.initialize()
	},
	methods: {
		async initialize() {
			let self = this
			this.loading = true
			await this.$axios
				.$post('member/dashboard', {
					memberid: this.user.id,
				})
				.then(function(response) {
					self.transactionItem = response.data
				})
				.catch(function(error) {
					Swal.fire(
						'Oops...',
						'Something went wrong!\t' + error,
						'error'
					)
				})
				.finally(() => (this.loading = false))
		},
	},
}
</script>

<style>
.show.vbt-per-page-dropdown,
div.input-group.col-sm-2 {
	display: none !important;
}
</style>
