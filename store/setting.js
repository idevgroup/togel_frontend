import axios from "axios"
export const state = () => ({
	setting: null
})
// getters
export const getters = {
	setting: state => state.setting
}
export const mutations = {
	SET_SETTING(state, setting) {
		state.setting = setting
	}
}
// actions
export const actions = {
	async fetchSetting({ commit }) {
		try {
			const data = await axios.post("getsetting")
			commit("SET_SETTING", data)
		} catch (e) {
			console.log(e)
		}
	}
}
