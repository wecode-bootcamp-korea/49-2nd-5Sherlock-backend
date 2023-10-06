const { cartsService } = require("../services");

const getCart = async (req, res) => {
  try {
    const { userId } = req;
    const cart = await cartsService.getCart(userId);
    return res.status(200).json({ message: "querySuccess", data: cart });
  } catch (error) {
    console.log(error);
    res.status(error.status).json({ message: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const { userId } = req;
    const { productId, quantity } = req.body;
    const result = await cartsService.addToCart(userId, productId, quantity);
    return res.status(201).json({ message: "cartItem" + result });
  } catch (error) {
    console.log(error);
    res.status(error.status).json({ message: error.message });
  }
};

const getCartItemCount = async (req, res) => {
  try {
    const { userId } = req;
    const count = await cartsService.getCartItemCount(userId);
    return res
      .status(200)
      .json({ message: "querySuccess", cartItemCount: count });
  } catch (error) {
    console.log(error);
    res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  getCartItemCount,
};
