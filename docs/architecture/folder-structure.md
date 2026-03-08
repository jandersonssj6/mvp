# Estrutura de Pastas

```text
.
├── apps
│   ├── api
│   │   ├── src
│   │   │   ├── config
│   │   │   ├── lib
│   │   │   ├── middleware
│   │   │   ├── modules
│   │   │   └── routes
│   │   └── docs
│   └── web
│       └── app
├── docs
│   ├── api
│   ├── architecture
│   ├── database
│   ├── deploy
│   └── integrations
├── infra
│   ├── nginx
│   └── scripts
└── docker-compose.yml
```

## Convenções

- Código orientado a domínio por módulo.
- Serviços desacoplados por interfaces/eventos.
- Preparado para migração de monólito modular para microserviços.
