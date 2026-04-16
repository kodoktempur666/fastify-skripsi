import { createOrder, updateOrderToPaid, updateOrderToFailed, getOrderStatus } from '../models/order.model.js';
import { getCartById, updateCartStatus } from '../models/cart.model.js';
import { getCartItemsByCartId } from '../models/cartItem.model.js';
import { insertOrderItem } from '../models/orderItem.model.js';
import { createPaymentMock } from '../models/paymentMock.model.js';
import { reduceStock } from '../models/product.model.js';
import { handleResponse } from '../utils/response.js';

const mockPayment = async (orderId, totalAmount) => {
  const delay = Math.floor(Math.random() * 40) + 10; // 10-50ms
  await new Promise(resolve => setTimeout(resolve, delay));
  const success = true; // or Math.random() > 0.05 for 5% failure
  const mockResponse = {
    status: success ? 'success' : 'failure',
    transaction_id: `mock_txn_${Date.now()}_${orderId}`,
    amount: totalAmount
  };
  await createPaymentMock(orderId, mockResponse, delay);
  return success;
};

export const checkout = async (request, reply) => {
  const { cartId } = request.params;
  const userId = request.userId || null;
  try {
    const cart = await getCartById(cartId);
    if (!cart) return handleResponse(reply, 404, 'Cart not found');
    if (cart.status !== 'active') return handleResponse(reply, 400, 'Cart already checked out');

    const items = await getCartItemsByCartId(cartId);
    if (items.length === 0) return handleResponse(reply, 400, 'Cart is empty');

    let total = 0;
    for (const item of items) {
      total += parseFloat(item.price_at_add) * item.quantity;
    }

    const order = await createOrder(userId, cartId, total);
    const paymentSuccess = await mockPayment(order.id, total);

    if (paymentSuccess) {
      await updateOrderToPaid(order.id);
      await updateCartStatus(cartId, 'checked_out');
      for (const item of items) {
        await insertOrderItem(order.id, item.product_id, item.quantity, item.price_at_add);
        await reduceStock(item.product_id, item.quantity);
      }
      handleResponse(reply, 200, 'Checkout successful', { orderId: order.id, status: 'paid' });
    } else {
      await updateOrderToFailed(order.id);
      handleResponse(reply, 400, 'Payment failed (mock)', { orderId: order.id, status: 'failed' });
    }
  } catch (err) {
    reply.status(500).send({ status: 500, message: err.message });
  }
};

export const getOrder = async (request, reply) => {
  const { orderId } = request.params;
  try {
    const order = await getOrderStatus(orderId);
    if (!order) return handleResponse(reply, 404, 'Order not found');
    handleResponse(reply, 200, 'Order fetched', order);
  } catch (err) {
    reply.status(500).send({ status: 500, message: err.message });
  }
};