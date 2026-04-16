import express from 'express';
import { getProducts, getProduct, getCategories } from '../controllers/product.controller.js';

const route = express.Router();

route.get('/products', getProducts);
route.get('/products/:id', getProduct);
route.get('/categories', getCategories);

export default route;