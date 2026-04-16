import { getSalesReport } from '../controllers/report.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

export default async function reportRoutes(fastify, options) {
  fastify.get('/api/reports/sales',{ preHandler: requireAuth }, getSalesReport);
}