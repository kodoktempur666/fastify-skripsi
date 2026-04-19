import express from "express";
import { checkout, getOrder } from "../controllers/order.controller.js";


const route = express.Router();

route.post("/carts/:cartId/checkout", checkout);
route.get("/orders/:orderId", getOrder);

export default route;
