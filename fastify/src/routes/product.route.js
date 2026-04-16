import { getProducts, getProduct, getCategories } from '../controllers/product.controller.js';

export default async function productRoutes(fastify, options) {
  fastify.get('/api/products', getProducts);
  fastify.get('/api/products/:id', getProduct);
  fastify.get('/api/categories', getCategories);
}