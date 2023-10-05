const { cartsModel, usersModel, productsModel } = require("../models");

const { checkEmptyValues } = require("../utils/checkEmptyValues");
const { throwError } = require("../utils/throwError");

const getCart = async (userId) => {
  checkEmptyValues(userId);
  const user = usersModel.getUserById(userId);
  if (!user) throwError(404, "USER_NOT_FOUND");
  const cart = await cartsModel.getCartByUserId(userId);

  cart.forEach((item) => {
    item.price = Math.ceil(item.originalPrice * (1 - item.discountRate / 100));
    item.itemTotal = item.price * item.quantity;
  });

  return cart;
};

const addToCart = async (userId, productId, quantity) => {
  checkEmptyValues(userId, productId, quantity);

  const user = await usersModel.getUserById(userId);
  if (!user) throwError(404, "USER_NOT_FOUND");

  const product = await productsModel.getProductById(productId);
  if (!product) throwError(404, "CONTENT_NOT_FOUND");

  const cartItem = await cartsModel.checkDuplicateCartItem(userId, productId);
  if (cartItem) {
    await cartsModel.updateCartItem(cartItem.id, cartItem.quantity + quantity);
    return "Updated";
  } else {
    await cartsModel.createCartItem(userId, productId, quantity);
    return "Created";
  }
};

const getCartItemCount = async (userId) => {
  checkEmptyValues(userId);
  const user = usersModel.getUserById(userId);
  if (!user) throwError(404, "USER_NOT_FOUND");
  const count = await cartsModel.getCartItemCountByUserId(userId);

  return count;
};

module.exports = {
  getCart,
  addToCart,
  getCartItemCount,
};
