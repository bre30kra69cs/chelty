#!/usr/bin/env zx

await Promise.all([$`npm run watch:build`, $`npm run watch:dist`]);
