<template>
	<v-container>
		<v-footer :fixed="fixed">
			<span>&copy; 2019</span>
		</v-footer>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			fixed: false
		}
	}
}
</script>
