const express = require("express");

const { cartsController } = require("../controllers");

const cartsRouter = express.Router();

const { validateToken } = require("../middleware/auth");

cartsRouter.get("/", validateToken, cartsController.getCart);

cartsRouter.get("/count", validateToken, cartsController.getCartItemCount);

cartsRouter.post("/", validateToken, cartsController.addToCart);

module.exports = {
  cartsRouter,
};
