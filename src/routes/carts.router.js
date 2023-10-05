const express = require("express");

const { cartsController } = require("../controllers");

const { validateToken } = require("../middleware/auth");

const cartsRouter = express.Router();

cartsRouter.get("/", validateToken, cartsController.getCart);

cartsRouter.get("/count", validateToken, cartsController.getCartItemCount);

cartsRouter.post("/", validateToken, cartsController.addToCart);

module.exports = {
  cartsRouter,
};
