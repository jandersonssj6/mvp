import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import { env } from './config/env.js';
import router from './routes/index.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());
app.use('/api', router);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/docs', express.static(path.join(__dirname, '../docs')));

io.on('connection', (socket) => {
  socket.on('join_ticket', ({ ticketId }) => socket.join(`ticket:${ticketId}`));

  socket.on('typing', ({ ticketId, user }) => {
    socket.to(`ticket:${ticketId}`).emit('typing', { user, ticketId });
  });

  socket.on('message', (payload) => {
    io.to(`ticket:${payload.ticketId}`).emit('message', {
      ...payload,
      deliveredAt: new Date().toISOString()
    });
  });
});

server.listen(env.port, () => {
  console.log(`API disponível em http://localhost:${env.port}`);
});
