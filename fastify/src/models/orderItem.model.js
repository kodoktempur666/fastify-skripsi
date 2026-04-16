import pool from '../db/pool.js';

export const insertOrderItem = async (orderId, productId, quantity, price) => {
  await pool.query(
    `INSERT INTO order_items (order_id, product_id, quantity, price)
     VALUES ($1, $2, $3, $4)`,
    [orderId, productId, quantity, price]
  );
};