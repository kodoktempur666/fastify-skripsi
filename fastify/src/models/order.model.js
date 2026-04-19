import pool from '../db/pool.js';

export const createOrder = async (cartId, totalAmount) => {
  const result = await pool.query(
    `INSERT INTO orders (cart_id, status, total_amount,  created_at)
     VALUES ($1, 'pending', $2, NOW())
     RETURNING id`,
    [cartId, totalAmount]
  );
  return result.rows[0];
};



export const getOrderStatus = async (orderId) => {
  const result = await pool.query(
    `SELECT id, status, total_amount, paid_at, created_at FROM orders WHERE id = $1`,
    [orderId]
  );
  return result.rows[0];
};