const { checkEmptyValues } = require("../utils/checkEmptyValues");
const { checkExistingProductById } = require("./productsUtils/products.util");
const { reviewsModel } = require("../models");

const getReviews = async (productId, queryParams) => {
  checkEmptyValues(productId);
  const product = await checkExistingProductById(productId);
  if (!product) {
    throwError(404, "CONTENT_NOT_FOUND");
  }
  const reviews = await reviewsModel.getReviewsByProductId(productId, queryParams);
  reviews.forEach(item => {
    item.authorName = item.authorName.slice(0,2) + "*".repeat(item.authorName.length - 2);
  });

  const count = await reviewsModel.getReviewsCount(productId);

  return {reviews, count};
};

module.exports = {
  getReviews,
};
