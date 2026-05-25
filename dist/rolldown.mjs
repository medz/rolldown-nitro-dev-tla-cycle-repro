//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __esmMin = (fn, res) => () => (fn && (res = fn(fn = 0)), res);
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
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
await init_internal_app();
function trapUnhandledErrors() {
	useNitroApp();
}
//#endregion
//#region src/lazy-route.mjs
var lazy_route_exports = /* @__PURE__ */ __exportAll({ lazyRouteApp: () => lazyRouteApp });
var lazyRouteApp;
var init_lazy_route = __esmMin((async () => {
	await init_public_app();
	lazyRouteApp = useNitroApp();
}));
//#endregion
//#region src/entry.mjs
await init_public_app();
globalThis.lazyRoutePromise = init_lazy_route().then(() => lazy_route_exports);
trapUnhandledErrors();
const app = useNitroApp();
const hooks = useNitroHooks();
console.log(JSON.stringify({
	plugins: app.plugins,
	hooks
}));
//#endregion
export {};
