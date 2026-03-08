import OpenAI from 'openai';
import { MilvusClient } from 'milvus-sdk-node';
import { env } from '../../config/env.js';

const openai = new OpenAI({ apiKey: env.openaiApiKey });
const milvus = new MilvusClient({ address: env.milvusAddress });

export async function generateEmbedding(text) {
  const response = await openai.embeddings.create({
    model: env.embeddingModel,
    input: text
  });
  return response.data[0].embedding;
}

export async function semanticSearch(text, limit = 5) {
  const vector = await generateEmbedding(text);
  const response = await milvus.search({
    collection_name: env.milvusCollection,
    vector,
    limit,
    output_fields: ['tenant_id', 'article_id', 'content']
  });
  return response.results || [];
}

export async function ragAnswer({ question, tenantId }) {
  const contexts = await semanticSearch(question, 4);
  const filtered = contexts.filter((item) => Number(item.tenant_id) === Number(tenantId));

  const contextText = filtered.map((item) => `- ${item.content}`).join('\n');
  const completion = await openai.chat.completions.create({
    model: env.openaiModel,
    temperature: 0.2,
    messages: [
      {
        role: 'system',
        content: 'Você é um especialista de suporte técnico e deve responder de forma direta e precisa.'
      },
      {
        role: 'user',
        content: `Pergunta: ${question}\n\nBase de conhecimento:\n${contextText || 'Sem contexto encontrado.'}`
      }
    ]
  });

  return {
    answer: completion.choices[0].message.content,
    contexts: filtered
  };
}
