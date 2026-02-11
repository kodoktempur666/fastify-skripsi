import pool from "../config/db.js";

const createTable = async () => {
    const queryText = `
        CREATE TABLE IF NOT EXISTS checkouts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        item VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
    )`
    
    const queryDelete = `
        DROP TABLE IF EXISTS checkouts
    `

    try {
        // pool.query(queryDelete);
        pool.query(queryText);
        console.log('Table created successfully');
    } catch (error) {
        console.error('Error creating table:', error);
    }
}

createTable()