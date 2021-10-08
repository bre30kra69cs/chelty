#!/usr/bin/env zx

await $`npx openapi-typescript https://binance.github.io/binance-api-swagger/spot_api.yaml --output ./src/types/binance.ts`;
