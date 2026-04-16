import { checkout, getOrder } from '../controllers/order.controller.js';
import { extractUser, requireAuth } from '../middleware/auth.middleware.js';

export default async function orderRoutes(fastify, options) {
  fastify.post('/api/carts/:cartId/checkout', { preHandler: extractUser }, checkout);
  fastify.get('/api/orders/:orderId',{ preHandler: requireAuth }, getOrder);
}