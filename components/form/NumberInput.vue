<template>
	<div>
		<v-text-field
			v-model="_value"
			:class="errorClass"
			:counter="counter"
			:error-messages="errorMessages"
			:hint="hint"
			:label="label"
			:name="name"
			:prepend-icon="prepend"
			type="number"
			:outline="outline"
			:solo="solo"
		/>
		<has-error :form="form" :field="name" />
	</div>
</template>

<script>
import TextInput from "./TextInput"

export default {
	name: "NumberInput",
	extends: TextInput
}
</script>
