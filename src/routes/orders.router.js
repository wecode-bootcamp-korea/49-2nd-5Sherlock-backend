const express = require("express");

const { ordersController } = require("../controllers");

const ordersRouter = express.Router();
ordersRouter.post("/", ordersController.createOrder);

module.exports = {
  ordersRouter,
};
