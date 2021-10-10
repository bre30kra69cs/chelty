#!/usr/bin/env zx

await $`npm run source:build`;

await $`node ./dist/index.js`;
