<template>
<div>
    <Header />
    <nav-bar />
    <b-container>
        <b-row class="mt-4">
            <b-col col md="3">
                <member-side-bar />
            </b-col>
            <b-col md="9" class="p-0">
                <NavBarGame />
                <nuxt />
            </b-col>

        </b-row>
    </b-container>
</div>
</template>

<script>
import Header from '~/components/partials/Header';
import NavBar from '~/components/partials/NavBar';
import MemberSideBar from '~/components/partials/MemberSideBar';
import NavBarGame from '~/components/gamemarket/NavBarGame';
export default {
    middleware: 'guest',
    name: 'marketCodeLayoutView',
    components: {
        Header,
        NavBar,
        MemberSideBar,
        NavBarGame
    }
}
</script>

<style>

</style>
