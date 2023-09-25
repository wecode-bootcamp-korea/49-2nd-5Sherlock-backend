const { checkEmptyValues } = require("../utils/checkEmptyValues");
const { checkExistingProductById } = require("./productsUtils/products.util");
const { reviewsModel } = require("../models");

const getReviews = async (productId) => {
  checkEmptyValues(productId);
  const product = await checkExistingProductById(productId);
  if (!product) {
    throwError(404, "CONTENT_NOT_FOUND");
  }
  const reviews = await reviewsModel.getReviewsByProductId(productId);
  return reviews;
};

module.exports = {
  getReviews,
};
