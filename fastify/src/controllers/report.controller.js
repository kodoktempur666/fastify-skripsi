import pool from '../db/pool.js';
import { handleResponse } from '../utils/response.js';

export const getSalesReport = async (request, reply) => {
  const { start_date, end_date, group_by = 'day' } = request.query;
  const interval = group_by === 'month' ? 'month' : 'day';
  try {
    const query = `
      SELECT DATE_TRUNC($1, paid_at) as period, SUM(total_amount) as total_sales, COUNT(*) as order_count
      FROM orders
      WHERE status = 'paid' AND paid_at BETWEEN $2 AND $3
      GROUP BY period
      ORDER BY period
    `;
    const result = await pool.query(query, [interval, start_date, end_date]);
    handleResponse(reply, 200, 'Sales report', result.rows);
  } catch (err) {
    reply.status(500).send({ status: 500, message: err.message });
  }
};