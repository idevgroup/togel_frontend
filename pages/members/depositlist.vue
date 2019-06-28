<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>{{ $t("transaction") }}</v-toolbar-title>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="transItems"
      disable-initial-sort
      :loading="loading"
    >
      <template v-slot:items="props">
        <td>{{ props.item.transactionid }}</td>
        <td>{{ props.item.transactiondate }}</td>
        <td>{{ $t(props.item.transtype) }}</td>
        <td class="text-right">{{ props.item.amount }}</td>
        <td>
          <v-chip
            v-if="props.item.status === 0"
            color="orange"
            label
            text-color="white"
          >
            Pending
          </v-chip>
          <v-chip
            v-if="props.item.status === 1"
            color="green"
            label
            text-color="white"
          >
            Approval
          </v-chip>
          <v-chip
            v-if="props.item.status === 2"
            color="red"
            label
            text-color="white"
          >
            Reject
          </v-chip>
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
  name: "DepositListView",
  data: () => ({
    form: new Form({
      memberid: ""
    }),
    loading: false,
    headers: [
      {
        text: "Trans-ID",
        align: "left",
        value: "transactionid"
      },
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
      { text: "Status", value: "id", sortable: false }
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
          Swal.fire("Oops...", "Something went wrong!\t" + error, "error")
        })
        .finally(() => (this.loading = false))
      this.transItems = data
    }
  }
}
</script>

<style>
.text-right {
  text-align: right;
}
</style>
