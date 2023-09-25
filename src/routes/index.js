const express = require("express");

const { productRouter } = require("./products.router");
const { usersRouter } = require("./users.router");

const router = express.Router();
router.use("/products", productRouter);

router.use("/users", usersRouter);

module.exports = {
  router,
};
