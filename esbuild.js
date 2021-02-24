const { build } = require('esbuild');
const pkg = require('./package.json');

const DEV = process.argv.includes('--dev');

// ES-module
build({
    entryPoints: ['./src/index.js'],
    platform: 'node',
    format: "esm",
    outfile: pkg.module,
    minify: !DEV,
    bundle: true,
}).catch((e) => {
    process.exit(1);
})

// Node-module
build({
    entryPoints: ['./src/index.js'],
    format: "cjs",
    outfile: pkg.main,
    minify: !DEV,
    bundle: true,
}).catch((e) => {
    process.exit(1);
})

// Browser
build({
    entryPoints: ['./src/index.js'],
    format: "iife",
    outfile: pkg.cdn,
    minify: !DEV,
    bundle: true,
}).catch((e) => {
    process.exit(1);
})