const express = require("express");
const { validateToken } = require("../middleware/auth");

const {
  productsController,
  likesController,
  reviewsController,
} = require("../controllers");

const productsRouter = express.Router();

productsRouter.get("/", productsController.getProduct);

productsRouter.get("/bestProduct", productsController.getBestProduct);

productsRouter.get("/:product_id", productsController.getProductDetail);

productsRouter.post("/:productId/likes", validateToken, likesController.createLike);

productsRouter.delete("/:productId/likes", validateToken, likesController.deleteLike);

productsRouter.get("/:productId/reviews", reviewsController.getReviews);

module.exports = {
  productsRouter,
};