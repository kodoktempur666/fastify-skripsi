import { createCheckout, editCheckout, getCheckout } from "../models/checkout.models.js";

const handleResponse = (reply, statusCode, data) => {
    reply.code(statusCode).send(data);
}

export const createCheckoutController = async (request, reply) => {
    try {
        const { name, amount, item } = request.body;
        const newCheckout = await createCheckout(name, amount, item);
        return handleResponse(reply, 201, newCheckout);
    } catch (error) {
        return handleResponse(reply, 500, { message: error.message });
    }
}

export const getCheckoutController = async (request, reply) => {
    try {
        const getChekcout = await getCheckout();
        return handleResponse(reply, 200, getChekcout);
    } catch (error) {
        return handleResponse(reply, 500, { message: error.message });
    }
}

export const editCheckoutController = async (request, reply) => {
    try {
        const { name, amount, item } = request.body;
        const updatedCheckout = await editCheckout(name, amount, item);
        return handleResponse(reply, 200, updatedCheckout);
    } catch (error) {
        return handleResponse(reply, 500, { message: error.message });
    }
}