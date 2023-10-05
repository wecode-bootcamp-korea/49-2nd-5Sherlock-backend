const { cartsService } = require("../services");

const getCart = async (req, res) => {
  const { userId } = req;
  const cart = await cartsService.getCart(userId);
  return res.status(200).json({ message: "querySuccess", data: cart });
};

const addToCart = async (req, res) => {
  const { userId } = req;
  const { productId, quantity } = req.body;
  const result = await cartsService.addToCart(userId, productId, quantity);
  return res.status(201).json({ message: "cartItem"+result });
};

const getCartItemCount = async (req, res) => {
  const { userId } = req;
  const count = await cartsService.getCartItemCount(userId);
  return res.status(200).json({ message: "querySuccess", cartItemCount: count });
};


module.exports = {
  getCart,
  addToCart,
  getCartItemCount,
};
