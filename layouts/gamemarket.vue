<template>
    <div>
        <Header />
        <nav-bar />
        <b-container>
            <b-row class="mt-2">
              <b-col>  
                <b-card
                    overlay
                    img-src="https://picsum.photos/900/250/?image=3"
                    img-alt="Card Image"
                    text-variant="white">
                </b-card>
              </b-col>
            </b-row>
            <b-row class="mt-2">
                <b-col col md="3">
                    <b-card no-body class="mb-2">
                        <h4 slot="header" class="m-0"><i class="fa fa-bookmark"></i> Market</h4>
                        <b-list-group flush class="m-menu">
                            <template v-for="item in marketItem">
                                <b-list-group-item :to="{path:'/member/gamemarkets/'+item.code}" :key="item.id">{{ item.name }}</b-list-group-item>
                            </template>
                        </b-list-group>
                    </b-card>
                    <template v-if="$route.params.marketcode">
                        <b-card no-body class="mb-2">
                            <h4 slot="header" class="m-0"><i class="fa fa-archive" aria-hidden="true"></i> Bet Game</h4>
                            <b-list-group flush class="m-menu">
                                <template v-for="item in gameItem">
                                    <b-list-group-item :to="{path:'/member/gamemarkets/'+$route.params.marketcode+'/'+item.code}" :key="item.id">{{ item.name }}</b-list-group-item>
                                </template>
                            </b-list-group>
                        </b-card>
                    </template>
                </b-col>
                <b-col md="9" class="pl-0">
                    <template v-if="$route.params.marketcode">
                        <b-row>
                            <b-col align-self="center" id="martket-side">

                                <b-card-text id="martket-active">
                                    <template v-for="item in marketItem">
                                        <div v-if="item.code === $route.params.marketcode" :key="item.id">
                                            Active:{{ item.name }} <br />
                                        </div>
                                    </template>
                                    {{ getDate() }}: {{ $route.params.marketcode.toUpperCase() }} - 0
                                </b-card-text>

                            </b-col>
                        </b-row>
                    </template>
                    <nuxt />
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import {
    mapGetters
} from "vuex"
import Header from '~/components/partials/Header';
import NavBar from '~/components/partials/NavBar';
import Swal from 'sweetalert2';
export default {
    middleware: 'guest',
    name: 'marketCodeLayoutView',
    components: {
        Header,
        NavBar,

    },
    data: () => ({
        marketItem: [],
        gameItem: [],
        getMarketActive: []
    }),
    computed: {
        ...mapGetters({
            setting: "frontendconfig/setting"
        })
    },
    mounted() {
        this.gameItem = this.setting.gameitem
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
        }
    }
}
</script>

<style>
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
