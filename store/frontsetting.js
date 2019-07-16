import axios from "axios"
// state
export const state = () => ({
	setting: null
})
// getters
export const getters = {
	setting: state => state.setting
}

// mutations
export const mutations = {
	SET_SETTING(state, payload) {
		state.setting = payload
	}
}

// actions
export const actions = {
	async fetchSetting({ commit }) {
		try {
			const { data: general } = await axios.post("getsetting")
			commit("SET_SETTING", general)
		} catch (e) {
			throw e
		}
	}
}
