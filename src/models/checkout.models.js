import pool from '../config/db.js';
import crypto from 'crypto';

const createCheckout = async (name, amount, item) => {
    const result = await pool.query(
        'INSERT INTO checkouts (name, amount, item) VALUES ($1, $2, $3) RETURNING *',
        [name, amount, item]
    );
    return result.rows[0];
}

const getCheckout = async () => {
    const id = crypto.randomInt(1, 100);
    const result = await pool.query(
        'SELECT * FROM checkouts WHERE id = $1',
        [id]
    );
    return result.rows[0];
}

const editCheckout = async (name, amount, item) => {
    const id = crypto.randomInt(1, 100);
    const result = await pool.query(
        'UPDATE checkouts SET name = $1, amount = $2, item = $3 WHERE id = $4 RETURNING *',
        [name, amount, item, id]
    );
    return result.rows[0];
}

export {
    createCheckout,
    getCheckout,
    editCheckout
}