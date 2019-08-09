<template>
    <div>
        <market-head-active ></market-head-active>
        Today:   {{ nowDateTime }} <br/>
      
    </div>

</template>

<script>
import MarketHeadActive from '~/components/gamemarket/MarketHeadActive'
export default {
    layout: 'gamemarket',
    components: {
        MarketHeadActive,
    },
}
</script>

<style>
</style>
