export default async ({ store }) => {
	await store.dispatch("setting/fetchSetting")
}
