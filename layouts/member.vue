<template>
    <div>
        <Header ></Header>
        <nav-bar ></nav-bar>
        <b-container>
               <b-row class="mt-2">
                <b-col>
                    <b-card
                        overlay
                        img-src="https://picsum.photos/900/250/?image=3"
                        img-alt="Card Image"
                        text-variant="white">
                    </b-card>
                </b-col>
            </b-row>
            <b-row class="mt-4">
                <b-col col md="3">
                    <member-side-bar ></member-side-bar>
                </b-col>
                <b-col md="9" class="pl-0">
                    <transition name="router-anim" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                        <nuxt ></nuxt>
                    </transition>
                </b-col>

            </b-row>
            <Footer />
        </b-container>
    </div>
</template>

<script>
import Header from '~/components/partials/Header'
import NavBar from '~/components/partials/NavBar'
import MemberSideBar from '~/components/partials/MemberSideBar'
import Footer from '~/components/partials/Footer'
export default {
    middleware: 'guest',
    name: 'MemberLayoutView',
    components: {
        Header,
        NavBar,
        MemberSideBar,
        Footer,
    },
}
</script>

<style>
</style>
