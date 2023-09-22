const express = require("express");

const { productsController } = require("../controllers");

const productsRouter = express.Router();

productsRouter.post("/:productId/likes", productsController.createLike);
productsRouter.delete("/:productId/likes", productsController.deleteLike);

module.exports = {
  productsRouter,
};
