//#region \0rolldown/runtime.js
var __esmMin = (fn, res) => () => (fn && (res = fn(fn = 0)), res);
//#endregion
//#region src/cloudflare-plugin.mjs
function cloudflareDevPlugin(app) {
	app.plugins.push("cloudflare");
}
var init_cloudflare_plugin = __esmMin((async () => {
	await Promise.resolve();
}));
//#endregion
//#region src/dev-server-logs.mjs
function devServerLogsPlugin(app) {
	useNitroHooks().push("dev-server-logs");
	app.plugins.push("dev-server-logs");
}
var init_dev_server_logs = __esmMin((async () => {
	await init_public_app();
}));
//#endregion
//#region src/virtual-plugins.mjs
var plugins;
var init_virtual_plugins = __esmMin((async () => {
	await init_cloudflare_plugin();
	await init_dev_server_logs();
	plugins = [cloudflareDevPlugin, devServerLogsPlugin];
}));
//#endregion
//#region src/internal-app.mjs
function useNitroApp() {
	if (instance) return instance;
	instance = {
		hooks: [],
		plugins: []
	};
	for (const plugin of plugins) plugin(instance);
	return instance;
}
function useNitroHooks() {
	return useNitroApp().hooks;
}
var instance;
var init_internal_app = __esmMin((async () => {
	await init_virtual_plugins();
}));
//#endregion
//#region src/public-app.mjs
var init_public_app = __esmMin((async () => {
	await init_internal_app();
}));
//#endregion
//#region src/error-hooks.mjs
function trapUnhandledErrors() {
	useNitroApp();
}
var init_error_hooks = __esmMin((async () => {
	await init_internal_app();
}));
//#endregion
//#region src/entry.mjs
var app, hooks;
//#endregion
await __esmMin((async () => {
	await init_public_app();
	await init_error_hooks();
	trapUnhandledErrors();
	app = useNitroApp();
	hooks = useNitroHooks();
	console.log(JSON.stringify({
		plugins: app.plugins,
		hooks
	}));
}))();
export {};
