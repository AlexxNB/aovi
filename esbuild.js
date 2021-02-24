const { build } = require('esbuild');
const pkg = require('./package.json');

const DEV = process.argv.includes('--dev');

// Node-module
build({
    entryPoints: ['./src/index.js'],
    format: "cjs",
    outfile: pkg.main,
    minify: !DEV,
    sourcemap: DEV && 'inline',
    bundle: true,
}).catch((e) => {
    process.exit(1);
})

if(!DEV){
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
}




