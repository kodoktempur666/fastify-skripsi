import {
  createCheckout,
  editCheckout,
  getCheckout,
  patchCheckout
} from "../models/checkout.models.js";

const handleResponse = (reply, statusCode, data) => {
  reply.code(statusCode).send(data);
};

export const createCheckoutController = async (request, reply) => {
  try {
    const { name, amount, item } = request.body;
    const newCheckout = await createCheckout(name, amount, item);
    return handleResponse(reply, 201, newCheckout);
  } catch (error) {
    return handleResponse(reply, 500, { message: error.message });
  }
};

export const getCheckoutController = async (request, reply) => {
  try {
    const { id } = request.params;

    const getChekouted = await getCheckout(id);
    return handleResponse(reply, 200, getChekouted);
  } catch (error) {
    return handleResponse(reply, 500, { message: error.message });
  }
};

export const editCheckoutController = async (request, reply) => {
  try {
    const { id } = request.params;
    const { name, amount, item } = request.body;
    const updatedCheckout = await editCheckout(id, name, amount, item);
    return handleResponse(reply, 200, updatedCheckout);
  } catch (error) {
    return handleResponse(reply, 500, { message: error.message });
  }
};

export const patchCheckoutController = async (request, reply) => {
    try {
        const { id } = request.params;
        const { name, amount, item } = request.body;
        const patchedCheckout = await patchCheckout(id, name ?? null, amount ?? null, item ?? null);
        return handleResponse(reply, 200, patchedCheckout);
    } catch (error) {
        return handleResponse(reply, 500, { message: error.message });
    }
}
