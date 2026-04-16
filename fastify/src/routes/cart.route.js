import { createCartHandler, addCartItem, updateCartItem, getCart } from '../controllers/cart.controller.js';
import { extractUser, requireAuth } from '../middleware/auth.middleware.js';

export default async function cartRoutes(fastify, options) {
  fastify.post('/api/carts', { preHandler: extractUser }, createCartHandler);
  fastify.post('/api/carts/:cartId/items',{ preHandler: requireAuth}, addCartItem);
  fastify.patch('/api/carts/:cartId/items/:itemId',{ preHandler: requireAuth}, updateCartItem);
  fastify.get('/api/carts/:cartId',{ preHandler: requireAuth}, getCart);
}