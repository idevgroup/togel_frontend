<template>
    <div>
        <b-list-group horizontal="md">
            <template v-for="item in gameItem">
                <b-list-group-item :to="{path:'/member/gamemarkets/'+marketCode+'/'+item.code}" :key="item.id" >{{ item.name }}</b-list-group-item>
            </template>
        </b-list-group>
        {{ isNotIn }}
    </div>

</template>

<script>
export default {
	data: () => ({
		gameItem: [],
		marketCode: '',
		isNotIn: [12, 13, 15, 14, 22, 17, 18],
	}),

	created() {
		this.gameItem = this.setting.gameitem.filter(
			item => !this.isNotIn.includes(parseInt(item.id))
		)
		this.marketCode = this.$route.params.marketcode
		console.log(isNotIn)
	},
}
</script>

<style>
</style>
