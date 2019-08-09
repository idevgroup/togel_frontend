import Vue from 'vue'
import Vue2Filters from 'vue2-filters'
var Vue2FiltersConfig = {
    capitalize: {
        onlyFirstLetter: false,
    },
    currency: {
        symbol: '$',
        decimalDigits: 2,
        thousandsSeparator: ',',
        decimalSeparator: '.',
        symbolOnLeft: true,
        spaceBetweenAmountAndSymbol: true,
    },
    pluralize: {
        includeNumber: false,
    },
    ordinal: {
        includeNumber: false,
    },
}

Vue.use(Vue2Filters, Vue2FiltersConfig)
