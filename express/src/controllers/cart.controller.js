import { createCart, getCartById, updateCartTimestamp } from '../models/cart.model.js';
import { findCartItem, insertCartItem, updateCartItemQuantity, getCartItemsByCartId } from '../models/cartItem.model.js';
import { getProductPrice } from '../models/product.model.js';

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({ status, message, data });
};

export const createCartHandler = async (req, res, next) => {
  const userId = req.userId || null;
  const sessionToken = req.headers['x-session-token'] || null;
  try {
    const cart = await createCart(userId, sessionToken);
    handleResponse(res, 201, 'Cart created', { cartId: cart.id });
  } catch (err) {
    next(err);
  }
};

export const addCartItem = async (req, res, next) => {
  const { cartId } = req.params;
  const { productId, quantity } = req.body;
  try {
    const price = await getProductPrice(productId);
    if (!price) return handleResponse(res, 404, 'Product not found');
    const existing = await findCartItem(cartId, productId);
    if (existing) {
      await updateCartItemQuantity(existing.id, existing.quantity + quantity);
    } else {
      await insertCartItem(cartId, productId, quantity, price);
    }
    await updateCartTimestamp(cartId);
    handleResponse(res, 200, 'Item added to cart');
  } catch (err) {
    next(err);
  }
};

export const updateCartItem = async (req, res, next) => {
  const { cartId, itemId } = req.params;
  const { quantity } = req.body;
  try {
    await updateCartItemQuantity(itemId, quantity);
    await updateCartTimestamp(cartId);
    handleResponse(res, 200, 'Cart item updated');
  } catch (err) {
    next(err);
  }
};

export const getCart = async (req, res, next) => {
  const { cartId } = req.params;
  try {
    const cart = await getCartById(cartId);
    if (!cart) return handleResponse(res, 404, 'Cart not found');
    const items = await getCartItemsByCartId(cartId);
    handleResponse(res, 200, 'Cart fetched', { cart, items });
  } catch (err) {
    next(err);
  }
};