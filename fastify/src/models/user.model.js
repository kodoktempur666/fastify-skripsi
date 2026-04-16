import pool from '../db/pool.js';

export const createUser = async (email, passwordHash, name, isGuest = false) => {
  const result = await pool.query(
    `INSERT INTO users (email, password_hash, name, is_guest, created_at)
     VALUES ($1, $2, $3, $4, NOW())
     RETURNING id, email, name, is_guest`,
    [email, passwordHash, name, isGuest]
  );
  return result.rows[0];
};

export const findUserByEmail = async (email) => {
  const result = await pool.query(
    `SELECT id, email, password_hash, name, is_guest FROM users WHERE email = $1`,
    [email]
  );
  return result.rows[0];
};

export const findUserById = async (id) => {
  const result = await pool.query(
    `SELECT id, email, name, is_guest FROM users WHERE id = $1`,
    [id]
  );
  return result.rows[0];
};