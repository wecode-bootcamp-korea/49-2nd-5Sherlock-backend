const express = require("express");

const { cartsController } = require("../controllers");

const cartsRouter = express.Router();

cartsRouter.get("/", cartsController.getCart);
cartsRouter.get("/count", cartsController.getCartItemCount);
cartsRouter.post("/", cartsController.addToCart);

module.exports = {
  cartsRouter,
};
