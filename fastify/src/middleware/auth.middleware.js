import jwt from 'jsonwebtoken';
const JWT_SECRET = '123';

export const extractUser = async (request, reply) => {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    request.userId = null;
    return;
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    request.userId = decoded.userId;
  } catch (err) {
    request.userId = null;
  }
};


export const requireAuth = async (request, reply) => {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return reply.status(401).send({ status: 401, message: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    request.userId = decoded.userId;
  } catch (err) {
    return reply.status(401).send({ status: 401, message: 'Invalid token' });
  }
};