import pool from '../db/pool.js';

export const createOrder = async (userId, cartId, totalAmount) => {
  const result = await pool.query(
    `INSERT INTO orders (user_id, cart_id, status, total_amount, payment_method, mock_payment_status, created_at)
     VALUES ($1, $2, 'pending', $3, 'mock', NULL, NOW())
     RETURNING id`,
    [userId, cartId, totalAmount]
  );
  return result.rows[0];
};

export const updateOrderToPaid = async (orderId) => {
  await pool.query(
    `UPDATE orders SET status = 'paid', mock_payment_status = 'success', paid_at = NOW() WHERE id = $1`,
    [orderId]
  );
};

export const updateOrderToFailed = async (orderId) => {
  await pool.query(
    `UPDATE orders SET status = 'failed', mock_payment_status = 'failure' WHERE id = $1`,
    [orderId]
  );
};

export const getOrderStatus = async (orderId) => {
  const result = await pool.query(
    `SELECT id, status, total_amount, paid_at, created_at FROM orders WHERE id = $1`,
    [orderId]
  );
  return result.rows[0];
};