import pool from '../db/pool.js';

export const getProductsWithFilters = async (page, limit, search, category, minPrice, maxPrice, sort) => {
  const offset = (page - 1) * limit;
  let query = `
    SELECT p.id, p.name, p.price, p.stock, c.name as category
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE 1=1
  `;
  const params = [];
  let paramCount = 1;

  if (search) {
    query += ` AND p.name ILIKE $${paramCount}`;
    params.push(`%${search}%`);
    paramCount++;
  }
  if (category) {
    query += ` AND c.name = $${paramCount}`;
    params.push(category);
    paramCount++;
  }
  if (minPrice) {
    query += ` AND p.price >= $${paramCount}`;
    params.push(minPrice);
    paramCount++;
  }
  if (maxPrice) {
    query += ` AND p.price <= $${paramCount}`;
    params.push(maxPrice);
    paramCount++;
  }
  if (sort === 'price') {
    query += ` ORDER BY p.price ASC`;
  } else {
    query += ` ORDER BY p.id ASC`;
  }
  query += ` LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
  params.push(limit, offset);

  const result = await pool.query(query, params);
  return result.rows;
};

export const getProductById = async (id) => {
  const result = await pool.query(
    `SELECT p.*, c.name as category_name
     FROM products p
     LEFT JOIN categories c ON p.category_id = c.id
     WHERE p.id = $1`,
    [id]
  );
  return result.rows[0];
};

export const getAllCategories = async () => {
  const result = await pool.query('SELECT id, name, parent_id FROM categories ORDER BY id');
  return result.rows;
};

export const getProductPrice = async (productId) => {
  const result = await pool.query('SELECT price FROM products WHERE id = $1', [productId]);
  return result.rows[0]?.price;
};

export const reduceStock = async (productId, quantity) => {
  await pool.query(
    `UPDATE products SET stock = stock - $1 WHERE id = $2 AND stock >= $1`,
    [quantity, productId]
  );
};