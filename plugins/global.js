import Vue from 'vue'
import money from 'v-money'
const components = { money }
Object.entries(components).forEach(([name, component]) => {
    Vue.component(name, component)
})