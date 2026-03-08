# Exemplos de Integração API

## Login

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@acme.com","role":"admin","tenantId":1}'
```

## Criar ticket

```bash
curl -X POST http://localhost:8080/api/tickets \
  -H 'Authorization: Bearer TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"subject":"Erro no ERP","priority":"high","channel":"whatsapp"}'
```

## RAG

```bash
curl -X POST http://localhost:8080/api/ai/rag-answer \
  -H 'Authorization: Bearer TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"question":"Como resetar senha?"}'
```

## Webhook inbound

```bash
POST /api/messages
{
  "channel": "telegram",
  "externalUserId": "123",
  "text": "preciso de ajuda"
}
```
