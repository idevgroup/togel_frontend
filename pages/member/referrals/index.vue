<template>
   <div>
       <table id="referral-link" class="table table-bordered">
           <tr>
               <td width="150" class="td-left">
                   Referral Link
               </td>   
               <td>
                 <b-link :href="referral_link" target="_black">{{ referral_link }}</b-link> 
               </td>
           </tr>   
              <tr>
               <td class="td-left">
                   Total Referral
               </td>   
               <td>
                  {{ items.length }}
               </td>
           </tr> 
       </table>   
         <b-table :items="items"  :fields="fields"
      responsive="sm" striped hover bordered sticky-header  head-variant="light" class="tbl-bet-list"></b-table>
     
   </div>   

</template>

<script>
export default {
	layout: ({ isMobile }) => (isMobile ? 'mobile' : 'member'),
	data() {
		return {
			referral_link: '',
			items: [],
			fields: [
				{ key: 'reg_name', label: 'Register Name' },
				{ key: 'reg_username', label: 'Username' },
				{ key: 'reg_date', label: 'Register Date' },
			],
		}
	},
	mounted() {
		this.referral_link =
			location.origin +
			'?refer=' +
			this.user.id +
			'-' +
			this.user.reg_username
		this.getReferral()
	},

	methods: {
		async getReferral() {
			const { data } = await this.$axios.$post('/member/getreferral')
			this.items = data
		},
	},
}
</script>

<style scoped>
table#referral-link {
	color: #fff;
}

table#referral-link td.td-left {
	background-color: #5f6061;
}
</style>
