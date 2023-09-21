const { productsService } = require("../services");

const createLike = async (req, res) => {
  try {
    const { productId } = req.params;
    // const { userId } = req;
    const userId = req.get("userId");
    console.log(productId, userId);
    await productsService.createLike(userId, productId);

    res.status(201).json({ message: "likeCreated" });
  } catch (error) {}
};

module.exports = {
  createLike,
};

