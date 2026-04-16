import express from "express";
import {
  createCartHandler,
  addCartItem,
  updateCartItem,
  getCart,
} from "../controllers/cart.controller.js";
import { authMiddleware, requireAuth } from "../middleware/auth.middleware.js";

const route = express.Router();

route.post("/carts", authMiddleware, createCartHandler);
route.post("/carts/:cartId/items",requireAuth, addCartItem);
route.patch("/carts/:cartId/items/:itemId",requireAuth, updateCartItem);
route.get("/carts/:cartId",requireAuth, getCart);

export default route;
