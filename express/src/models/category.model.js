import pool from '../db/pool.js';

export const getAllCategories = async () => {
  const result = await pool.query('SELECT id, name, parent_id FROM categories ORDER BY id');
  return result.rows;
};

export const getCategoryById = async (id) => {
  const result = await pool.query('SELECT id, name, parent_id FROM categories WHERE id = $1', [id]);
  return result.rows[0];
};

export const getProductsByCategory = async (categoryId, page = 1, limit = 20) => {
  const offset = (page - 1) * limit;
  const result = await pool.query(
    `SELECT p.id, p.name, p.price, p.stock
     FROM products p
     WHERE p.category_id = $1
     LIMIT $2 OFFSET $3`,
    [categoryId, limit, offset]
  );
  return result.rows;
};