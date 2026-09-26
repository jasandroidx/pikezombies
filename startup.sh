#!/bin/sh
if curl -s http://127.0.0.1:8080/ > /dev/null 2>&1; then
  echo "Server is running."
  exit 0
fi

nohup pnpm dev > /tmp/dev-server.log 2>&1 &
sleep 2
exit 0
