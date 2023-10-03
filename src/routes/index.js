const express = require("express");

const { productsRouter } = require("./products.router");
const { usersRouter } = require("./users.router");
const { ordersRouter } = require("./orders.router");

const router = express.Router();

router.use("/products", productsRouter);
router.use("/users", usersRouter);
router.use("/orders", ordersRouter);

module.exports = {
  router,
};
