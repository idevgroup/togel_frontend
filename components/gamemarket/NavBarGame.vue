<template>
<div>{{ gameItem }}</div>

</template>

<script>
import {
    mapGetters
} from "vuex"
export default {
    data: () => ({
        gameItem: []
    }),
    computed: {
        ...mapGetters({
            setting: "frontendconfig/setting"
        })
    },
    created() {
        this.gameItem = this.setting.gameitem
    }
}
</script>

<style>

</style>
