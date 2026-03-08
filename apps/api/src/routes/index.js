import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { ragAnswer } from '../modules/ai/ai.service.js';

const router = Router();

router.get('/health', (_, res) => res.json({ status: 'ok' }));

router.post('/auth/login', (req, res) => {
  const { email, role = 'agent', tenantId = 1 } = req.body;
  const token = jwt.sign({ email, role, tenantId }, env.jwtSecret, { expiresIn: '8h' });
  res.json({ token });
});

router.get('/tickets', requireAuth, (req, res) => {
  res.json({
    tenantId: req.user.tenantId,
    data: [
      { id: 101, status: 'open', priority: 'high', channel: 'whatsapp' },
      { id: 102, status: 'in_progress', priority: 'normal', channel: 'email' }
    ]
  });
});

router.post('/tickets', requireAuth, (req, res) => {
  const ticket = {
    id: Math.floor(Math.random() * 100000),
    ...req.body,
    tenantId: req.user.tenantId,
    createdAt: new Date().toISOString()
  };
  res.status(201).json(ticket);
});

router.post('/messages', requireAuth, (req, res) => {
  res.status(201).json({
    id: Date.now(),
    ...req.body,
    sender: req.user.email,
    tenantId: req.user.tenantId
  });
});

router.get('/companies', requireAuth, requireRole('admin', 'supervisor'), (_, res) => {
  res.json([{ id: 1, name: 'ACME LTDA', plan: 'professional' }]);
});

router.get('/knowledge-base/articles', requireAuth, (_, res) => {
  res.json([{ id: 1, title: 'Reset de senha', category: 'acesso' }]);
});

router.post('/automations/evaluate', requireAuth, (req, res) => {
  const { event } = req.body;
  const actions = [];
  if (event?.priority === 'high') actions.push('notify_supervisor');
  if ((event?.message || '').toLowerCase().includes('erro')) actions.push('create_ticket');
  if (event?.customerType === 'vip') actions.push('priority_queue');
  res.json({ triggeredActions: actions });
});

router.post('/ai/rag-answer', requireAuth, async (req, res) => {
  try {
    const result = await ragAnswer({ question: req.body.question, tenantId: req.user.tenantId });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao gerar resposta com IA', details: String(error.message) });
  }
});

router.get('/analytics/dashboard', requireAuth, requireRole('admin', 'supervisor'), (_, res) => {
  res.json({
    ticketsOpenedToday: 42,
    slaCompliance: 93.4,
    avgFirstResponseMin: 7.8,
    avgResolutionMin: 56,
    busiestChannel: 'whatsapp'
  });
});

export default router;
