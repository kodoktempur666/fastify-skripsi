import pool from '../db/pool.js';

export const createPaymentMock = async (orderId, mockResponse, latencyMs) => {
  const result = await pool.query(
    `INSERT INTO payment_mocks (order_id, mock_response, latency_ms, created_at)
     VALUES ($1, $2, $3, NOW())
     RETURNING id`,
    [orderId, JSON.stringify(mockResponse), latencyMs]
  );
  return result.rows[0];
};