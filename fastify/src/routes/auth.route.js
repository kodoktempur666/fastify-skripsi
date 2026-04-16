import { register, login } from '../controllers/auth.controller.js';

export default async function authRoutes(fastify, options) {
  fastify.post('/api/register', register);
  fastify.post('/api/login', login);
}