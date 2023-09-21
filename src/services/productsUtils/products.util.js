const { productsModel, likesModel } = require("../../models");
const { throwError } = require("../../utils/throwError");

async function checkExistingProductById(productId) {
  const product = await productsModel.getProductById(productId);
  if (!product) {
    throwError(404, "CONTENT_NOT_FOUND");
  }
  return product;
}

async function checkExistingLike(userId, productId) {
  const like = await likesModel.getLikeByIds(userId, productId);
  if (like) {
    throwError(400, "DUPLICATE_LIKE");
  }
  return like;
}

module.exports = {
  checkExistingProductById,
  checkExistingLike,
};
