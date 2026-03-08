#!/usr/bin/env bash
set -euo pipefail

if [[ ! -f .env ]]; then
  cp .env.example .env
fi

docker compose up -d --build

echo "Ambiente pronto: API em http://localhost:8080 e Web em http://localhost:3000"
