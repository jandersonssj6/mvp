import dotenv from 'dotenv';

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 8080),
  jwtSecret: process.env.JWT_SECRET || 'super-secret',
  postgresUrl: process.env.POSTGRES_URL,
  redisUrl: process.env.REDIS_URL,
  milvusAddress: process.env.MILVUS_ADDRESS || 'localhost:19530',
  milvusCollection: process.env.MILVUS_COLLECTION || 'knowledge_embeddings',
  openaiApiKey: process.env.OPENAI_API_KEY,
  openaiModel: process.env.OPENAI_MODEL || 'gpt-4o-mini',
  embeddingModel: process.env.OPENAI_EMBEDDING_MODEL || 'text-embedding-3-small'
};
