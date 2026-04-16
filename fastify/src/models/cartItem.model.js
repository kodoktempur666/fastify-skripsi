import pool from '../db/pool.js';

export const findCartItem = async (cartId, productId) => {
  const result = await pool.query(
    `SELECT id, quantity FROM cart_items WHERE cart_id = $1 AND product_id = $2`,
    [cartId, productId]
  );
  return result.rows[0];
};

export const insertCartItem = async (cartId, productId, quantity, priceAtAdd) => {
  await pool.query(
    `INSERT INTO cart_items (cart_id, product_id, quantity, price_at_add)
     VALUES ($1, $2, $3, $4)`,
    [cartId, productId, quantity, priceAtAdd]
  );
};

export const updateCartItemQuantity = async (cartItemId, quantity) => {
  await pool.query(
    `UPDATE cart_items SET quantity = $1 WHERE id = $2`,
    [quantity, cartItemId]
  );
};

export const getCartItemsByCartId = async (cartId) => {
  const result = await pool.query(
    `SELECT ci.product_id, ci.quantity, ci.price_at_add
     FROM cart_items ci
     WHERE ci.cart_id = $1`,
    [cartId]
  );
  return result.rows;
};