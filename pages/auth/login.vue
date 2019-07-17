<template>
	<v-layout row>
		<v-flex xs12 sm8 lg5 mt-5 ma-auto>
			<v-card>
				<progress-bar :show="busy" />
				<form @submit.prevent="login" @keydown="form.onKeydown($event)">
					<v-card-title primary-title>
						<h3 class="headline mb-0">
							{{ $t("login") }}
						</h3>
					</v-card-title>
					<v-card-text>
						<!-- Email -->
						<text-input
							v-validate="'required'"
							:form="form"
							:label="$t('username')"
							:v-errors="errors"
							:value.sync="form.username"
							name="username"
							prepend="person_outline"
						/>

						<!-- Password -->
						<password-input
							v-validate="'required|min:8'"
							:label="$t('password')"
							:v-errors="errors"
							:form="form"
							:value.sync="form.password"
							prepend="lock_outline"
						/>

						<!-- Remember Me -->
						<v-checkbox
							v-model="remember"
							:label="$t('remember_me')"
							color="primary"
							type="checkbox"
							value="true"
						/>

						<submit-button
							:block="true"
							:form="form"
							:label="$t('login')"
						/>
					</v-card-text>
					<v-card-actions>
						<router-link :to="{ name: 'register' }">
							{{ $t("register") }}
						</router-link>
						<v-spacer />
						<router-link :to="{ name: 'password.request' }">
							{{ $t("forgot_password") }}
						</router-link>
					</v-card-actions>
				</form>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
import Form from "vform"

export default {
	layout: "frontend",
	name: "LoginView",
	head() {
		return {
			title: this.$t("login")
		}
	},
	data: () => ({
		form: new Form({
			username: "",
			password: ""
		}),
		eye: true,
		remember: false,
		busy: false
	}),

	methods: {
		async login() {
			if (await this.formHasErrors()) return

			// Submit the form.
			const { data } = await this.form.post("member/login")

			// Save the token.
			this.$store.dispatch("auth/saveToken", {
				token: data.token,
				remember: this.remember
			})
			this.busy = true
			// Fetch the user.
			await this.$store.dispatch("auth/fetchUser")

			// Redirect member dashboard.
			this.$router.push({ name: "members.dashboard" })
		}
	}
}
</script>
