export const state = () => ({
    isOnMobile: false,
})

export const mutations = {
    setmobile(state, isOnMobile) {
        state.isOnMobile = isOnMobile
    },
}
export const getters = {
    mobile(state) {
        return state.isOnMobile
    },
}