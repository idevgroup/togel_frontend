<template>
    <div>
        <Header />
        <nav-bar />
        <b-container>
            <b-row class="mt-4">
                <b-col col md="3">
                    <member-side-bar />
                </b-col>
                <b-col md="9">
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
export default {
    middleware: 'guest',
    name:'memberLayoutView',
    components: {
        Header,
        NavBar,
        MemberSideBar
    }
}
</script>

<style>

</style>
