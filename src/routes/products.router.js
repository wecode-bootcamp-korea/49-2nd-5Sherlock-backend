const express = require("express");

const { productController } = require("../controllers");

const productRouter = express.Router();

productRouter.get("/", productController.getProduct);
productRouter.get("/bestProduct", productController.getBestProduct);

module.exports = { productRouter };
