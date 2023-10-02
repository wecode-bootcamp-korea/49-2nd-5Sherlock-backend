const express = require("express");

const { productsController } = require("../controllers") 

const productsRouter = express.Router();

productsRouter.get("/:product_id", productsController.getProductDetail);
productsRouter.post("/:productId/likes", productsController.createLike);
productsRouter.delete("/:productId/likes", productsController.deleteLike);

module.exports = {
  productsRouter,
};

