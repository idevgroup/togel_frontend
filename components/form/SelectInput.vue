<template>
  <div>
    <v-select
      v-model="_value"
      :label="label"
      :name="name"
      :items="items"
      :form="form"
      :item-text="itemText"
      :item-value="itemValue"
      :error-messages="errorMessages"
    />
    <has-error :form="form" :field="name" />
  </div>
</template>

<script>
export default {
  name: 'SelectInput',
  props: {
    itemText: {
      type: String,
      default: null
    },
    itemValue: {
      type: String,
      default: null
    },
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true,
      default: () => { return [] }
    },
    counter: {
      type: [Boolean, Number, String],
      default: false
    },
    form: {
      type: Object,
      required: true
    },
    vErrors: {
      type: Object,
      required: true
    },
    value: {
      type: [Number, String],
      default: () => { return '' }
    }

  },
  computed: {
    errorMessages() {
      return this.vErrors.collect(this.name)
    },
    errorClass() {
      return (
        this.form.errors.has(this.name) && ' input-group--error error--text'
      )
    },
    _value: {
      get() {
        return this.value
      },
      set(value) {
        value = value || ''
        this.$emit('update:value', value)
        this.$emit('input', value)
      }
    }

  }
}
</script>

<style scoped>
.invalid-feedback {
  color: #ff5252;
  margin-top: -20px;
}
</style>
