import { useNitroApp, useNitroHooks } from "./public-app.mjs";
import { trapUnhandledErrors } from "./error-hooks.mjs";

trapUnhandledErrors();

const app = useNitroApp();
const hooks = useNitroHooks();

console.log(JSON.stringify({ plugins: app.plugins, hooks }));
