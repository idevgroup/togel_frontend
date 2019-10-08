<template>
    <div>
       
        Today:   {{ nowDateTime }} <br/>
      
    </div>

</template>

<script>
export default {
	layout: ({ isMobile }) => (isMobile ? 'mobile' : 'gamemarket'),
	components: {},
}
</script>

<style>
</style>
