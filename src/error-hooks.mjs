import { useNitroApp } from "./internal-app.mjs";

export function trapUnhandledErrors() {
  useNitroApp();
}
