<template>
    <div>
        <b-row>
            <b-col align-self="center" id="martket-side">

                <b-card-text id="martket-active">
                    <template v-for="item in marketItem">
                        <div v-if="item.code === $route.params.marketcode" :key="item.id">
                            Active:{{ item.name }} <br />
                        </div>
                    </template>
                    {{ getDate() }}: {{ $route.params.marketcode.toUpperCase() }} - {{ getPeriod }} {{ periodMarket }}
                </b-card-text>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import {
    mapGetters
} from "vuex"
export default {
    data: () => ({
        marketItem: [],
        getMarketActive: [],
        getPeriod:''
    }),
    computed: {
        ...mapGetters({
            setting: "frontendconfig/setting"
        }),
        periodMarket: function () {
            let self = this
            let val = ''
            this.$axios.$post('/getperiod', {
                marketcode: this.$route.params.marketcode
            }).then(result => {
                val = result.period
                self.getPeriod = val
                // return val
            })
            //return val
        }
    },
    mounted() {
        this.marketItem = this.setting.market

    },
    methods: {
        getDate() {
            const toTwoDigits = num => num < 10 ? '0' + num : num;
            let today = new Date();
            let year = today.getFullYear();
            let month = toTwoDigits(today.getMonth() + 1);
            let day = toTwoDigits(today.getDate());
            return `${year}-${month}-${day}`;
        },

    }
}
</script>

<style scoped>
#martket-side {
    display: table;
    height: 140px;
}

#martket-active {
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    line-height: 30px;
    color: #540606;
    vertical-align: middle;
    display: table-cell;
}
</style>
