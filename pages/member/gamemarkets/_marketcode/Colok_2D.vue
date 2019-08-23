<template>
    <div>
        <market-head-active></market-head-active>
        <div v-if="isSiteLock">

        </div>
        <div v-else>
            <site-lock-info />
        </div>
    </div>
</template>

<script>
import MarketHeadActive from '~/components/gamemarket/MarketHeadActive'
import SiteLockInfo from '~/components/gamemarket/SiteLockInfo'
import VueNumeric from 'vue-numeric'
export default {
    layout: 'gamemarket',
    name: 'GameBesarForm',
    components: {
        MarketHeadActive,
        SiteLockInfo,
        VueNumeric,
    },
}
</script>

<style scoped>
</style>
