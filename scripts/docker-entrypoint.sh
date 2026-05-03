#!/usr/bin/env bash
set -euo pipefail

npm start &
SRV_PID=$!

cleanup() {
  kill "$SRV_PID" 2>/dev/null || true
}

trap cleanup EXIT

npx wait-on "http://127.0.0.1:3000/api/status" --timeout 120000

npm run test:unit
npm run test:api
npm run test:ui
