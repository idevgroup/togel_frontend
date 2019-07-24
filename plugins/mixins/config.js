import Vue from "vue";
import { mapGetters } from "vuex";

const Config = {
    install(Vue, options) {
        Vue.mixin({
            computed: {
                ...mapGetters({
                    setting: "frontendconfig/setting"
                })
            }
        });
    }
};

Vue.use(Config);