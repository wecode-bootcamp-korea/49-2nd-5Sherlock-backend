const express = require("express");

const { productRouter } = require("./product.router");

const router = express.Router();
router.use("/product", productRouter);

module.exports = {
  router,
};
