import Vue from 'vue'
import { mapGetters } from 'vuex'
import * as moment from 'moment-timezone'
const Corefunction = {
    install(Vue) {
        Vue.mixin({
            computed: {
                ...mapGetters({
                    setting: 'frontendconfig/setting',
                }),
                nowDateTime: function() {
                    const now = moment()
                    let currentDate = now.tz(this.setting.general.timezone)
                    return currentDate
                },
            },
            methods: {
                isNumberInt(evt) {
                    evt = evt ? evt : window.event
                    var charCode = evt.which ? evt.which : evt.keyCode
                    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                        evt.preventDefault()
                    } else {
                        return true
                    }
                },
            },
        })
    },
}
// && charCode !== 46
Vue.use(Corefunction)
