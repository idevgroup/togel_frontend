import Vue from 'vue'
import { mapGetters } from 'vuex'

import * as moment from 'moment-timezone'

const Corefunction = {
        install(Vue) {
            Vue.mixin({
                data() {
                    return {
                        ipPublicClient: '',
                        isNotIn: [12, 13, 15, 14, 22, 17, 18],
                    }
                },
                computed: {
                    ...mapGetters({
                        setting: 'frontendconfig/setting',
                    }),
                    nowDateTime: function() {
                        const now = moment()
                        let currentDate = now.tz(this.setting.general.timezone)
                        return currentDate
                    },
                    isSiteLock: function() {
                        let getTime = moment(this.nowDateTime, 'HH:mm a')
                        let getSiteLock = this.setting.sitelock
                        let getItem = []
                        let getItemLockAll = []
                        if (this.$route.params.marketcode) {
                            getSiteLock.forEach(item => {
                                if (item.market === this.$route.params.marketcode) {
                                    getItem = item
                                } else if (
                                    item.market === null ||
                                    item.market === ''
                                ) {
                                    getItemLockAll = item
                                }
                            })
                            if (
                                this.isTimeBetween(
                                    getItemLockAll.lock_from,
                                    getItemLockAll.lock_to,
                                    getTime
                                )
                            ) {
                                return false
                            } else if (
                                this.isTimeBetween(
                                    getItem.lock_from,
                                    getItem.lock_to,
                                    getTime
                                )
                            ) {
                                return false
                            }
                        }
                        return true
                    },
                },

                methods: {
                    async getIp() {
                        let value = ''
                        const ip = await this.$axios.$get('https://httpbin.org/ip')
                        value = ip.origin.split(',')
                        this.ipPublicClient = value[0]
                    },
                    isNumberInt(evt) {
                        evt = evt ? evt : window.event
                        var charCode = evt.which ? evt.which : evt.keyCode
                        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                            evt.preventDefault()
                        } else {
                            return true
                        }
                    },
                    isTimeBetween: function(aStartTime, anEndTime, aCurrTime) {
                        var currentTime = !aCurrTime ?
                            moment() :
                            moment(aCurrTime, 'HH:mm a')
                        var startTime = moment(aStartTime, 'HH:mm a')
                        var endTime = moment(anEndTime, 'HH:mm a')

                        if (startTime.hour() >= 12 && endTime.hour() <= 12) {
                            endTime.add(1, 'days')
                        }

                        var isBetween = currentTime.isBetween(startTime, endTime)
                        return isBetween
                    },
                },
            })
        },
    }
    // && charCode !== 46
Vue.use(Corefunction)