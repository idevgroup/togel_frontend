<template>
    <div>
        <b-navbar
            toggleable="lg"
            type="light"
            variant="light">
            <b-container>
                <b-navbar-brand to="/">NavBar</b-navbar-brand>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav>
                        <b-nav-item to="#">Link</b-nav-item>
                        <b-nav-item to="/about">About us</b-nav-item>
                        <b-nav-item to="#">Blogs</b-nav-item>
                    </b-navbar-nav>
                </b-collapse>
            </b-container>
        </b-navbar>
    </div>
</template>

<script>
export default {}
</script>

<style>
</style>
