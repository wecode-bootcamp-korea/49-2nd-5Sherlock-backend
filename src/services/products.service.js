const { checkEmptyValues } = require("../utils/checkEmptyValues");
const { checkExistingUserById } = require("./usersUtils/users.util");
const { checkExistingProductById, checkExistingLike } = require("./productsUtils/products.util");
const {likesModel, productsModel} = require("../models");

const getProductDetail = async (productId) => {
    if (!productId) {
        throwError(400, "KEY_ERROR");
    }

    const data = await productsModel.getProductDetail(productId);
    return data;
}

const createLike = async (userId, productId) => {
  checkEmptyValues(userId, productId);
  const user = await checkExistingUserById(userId);
  if (!user) {
    throwError(404, "USER_NOT_FOUND");
  }
  const product = await checkExistingProductById(productId);
  if (!product) {
    throwError(404, "CONTENT_NOT_FOUND");
  }
  const like = await checkExistingLike(userId, productId);
  if (like) {
    throwError(400, "DUPLICATE_LIKE");
  }
  await likesModel.createLike(userId, productId);
};

const deleteLike = async (userId, productId) => {
  checkEmptyValues(userId, productId);
  const user = await checkExistingUserById(userId);
  if (!user) {
    throwError(404, "USER_NOT_FOUND");
  }
  const product = await checkExistingProductById(productId);
  if (!product) {
    throwError(404, "CONTENT_NOT_FOUND");
  }
  const like = await checkExistingLike(userId, productId);
  if (!like) {
    throwError(404, "CONTENT_NOT_FOUND");
  }
  await likesModel.deleteLike(userId, productId);
};

module.exports = {
  getProductDetail,
  createLike,
  deleteLike,
};
