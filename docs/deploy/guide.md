# Guia de Deploy

## Pré-requisitos

- Docker 24+
- Docker Compose
- DNS para subdomínios

## Passos

1. Configure variáveis: `cp .env.example .env`.
2. Suba os serviços: `docker compose up -d --build`.
3. Rode migrações SQL no PostgreSQL.
4. Configure provedores externos (OpenAI, WhatsApp API, SMTP).
5. Valide health checks em `/api/health`.

## CI/CD sugerido

- Pipeline: lint -> test -> build -> scan -> deploy.
- Build de imagens por serviço.
- Deploy blue/green para API e frontend.
- Migrações controladas por job dedicado.
