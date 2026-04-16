import express from 'express';
import { getSalesReport } from '../controllers/report.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const route = express.Router();

route.get('/reports/sales',requireAuth, getSalesReport);

export default route;