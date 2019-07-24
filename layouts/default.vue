<template>
    <div>
        <Header />
        <nav-bar />
        <nuxt />
        <Login />
        <Register />
    </div>
</template>

<script>
import Header from '~/components/partials/Header';
import NavBar from '~/components/partials/NavBar';
import Login from '~/components/auth/Login';
import Register from '~/components/auth/Register';
export default {
    components: {
        Header,
        NavBar,
        Login,
        Register
    }
}
</script>
<style scoped>
    
</style>
