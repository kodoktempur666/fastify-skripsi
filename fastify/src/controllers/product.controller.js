import {
  getProductsWithFilters,
  getProductById,
  getAllCategories
} from '../models/product.model.js';
import { handleResponse } from '../utils/response.js';

export const getProducts = async (request, reply) => {
  const { page = 1, limit = 20, search, category, min_price, max_price, sort } = request.query;
  try {
    const products = await getProductsWithFilters(page, limit, search, category, min_price, max_price, sort);
    handleResponse(reply, 200, 'Products fetched', { products, page: Number(page), limit: Number(limit) });
  } catch (err) {
    reply.status(500).send({ status: 500, message: err.message });
  }
};

export const getProduct = async (request, reply) => {
  const { id } = request.params;
  try {
    const product = await getProductById(id);
    if (!product) return handleResponse(reply, 404, 'Product not found');
    handleResponse(reply, 200, 'Product fetched', product);
  } catch (err) {
    reply.status(500).send({ status: 500, message: err.message });
  }
};

export const getCategories = async (request, reply) => {
  try {
    const categories = await getAllCategories();
    handleResponse(reply, 200, 'Categories fetched', categories);
  } catch (err) {
    reply.status(500).send({ status: 500, message: err.message });
  }
};