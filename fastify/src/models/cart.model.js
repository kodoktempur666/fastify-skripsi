import pool from '../db/pool.js';

export const createCart = async (userId, sessionToken) => {
  const result = await pool.query(
    `INSERT INTO carts (user_id, session_token, status, created_at, updated_at)
     VALUES ($1, $2, 'active', NOW(), NOW())
     RETURNING id`,
    [userId, sessionToken]
  );
  return result.rows[0];
};

export const getCartById = async (cartId) => {
  const result = await pool.query(`SELECT * FROM carts WHERE id = $1`, [cartId]);
  return result.rows[0];
};

export const updateCartStatus = async (cartId, status) => {
  await pool.query(
    `UPDATE carts SET status = $1, updated_at = NOW() WHERE id = $2`,
    [status, cartId]
  );
};

export const updateCartTimestamp = async (cartId) => {
  await pool.query(`UPDATE carts SET updated_at = NOW() WHERE id = $1`, [cartId]);
};