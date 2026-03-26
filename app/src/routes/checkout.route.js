
import { createCheckoutController, getCheckoutController, editCheckoutController } from "../controllers/checkout.controller.js";

export default async function checkoutRoutes(fastify) {
    fastify.post('/checkout', createCheckoutController);
    fastify.get('/checkout', getCheckoutController);
    fastify.put('/checkout', editCheckoutController);
}