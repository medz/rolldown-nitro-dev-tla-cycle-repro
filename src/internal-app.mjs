import { plugins } from "./virtual-plugins.mjs";

let instance;

export function useNitroApp() {
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

export function useNitroHooks() {
  return useNitroApp().hooks;
}
