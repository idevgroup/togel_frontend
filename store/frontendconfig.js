export const state = () => ({
    setting: null,
})
// getters
export const getters = {
    setting: state => state.setting,
}

// mutations
export const mutations = {
    SET_SETTING(state, setting) {
        state.setting = setting
    },
}

// actions
export const actions = {
    async fetchSetting({ commit }) {
        try {
            const data = await this.$axios.$post('getsetting')
            commit('SET_SETTING', data)
        } catch (e) {
            throw e
        }
    },
}
