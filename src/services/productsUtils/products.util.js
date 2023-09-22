const { productsModel, likesModel } = require("../../models");
const { throwError } = require("../../utils/throwError");

async function checkExistingProductById(productId) {
  const product = await productsModel.getProductById(productId);

  return product;
}

async function checkExistingLike(userId, productId) {
  const like = await likesModel.getLikeByIds(userId, productId);
  return like;
}

module.exports = {
  checkExistingProductById,
  checkExistingLike,
};
