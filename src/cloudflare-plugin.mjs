await Promise.resolve();

export default function cloudflareDevPlugin(app) {
  app.plugins.push("cloudflare");
}
