export default async ({ store }) => {
	if (process.server) return // run only in client side, not while generating static pages...
	try {
		await store.dispatch("frontsetting/fetchSetting")
	} catch (error) {
		throw error
	}
}
