<template>
    <div>
        <b-modal
            id="modal-login"
            ref="modal"
            title="Member Login"
            ok-only
            @ok="handleOk"
            @show="resetModal"
            @hidden="resetModal">
            <form ref="form" @submit.stop.prevent="loginSubmit">
                <b-form-group label="User Name" label-for="username-input">
                    <b-form-input
                        id="username-input"
                        name="username"
                        v-model="form.username"
                        v-validate="{ required: true }"
                        data-vv-name="username"
                        data-vv-as="username">
                        ></b-form-input>
                         <span class="form-text text-danger" v-show="veeErrors.has('username')">{{ veeErrors.first('username') }}</span>
                </b-form-group>
                <b-form-group label="Password" label-for="password-input">
                    <b-form-input
                        id="password-input"
                        name="password"
                        v-model="form.password"
                        type="password"
                        v-validate="{ required: true }"
                         data-vv-name="password"
                        data-vv-as="password">
                      ></b-form-input>
                        <span class="form-text text-danger" v-show="veeErrors.has('password')">{{ veeErrors.first('password') }}</span>
                </b-form-group>
            </form>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: 'loginModalView',
    data() {
        return {
            form: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        resetModal() {
            this.form.username = ''
            this.form.password = ''
        },
        handleOk(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            this.loginSubmit()
        },
        async loginSubmit() {
            this.$validator.validateAll().then((result) => {
                if (result) {
                    try {
                        this.$auth.loginWith('local', {
                            data: this.form
                        }).then(() => {
                            this.$router.push({
                                name: 'member-dashboard'
                            })
                            this.$nextTick(() => {
                                this.$refs.modal.hide()
                            })
                        }).catch(function(error) {
                            console.log(error)
                        })

                    } catch (e) {
                        console.log(e)
                    }
                }
            })
        }
    }
}
</script>
