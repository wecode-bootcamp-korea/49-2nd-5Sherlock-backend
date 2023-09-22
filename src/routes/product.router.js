const express = require("express");

const { productController } = require("../controllers");

const productRouter = express.Router();

productRouter.get("/", productController.getProduct);
productRouter.get("/:product_id", productController.getProductDetail)

module.exports = { productRouter };
