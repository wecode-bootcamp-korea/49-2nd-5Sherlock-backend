const express = require("express");

const {productsController} = require("../controllers") 

const productsRouter = express.Router();

productsRouter.get("/:product_id", productsController.getProductDetail);

module.exports = {
    productsRouter,
}