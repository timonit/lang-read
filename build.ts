const build = await Bun.build({
  entrypoints: ['./src/page/index.ts', './src/background/index.ts'],
  outdir: 'dist',
  target: "browser"
});

const artifact = build.outputs;
console.log(artifact);


const manifest = Bun.file("./src/manifest.json");
await Bun.write("./dist/manifest.json", manifest);

const icon = Bun.file("./src/icon.png");
await Bun.write("./dist/icon.png", icon);
