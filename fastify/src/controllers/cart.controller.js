import { createCart, getCartById, updateCartTimestamp } from '../models/cart.model.js';
import { findCartItem, insertCartItem, updateCartItemQuantity, getCartItemsByCartId } from '../models/cartItem.model.js';
import { getProductPrice } from '../models/product.model.js';
import { handleResponse } from '../utils/response.js';

export const createCartHandler = async (request, reply) => {
  const userId = request.userId || null;
  const sessionToken = request.headers['x-session-token'] || null;
  try {
    const cart = await createCart(userId, sessionToken);
    handleResponse(reply, 201, 'Cart created', { cartId: cart.id });
  } catch (err) {
    reply.status(500).send({ status: 500, message: err.message });
  }
};

export const addCartItem = async (request, reply) => {
  const { cartId } = request.params;
  const { productId, quantity } = request.body;
  try {
    const price = await getProductPrice(productId);
    if (!price) return handleResponse(reply, 404, 'Product not found');
    const existing = await findCartItem(cartId, productId);
    if (existing) {
      await updateCartItemQuantity(existing.id, existing.quantity + quantity);
    } else {
      await insertCartItem(cartId, productId, quantity, price);
    }
    await updateCartTimestamp(cartId);
    handleResponse(reply, 200, 'Item added to cart');
  } catch (err) {
    reply.status(500).send({ status: 500, message: err.message });
  }
};

export const updateCartItem = async (request, reply) => {
  const { cartId, itemId } = request.params;
  const { quantity } = request.body;
  try {
    await updateCartItemQuantity(itemId, quantity);
    await updateCartTimestamp(cartId);
    handleResponse(reply, 200, 'Cart item updated');
  } catch (err) {
    reply.status(500).send({ status: 500, message: err.message });
  }
};

export const getCart = async (request, reply) => {
  const { cartId } = request.params;
  try {
    const cart = await getCartById(cartId);
    if (!cart) return handleResponse(reply, 404, 'Cart not found');
    const items = await getCartItemsByCartId(cartId);
    handleResponse(reply, 200, 'Cart fetched', { cart, items });
  } catch (err) {
    reply.status(500).send({ status: 500, message: err.message });
  }
};