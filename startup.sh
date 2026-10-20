#!/bin/sh
if curl -s http://127.0.0.1:8080/ >/dev/null; then
  echo "App already running on port 8080"
  exit 0
fi

pnpm dev > /tmp/dev.log 2>&1 &
