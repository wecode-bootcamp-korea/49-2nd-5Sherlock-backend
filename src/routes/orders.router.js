const express = require("express");

const { ordersController } = require("../controllers");
const { validateToken } = require("../middleware/auth");

const ordersRouter = express.Router();
ordersRouter.post("/", validateToken, ordersController.createOrder);

module.exports = {
  ordersRouter,
};
