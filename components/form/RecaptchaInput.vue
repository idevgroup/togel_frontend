<template>
  <div>
    <vue-recaptcha
      ref="recaptcha"
      v-model="_value"
      :sitekey="sitekey"
      :class="errorClass"
      :error-messages="errorMessages"
      :name="name"
      @verify="onVerify"
    />
    <has-error :form="form" :field="name" />
  </div>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha'
export default {
  name: 'RecaptchaInput',
  components: { VueRecaptcha },
  head: {
    // Include external js files
    script: [
      {
        type: 'text/javascript',
        src:
          'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaInit&render=explicit'
      }
    ]
  },
  props: {
    name: {
      type: String,
      required: true
    },
    form: {
      type: Object,
      required: true
    },
    vErrors: {
      type: Object,
      required: true
    },
    sitekey: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: ''
    },
    recaptcha: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      widgetId: 0
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
        this.$emit('update:value', value.trim())
        this.$emit('input', value.trim())
      }
    }
  },
  methods: {
    onVerify(response) {
      console.log(response)
      this.value = response
    }
  }
}
</script>

<style>
</style>
