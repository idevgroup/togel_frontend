<template>
  <div>
    <v-textarea
      v-model="_value"
      :class="errorClass"
      :counter="counter"
      :error-messages="errorMessages"
      :hint="hint"
      :label="label"
      :name="name"
      :prepend-icon="prepend"
      type="textarea"
      :outline="outline"
      :solo="solo"
    />
    <has-error :form="form" :field="name" />
  </div>
</template>

<script>
import TextInput from "./TextInput"

export default {
  name: "TextareaInput",
  extends: TextInput
}
</script>
