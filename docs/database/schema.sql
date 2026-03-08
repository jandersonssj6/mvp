CREATE TABLE IF NOT EXISTS companies (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(160) NOT NULL,
  subdomain VARCHAR(80) UNIQUE NOT NULL,
  plan_id BIGINT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS plans (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  max_users INT NOT NULL,
  max_tickets_month INT NOT NULL,
  max_channels INT NOT NULL,
  monthly_price NUMERIC(10,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS subscriptions (
  id BIGSERIAL PRIMARY KEY,
  tenant_id BIGINT NOT NULL REFERENCES companies(id),
  plan_id BIGINT NOT NULL REFERENCES plans(id),
  status VARCHAR(30) NOT NULL,
  started_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  tenant_id BIGINT NOT NULL REFERENCES companies(id),
  name VARCHAR(120) NOT NULL,
  email VARCHAR(180) NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(30) NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE (tenant_id, email)
);

CREATE TABLE IF NOT EXISTS departments (
  id BIGSERIAL PRIMARY KEY,
  tenant_id BIGINT NOT NULL REFERENCES companies(id),
  name VARCHAR(100) NOT NULL,
  UNIQUE (tenant_id, name)
);

CREATE TABLE IF NOT EXISTS channels (
  id BIGSERIAL PRIMARY KEY,
  tenant_id BIGINT NOT NULL REFERENCES companies(id),
  type VARCHAR(30) NOT NULL,
  external_id VARCHAR(120),
  config JSONB DEFAULT '{}',
  active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS tickets (
  id BIGSERIAL PRIMARY KEY,
  tenant_id BIGINT NOT NULL REFERENCES companies(id),
  customer_id BIGINT,
  department_id BIGINT REFERENCES departments(id),
  subject VARCHAR(220) NOT NULL,
  status VARCHAR(40) NOT NULL,
  priority VARCHAR(20) NOT NULL,
  sla_due_at TIMESTAMP,
  assignee_id BIGINT REFERENCES users(id),
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS messages (
  id BIGSERIAL PRIMARY KEY,
  tenant_id BIGINT NOT NULL REFERENCES companies(id),
  ticket_id BIGINT REFERENCES tickets(id),
  channel_id BIGINT REFERENCES channels(id),
  sender_type VARCHAR(20) NOT NULL,
  sender_id BIGINT,
  content TEXT NOT NULL,
  attachment_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS knowledge_base (
  id BIGSERIAL PRIMARY KEY,
  tenant_id BIGINT NOT NULL REFERENCES companies(id),
  title VARCHAR(220) NOT NULL,
  category VARCHAR(100),
  content TEXT NOT NULL,
  source_type VARCHAR(40),
  published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS embeddings (
  id BIGSERIAL PRIMARY KEY,
  tenant_id BIGINT NOT NULL REFERENCES companies(id),
  knowledge_base_id BIGINT REFERENCES knowledge_base(id),
  milvus_pk VARCHAR(120) NOT NULL,
  embedding_model VARCHAR(120),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS automations (
  id BIGSERIAL PRIMARY KEY,
  tenant_id BIGINT NOT NULL REFERENCES companies(id),
  name VARCHAR(120) NOT NULL,
  trigger JSONB NOT NULL,
  actions JSONB NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id BIGSERIAL PRIMARY KEY,
  tenant_id BIGINT NOT NULL REFERENCES companies(id),
  actor_id BIGINT,
  action VARCHAR(120) NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW()
);
