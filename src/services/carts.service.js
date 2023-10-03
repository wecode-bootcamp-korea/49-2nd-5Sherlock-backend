const { cartsModel } = require("../models");
const { getProductById } = require("../models/products.model");
const { getUserById } = require("../models/users.model");
const { checkEmptyValues } = require("../utils/checkEmptyValues");
const { throwError } = require("../utils/throwError");

const getCart = async (userId) => {
  checkEmptyValues(userId);
  const user = getUserById(userId);
  if (!user) throwError(404, "USER_NOT_FOUND");
  const cart = await cartsModel.getCartByUserId(userId);

  cart.forEach((item) => {
    item.price = Math.ceil(item.originalPrice * (1 - item.discountRate / 100));
    item.itemTotal = item.price * item.quantity;
  });

  return cart;
};

const addToCart = async (userId, productId) => {
  checkEmptyValues(userId, productId);

  const user = getUserById(userId);
  if (!user) throwError(404, "USER_NOT_FOUND");

  const product = getProductById(productId);
  if (!product) throwError(404, "CONTENT_NOT_FOUND");

  await cartsModel.createCartItem(userId, productId);
};

module.exports = {
  getCart,
  addToCart,
};