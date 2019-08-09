let alreadyDone = false
export default async ({ store }) => {
    if (process.server) return // run only in client side, not while generating static pages...
    if (alreadyDone) {
        return null
    }
    alreadyDone = true
    try {
        await store.dispatch('frontendconfig/fetchSetting')
    } catch (error) {
        throw error
    }
}
