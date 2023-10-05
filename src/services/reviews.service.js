const { checkEmptyValues } = require("../utils/checkEmptyValues");
const { checkExistingProductById } = require("./productsUtils/products.util");
const { reviewsModel } = require("../models");

const getReviews = async (productId, queryParams) => {
  checkEmptyValues(productId);
  const product = await checkExistingProductById(productId);
  if (!product) {
    throwError(404, "CONTENT_NOT_FOUND");
  }
  let sumRating = 0;
  const reviews = await reviewsModel.getReviewsByProductId(productId, queryParams);
  reviews.forEach(item => {
    item.authorName = item.authorName.slice(0,2) + "*".repeat(item.authorName.length - 2);
    sumRating += item.rating;
  });

  const count = await reviewsModel.getReviewsCount(productId);
  const averageRating = Math.ceil((sumRating / count) * 10) / 10 ;
  return {reviews, count, averageRating};
};

module.exports = {
  getReviews,
};
