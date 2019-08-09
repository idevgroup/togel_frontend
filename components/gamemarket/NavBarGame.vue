<template>
    <div>
        <b-list-group horizontal="md">
            <template v-for="item in gameItem">
                <b-list-group-item :to="{path:'/member/gamemarkets/'+marketCode+'/'+item.code}" :key="item.id" >{{ item.name }}</b-list-group-item>
            </template>
        </b-list-group>
    </div>

</template>

<script>
export default {
    data: () => ({
        gameItem: [],
        marketCode: '',
    }),

    created() {
        this.gameItem = this.setting.gameitem
        this.marketCode = this.$route.params.marketcode
    },
}
</script>

<style>
</style>
