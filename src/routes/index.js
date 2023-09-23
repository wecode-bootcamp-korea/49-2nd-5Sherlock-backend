const express = require("express");

const { productRouter } = require("./products.router");

const router = express.Router();
router.use("/product", productRouter);

module.exports = {
  router,
};
