<template>
    <div>
        <Header ></Header>
        <nav-bar ></nav-bar>
        <transition name="router-anim" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <nuxt ></nuxt>
        </transition>
        <Login ></Login>
        <Register ></Register>
        <Footer/>
    </div>
</template>

<script>
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
}
</script>
<style scoped>
</style>
