import { createCartHandler, addCartItem, updateCartItem, getCart } from '../controllers/cart.controller.js';
import { extractUser, requireAuth } from '../middleware/auth.middleware.js';

export default async function cartRoutes(fastify, options) {
  fastify.post('/api/carts',  createCartHandler);
  fastify.post('/api/carts/:cartId/items', addCartItem);
  fastify.patch('/api/carts/:cartId/items/:itemId', updateCartItem);
  fastify.get('/api/carts/:cartId', getCart);
}