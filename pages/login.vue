<template>
    <div>

        <b-card
            id="login-frm"
            title="Login"
            class="mt-5 mr-5 ml-5">
            <button type="button" class="close-rg" aria-label="Close" @click="backbtn">
                <span aria-hidden="true">&times;</span>
            </button>
            <form
                ref="form"
                class="my-form"
                @submit.stop.prevent="loginSubmit">
                <b-row class="my-1">
                    <b-col sm="2">
                        <label for="input-username">Username:</label>
                    </b-col>
                    <b-col sm="10">
                        <b-form-input
                            id="input-username"
                            v-model="login.username"
                            size="sm"
                            placeholder="Enter Username"
                            name="name"
                            data-vv-name="username"
                            data-vv-as="user name"></b-form-input>
                    </b-col>
                </b-row>

                <b-row class="my-1">
                    <b-col sm="2">
                        <label for="input-password">Password:</label>
                    </b-col>
                    <b-col sm="10">
                        <b-form-input
                            id="input-password"
                            v-model="login.password"
                            size="sm"
                            placeholder="Enter Password"
                            name="pwd"
                            type="password"
                            data-vv-name="password"
                            data-vv-as="password"></b-form-input>
                    </b-col>
                </b-row>
                <b-row class="my-1">
                    <b-col>
                        <input type="submit" name="login" value="LOGIN" />
                    </b-col>
                </b-row>
            </form>
        </b-card>

    </div>
</template>

<script>
export default {
	layout: 'mobilehome',
	data: () => ({
		login: {
			username: '',
			password: '',
		},
	}),
	methods: {
		async loginSubmit() {
			this.$validator.validateAll().then(result => {
				if (result) {
					try {
						this.$auth
							.loginWith('local', {
								data: this.login,
							})
							.then(() => {
								this.$router.push({
									name: 'member-dashboard',
								})
							})
							.catch(function(error) {
								console.log(error)
							})
					} catch (e) {
						console.log(e)
					}
				}
			})
		},
		backbtn() {
			this.$router.push({
				name: 'index',
			})
		},
	},
}
</script>
