<template>
    <div>
        <Header ></Header>
        <nav-bar ></nav-bar>
        <transition name="router-anim" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <nuxt ></nuxt>
        </transition>
        <Login ></Login>
          <modal
                :scrollable="true"
                :classes="['v--modal', 'vue-dialog']"
                :adaptive="true"
                :width="modalWidth"
                height="auto"
                resizable
                reset
                name="register"
                transition="pop-out">
                <Register ></Register>
          </modal>
        <Footer/>
    </div>
</template>

<script>
// Vue.loadScript("assets/media/js/jquery.js")
const MODAL_WIDTH = 656
import Header from '~/components/partials/Header'
import NavBar from '~/components/partials/NavBar'
import Login from '~/components/auth/Login'
import Register from '~/components/auth/Register'
import Footer from '~/components/partials/Footer'
export default {
	components: {
		Header,
		NavBar,
		Login,
		Register,
		Footer,
	},
	data() {
		return {
			modalWidth: MODAL_WIDTH,
		}
	},
}
</script>

<style></style>