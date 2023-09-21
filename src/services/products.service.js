const { checkEmptyValues } = require("../utils/checkEmptyValues");
const { checkExistingUserById } = require("./usersUtils/users.util");
const { checkExistingProductById, checkExistingLike } = require("./productsUtils/products.util");


const createLike = async (userId, productId) => {
  checkEmptyValues(userId, productId);
  await checkExistingUserById(userId);
  await checkExistingProductById(productId);
  await checkExistingLike(userId, productId);
  await likesModel.createLike(userId, productId);
};

module.exports = {
  createLike,
};
