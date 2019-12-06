<template>
    <div>
        <b-col md="9" class="ml-auto mr-auto mt-auto mb-auto">
            <b-tabs fill>
                <b-tab title="Profile" active>
                    <b-row>
                        <b-col sm="3">
                            <label for="input-fullname">Full Name:</label>
                        </b-col>
                        <b-col sm="9">
                            <b-form-input
                                id="input-fullname"
                                v-model="form.fullname"
                                size="sm"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="mt-1">
                        <b-col sm="3">
                            <label for="input-username">Username:</label>
                        </b-col>
                        <b-col sm="9">
                            <b-form-input
                                id="input-username"
                                v-model="form.username"
                                disabled
                                size="sm"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="mt-1">
                        <b-col sm="3">
                            <label for="input-email">Email:</label>
                        </b-col>
                        <b-col sm="9">
                            <b-form-input
                                id="input-email"
                                v-model="form.email"
                                disabled
                                size="sm"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="mt-1">
                        <b-col sm="3">
                            <label for="input-phone">Phone:</label>
                        </b-col>
                        <b-col sm="9">
                            <b-form-input
                                id="input-phone"
                                v-model="form.phone"
                                size="sm"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="mt-1">
                        <b-col sm="3">
                            <label></label>
                        </b-col>
                        <b-col sm="9">
                            <b-button variant="success" @click="updateProfile">Update</b-button>
                        </b-col>
                    </b-row>

                </b-tab>
                <b-tab title="Change Password">
                    <b-row class="mt-1">
                        <b-col sm="4">
                            <label for="input-cpassword">Current Password:</label>
                        </b-col>
                        <b-col sm="8">
                            <b-form-input
                                v-validate="{ required: true }"
                                id="input-cpassword"
                                v-model="form.currentpwd"
                                type="password"
                                data-vv-name="currentpassword"
                                data-vv-as="Current password"
                                size="sm"></b-form-input>
                            <span v-show="veeErrors.has('currentpassword')" class="form-text text-danger">{{ veeErrors.first('currentpassword') }}</span>
                        </b-col>
                    </b-row>
                    <b-row class="mt-1">
                        <b-col sm="4">
                            <label for="input-newpassword">New Password:</label>
                        </b-col>
                        <b-col sm="8">
                            <b-form-input
                                v-validate="{ required: true }"
                                id="input-newpassword"
                                ref="password"
                                v-model="form.password"
                                type="password"
                                data-vv-name="password"
                                data-vv-as="password"
                                size="sm"></b-form-input>
                            <span v-show="veeErrors.has('password')" class="form-text text-danger">{{ veeErrors.first('password') }}</span>
                        </b-col>
                    </b-row>
                    <b-row class="mt-1">
                        <b-col sm="4">
                            <label for="input-compassword">Comfirm Password:</label>
                        </b-col>
                        <b-col sm="8">
                            <b-form-input
                                v-validate="{required:true,confirmed:'password'}"
                                id="input-compassword"
                                v-model="form.comfirmpassword"
                                type="password"
                                data-vv-name="confirmed"
                                data-vv-as="password confirm"
                                size="sm"></b-form-input>
                            <span v-show="veeErrors.has('confirmed')" class="form-text text-danger">{{ veeErrors.first('confirmed') }}</span>
                        </b-col>
                    </b-row>
                    <b-row class="mt-1">
                        <b-col sm="4">
                            <label></label>
                        </b-col>
                        <b-col sm="8">
                            <b-button variant="success" @click="updatePassword">Update</b-button>
                        </b-col>
                    </b-row>
                </b-tab>

            </b-tabs>
        </b-col>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
	layout: ({ isMobile }) => (isMobile ? 'mobile' : 'member'),
	data() {
		return {
			form: {
				fullname: '',
				username: '',
				email: '',
				phone: '',
				password: '',
				currentpwd: '',
				comfirmpassword: '',
			},
		}
	},
	mounted() {
		let self = this
		self.form.fullname = this.user.reg_name
		self.form.username = this.user.reg_username
		self.form.email = this.user.reg_email
		self.form.phone = this.user.reg_phone
	},
	methods: {
		async updateProfile() {
			let self = this
			const input = {
				fullname: self.form.fullname,
				phone: self.form.phone,
			}
			const data = await this.$axios.$post('/member/updateprofile', input)
			if (data.status)
				Swal.fire('Profile', 'Profile has been updated', 'info')
		},
		updatePassword() {
			this.$validator.validateAll().then(result => {
				let self = this
				if (result) {
					const input = {
						currentpwd: self.form.currentpwd,
						newpassword: self.form.password,
						confirmation: self.form.comfirmpassword,
					}
					this.$axios
						.$post('/member/updatepassword', input)
						.then(data => {
							if (data.status) {
								Swal.fire(
									'Password',
									'Password has been updated',
									'info'
								)
								this.$auth.reset()
								this.$auth.logout()
							}
						})
				}
			})
		},
	},
}
</script>

<style>
.nav-tabs .nav-link {
	border: none;
	border-top-left-radius: 0;
	border-top-right-radius: 0;
	font-size: 18px;
	line-height: 35px;
}

.nav-tabs {
	border-color: #eaeaea;
	padding-bottom: 1px;
	font-size: 14px;
	margin-bottom: 0;
}
.text-danger {
	color: #ae0016 !important;
	position: relative;
}
</style>>
