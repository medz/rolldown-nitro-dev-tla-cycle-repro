export default {
  input: "src/entry.mjs",
  platform: "node",
  transform: {
    target: "es2022",
  },
  output: {
    file: "dist/rolldown.mjs",
    format: "esm",
    codeSplitting: false,
  },
};
