<template>
	<v-text-field
		v-model="_value"
		:v-currency="{ locale, currency }"
		:class="errorClass"
		:error-messages="errorMessages"
		:label="label"
		:name="name"
		:solo="solo"
	/>
</template>

<script>
import { CurrencyDirective } from "vue-currency-input"
export default {
	name: "CurrencyInput",
	directives: {
		currency: CurrencyDirective
	},
	props: {
		locale: {
			type: String,
			default: undefined
		},
		currency: {
			type: String,
			default: undefined
		},
		vcurrency: {
			type: Array,
			default: () => {
				return []
			}
		},
		name: {
			type: String,
			required: true
		},
		label: {
			type: String,
			required: true
		},
		vErrors: {
			type: Object,
			required: true
		},
		form: {
			type: Object,
			required: true
		},
		prepend: {
			type: String,
			default: ""
		},
		counter: {
			type: [Boolean, Number, String],
			default: false
		},
		value: {
			type: String,
			default: ""
		},
		solo: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		errorMessages() {
			return this.vErrors.collect(this.name)
		},
		errorClass() {
			return (
				this.form.errors.has(this.name) &&
				" input-group--error error--text"
			)
		},
		_value: {
			get() {
				return this.$parseCurrency(
					this.value,
					this.locale,
					this.currency
				)
			},
			set(value) {
				value = value || ""
				this.$emit("update:value", value.trim())
				this.$emit("input", value.trim())
			}
		}
	}
}
</script>

<style></style>
