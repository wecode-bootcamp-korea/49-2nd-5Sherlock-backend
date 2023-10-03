const express = require("express");

const {
  productsController,
  likesController,
  reviewsController,
} = require("../controllers");

const productsRouter = express.Router();

productsRouter.get("/", productsController.getProduct);

productsRouter.get("/bestProduct", productsController.getBestProduct);

productsRouter.get("/:product_id", productsController.getProductDetail);

productsRouter.post("/:productId/likes", likesController.createLike);
productsRouter.delete("/:productId/likes", likesController.deleteLike);

productsRouter.get("/:productId/reviews", reviewsController.getReviews);

module.exports = {
  productsRouter,
};