<template>
    <div>
        <Header ></Header>
        <nav-bar ></nav-bar>
        <transition name="router-anim" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <nuxt ></nuxt>
        </transition>
        <Login ></Login>
        <Register ></Register>
    </div>
</template>

<script>
import Header from '~/components/partials/Header'
import NavBar from '~/components/partials/NavBar'
import Login from '~/components/auth/Login'
import Register from '~/components/auth/Register'
export default {
    components: {
        Header,
        NavBar,
        Login,
        Register,
    },
}
</script>
<style scoped>
</style>
