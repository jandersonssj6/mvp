# Help Desk SaaS Omnichannel com IA Semântica (Milvus)

Plataforma multiempresa (multi-tenant) inspirada em Tiflux/Zendesk para atendimento técnico omnichannel, automação e base de conhecimento com RAG.

## Entregáveis incluídos

1. Arquitetura completa modular por domínios de microserviços.  
2. Estrutura de pastas para backend, frontend, docs e infraestrutura.  
3. Modelo de banco PostgreSQL (DDL + visão multi-tenant).  
4. Backend Node.js (Express + módulos + RBAC + endpoints REST).  
5. Frontend Next.js com layout inicial para operação help desk.  
6. Integração com Milvus para embeddings e busca semântica.  
7. Serviço de IA com fluxo RAG (OpenAI + Milvus + Knowledge Base).  
8. Documentação técnica (arquitetura, API, deploy e integrações).  
9. `docker-compose` com PostgreSQL, Redis, Milvus, API e Web.  
10. Guia de deploy e operação.  
11. Scripts de instalação/bootstrap.  
12. Exemplos de integração API e webhooks.

## Stack

- **Backend:** Node.js, Express, WebSocket (Socket.IO), JWT, OpenAPI
- **Frontend:** Next.js (App Router), TailwindCSS, componentes reutilizáveis
- **Dados:** PostgreSQL, Redis, Milvus
- **IA:** OpenAI Embeddings/Chat + RAG sobre Milvus
- **Infra:** Docker, Docker Compose, Nginx

## Como subir localmente

```bash
cp .env.example .env
bash infra/scripts/install.sh
```

Ou manualmente:

```bash
docker compose up -d --build
```

Acesse:
- API: `http://localhost:8080`
- Frontend: `http://localhost:3000`
- OpenAPI: `http://localhost:8080/docs/openapi.yaml`

## Roadmap de produção (sugestão)

- Trocar autenticação local por OAuth + SSO corporativo.
- Implementar fila de eventos (Kafka/RabbitMQ) para automações e integrações.
- Adicionar observabilidade (OpenTelemetry + Prometheus + Grafana).
- Habilitar escalabilidade horizontal com Kubernetes.
