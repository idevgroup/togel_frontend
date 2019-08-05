import Vue from 'vue';
const Corefunction = {
    install(Vue, options) {
        Vue.mixin({
            methods: {
                isNumberInt(evt) {
                    evt = evt ? evt : window.event;
                    var charCode = evt.which ? evt.which : evt.keyCode;
                    if (
                        charCode > 31 &&
                        (charCode < 48 || charCode > 57)
                    ) {
                        evt.preventDefault();
                    } else {
                        return true;
                    }
                }
            }
        });
    }
};
//&& charCode !== 46
Vue.use(Corefunction);