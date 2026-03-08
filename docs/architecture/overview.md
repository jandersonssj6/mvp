# Arquitetura SaaS Multi-Tenant

## Serviços

- **Auth Service:** login, JWT, OAuth, RBAC e política de sessão.
- **Ticket Service:** lifecycle de chamados, filas, prioridades, SLA.
- **Chat Service:** mensagens em tempo real, typing, leitura, anexos.
- **AI Service:** embeddings, RAG, recomendação e assistente técnico.
- **Integration Service:** WhatsApp, Instagram, Telegram, Email, Webhook e API externa.
- **Notification Service:** alertas de SLA, supervisor, push/email.
- **Automation Engine:** regras no formato If This Then That.
- **Knowledge Base Service:** artigos, manuais e tutoriais com semântica.
- **Billing Service:** planos, limites, assinatura e cobrança.
- **Admin Service:** gestão de tenants, permissões e auditoria.

## Modelo multiempresa

- `tenant_id` em tabelas de domínio.
- Isolamento por políticas de acesso e filtros obrigatórios.
- Subdomínios por empresa: `tenant.plataforma.com`.
- Limites por plano: usuários, tickets e canais.

## Fluxo RAG

1. Cliente envia pergunta no canal omnichannel.
2. AI Service gera embedding.
3. Embedding é pesquisado no Milvus.
4. Contexto da base é recuperado por tenant.
5. LLM gera resposta assistida.
6. Atendente revisa e envia.

## Segurança

- JWT + refresh token.
- RBAC por perfis (`admin`, `supervisor`, `agent`, `client`).
- Rate limit por IP/tenant.
- Logs estruturados e trilha de auditoria.
- Criptografia em trânsito (TLS) e em repouso (KMS).
