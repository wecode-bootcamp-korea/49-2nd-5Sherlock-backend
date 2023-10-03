const { cartsService } = require("../services");

const getCart = async (req, res) => {
  //   const { userId } = req;
  const userId = req.get("userId");
  const cart = await cartsService.getCart(userId);
  return res.status(200).json({ message: "querySuccess", data: cart });
};

const addToCart = async (req, res) => {
  //   const { userId } = req;
  const userId = req.get("userId");
  const { productId } = req.body;
  await cartsService.addToCart(userId, productId);
  return res.status(201).json({ message: "cartItemCreated" });
};

module.exports = {
  getCart,
  addToCart,
};
