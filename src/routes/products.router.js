const express = require("express");

const {
  productsController,
  likesController,
  reviewsController,
} = require("../controllers");
const { validateToken } = require("../middleware/auth");

const productsRouter = express.Router();

productsRouter.get("/", productsController.getProduct);

productsRouter.get("/bestProducts", productsController.getBestProduct);

productsRouter.get("/specialPriceProduct", productsController.getSpecialPriceProduct);

productsRouter.get("/:productId", productsController.getProductDetail);

productsRouter.post("/:productId/likes", validateToken, likesController.createLike);
productsRouter.delete("/:productId/likes", validateToken, likesController.deleteLike);

productsRouter.get("/:productId/reviews", reviewsController.getReviews);

module.exports = {
  productsRouter,
};
