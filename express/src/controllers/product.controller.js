import {
  getProductsWithFilters,
  getProductById,
  getAllCategories
} from '../models/product.model.js';

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({ status, message, data });
};

export const getProducts = async (req, res, next) => {
  const { page = 1, limit = 20, search, category, min_price, max_price, sort } = req.query;
  try {
    const products = await getProductsWithFilters(page, limit, search, category, min_price, max_price, sort);
    handleResponse(res, 200, 'Products fetched', { products, page, limit });
  } catch (err) {
    next(err);
  }
};

export const getProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await getProductById(id);
    if (!product) return handleResponse(res, 404, 'Product not found');
    handleResponse(res, 200, 'Product fetched', product);
  } catch (err) {
    next(err);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const categories = await getAllCategories();
    handleResponse(res, 200, 'Categories fetched', categories);
  } catch (err) {
    next(err);
  }
};