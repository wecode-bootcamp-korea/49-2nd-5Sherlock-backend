const { cartsService } = require("../services");

const getCart = async (req, res) => {
  const { userId } = req;
  const cart = await cartsService.getCart(userId);
  return res.status(200).json({ message: "querySuccess", data: cart });
};

const addToCart = async (req, res) => {
  const { userId } = req;
  const { productId } = req.body;
  await cartsService.addToCart(userId, productId);
  return res.status(201).json({ message: "cartItemCreated" });
};

const getCartItemCount = async (req, res) => {
  const { userId } = req;
  const cart = await cartsService.getCart(userId);
  return res.status(200).json({ message: "querySuccess", cartItemCount: cart.length });
};


module.exports = {
  getCart,
  addToCart,
  getCartItemCount,
};
