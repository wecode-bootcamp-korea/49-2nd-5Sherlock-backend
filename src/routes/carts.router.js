const express = require("express");

const { cartsController } = require("../controllers");

const cartsRouter = express.Router();

cartsRouter.get("/", cartsController.getCart);
cartsRouter.post("/", cartsController.addToCart);

module.exports = {
  cartsRouter,
};
