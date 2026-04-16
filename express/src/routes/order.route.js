import express from "express";
import { checkout, getOrder } from "../controllers/order.controller.js";
import { authMiddleware, requireAuth } from "../middleware/auth.middleware.js";


const route = express.Router();

route.post("/carts/:cartId/checkout", authMiddleware, checkout);
route.get("/orders/:orderId",requireAuth, getOrder);

export default route;
