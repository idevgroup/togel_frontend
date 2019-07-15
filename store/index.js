import Cookies from "js-cookie"
import { cookieFromRequest } from "~/utils"

export const actions = {
	nuxtServerInit({ commit }, { req }) {
		const token = cookieFromRequest(req, "token")
		if (token) {
			commit("auth/SET_TOKEN", token)
		}

		const locale = cookieFromRequest(req, "locale")
		if (locale) {
			commit("lang/SET_LOCALE", { locale })
		}
		const setting = cookieFromRequest(req, "setting")
		if (setting) {
			commit("setting/SET_SETTING", { setting })
		}
	},

	nuxtClientInit({ commit }) {
		const token = Cookies.get("token")
		if (token) {
			commit("auth/SET_TOKEN", token)
		}

		const locale = Cookies.get("locale")
		if (locale) {
			commit("lang/SET_LOCALE", { locale })
		}
		const setting = Cookies.get("setting")
		if (setting) {
			commit("setting/SET_SETTING", { setting })
		}
	}
}
