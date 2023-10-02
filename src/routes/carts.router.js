const express = require("express");

const { cartsController } = require("../controllers");

const cartsRouter = express.Router();

cartsRouter.get("/", cartsController.getCarts);
cartsRouter.post("/", cartsController.addToCarts);

module.exports = {
  cartsRouter,
};
