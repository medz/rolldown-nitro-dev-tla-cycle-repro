import { useNitroHooks } from "./public-app.mjs";

export default function devServerLogsPlugin(app) {
  const hooks = useNitroHooks();
  hooks.push("dev-server-logs");
  app.plugins.push("dev-server-logs");
}
