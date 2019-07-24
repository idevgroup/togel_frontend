<template>
<div>
   <b-container>
     <Slider class="mt-2 mb-2"/>
     
   </b-container>
</div>
</template>

<script>
import Slider from '~/components/partials/Slider';
import { mapGetters } from "vuex"
export default {
  components: {
     Slider
  },
  computed:{
    	...mapGetters({
			setting: "frontendconfig/setting"
		})
  }
}
</script>

<style>

</style>
