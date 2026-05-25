await Promise.resolve();

function cloudflareDevPlugin(app) {
  app.plugins.push("cloudflare");
}

function devServerLogsPlugin(app) {
  const hooks = useNitroHooks();
  hooks.push("dev-server-logs");
  app.plugins.push("dev-server-logs");
}

const plugins = [cloudflareDevPlugin, devServerLogsPlugin];

let instance;

function useNitroApp() {
  if (instance) {
    return instance;
  }

  instance = {
    hooks: [],
    plugins: [],
  };

  for (const plugin of plugins) {
    plugin(instance);
  }

  return instance;
}

function useNitroHooks() {
  return useNitroApp().hooks;
}

function trapUnhandledErrors() {
  useNitroApp();
}

trapUnhandledErrors();

const app = useNitroApp();
const hooks = useNitroHooks();

console.log(JSON.stringify({ plugins: app.plugins, hooks }));
