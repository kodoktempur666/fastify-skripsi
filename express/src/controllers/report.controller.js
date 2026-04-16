import pool from '../db/pool.js';

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({ status, message, data });
};

export const getSalesReport = async (req, res, next) => {
  const { start_date, end_date, group_by = 'day' } = req.query;
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
    handleResponse(res, 200, 'Sales report', result.rows);
  } catch (err) {
    next(err);
  }
};