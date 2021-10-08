#!/usr/bin/env zx

await Promise.all([$`npm run check:types`, $`npm run source:build`]);
