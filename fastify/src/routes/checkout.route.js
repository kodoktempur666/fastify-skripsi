
import { createCheckoutController, getCheckoutController, editCheckoutController, patchCheckoutController } from "../controllers/checkout.controller.js";

export default async function checkoutRoutes(fastify) {
    fastify.post('/checkout', createCheckoutController);
    fastify.get('/checkout/:id', getCheckoutController);
    fastify.put('/checkout/:id', editCheckoutController);
    fastify.patch('/checkout/:id', patchCheckoutController);
}