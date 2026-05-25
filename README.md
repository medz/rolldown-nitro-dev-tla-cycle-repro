# Rolldown Nitro Dev TLA Cycle Repro

This is the minimal graph for the Nuxt/Nitro dev readiness issue:

```text
entry
  -> public app
    -> internal app
      -> virtual plugins
        -> cloudflare plugin (top-level await)
        -> dev-server-logs plugin
          -> public app
  -> lazy route (dynamic import, inlined with codeSplitting false)
    -> public app
```

The Cloudflare plugin's top-level await yields before the dev-server-logs plugin
imports and calls back into `nitro/app`. Rolldown also has to inline the dynamic
import because `codeSplitting` is disabled, matching Nitro dev's single-file
server output. That combination creates async module init wrappers and a pending
init cycle. Rollup preserves the module graph evaluation correctly and runs to
completion.

The Rolldown build targets `es2022` so top-level await itself is valid. This
keeps the repro focused on the async init cycle, not on an unsupported syntax
warning. The Rolldown build does not enable `strictExecutionOrder`.

Run with installed dependencies:

```sh
npm install
npm run build:rolldown
npm run test:rolldown
npm run build:rollup
npm run test:rollup
```

Expected result:

- `test:rolldown` prints `timeout`.
- `test:rollup` prints `{"plugins":["cloudflare","dev-server-logs"],"hooks":["dev-server-logs"]}`.
