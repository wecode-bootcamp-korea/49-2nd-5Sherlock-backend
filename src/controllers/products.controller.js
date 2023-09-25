const { productsService } = require("../services");

const createLike = async (req, res) => {
  try {
    const { productId } = req.params;
    // const { userId } = req;
    const userId = req.get("userId");
    await productsService.createLike(userId, productId);
    res.status(201).json({ message: "likeCreated" });
  } catch (error) {
    console.log(error);
    res.status(error.status).json({ message: error.message });
  }
};

const deleteLike = async (req, res) => {
  try {
    const { productId } = req.params;
    // const { userId } = req;
    const userId = req.get("userId");
    await productsService.deleteLike(userId, productId);
    res.status(204).json({ message: "likeDeleted" });
  } catch (error) {
    console.log(error);
    res.status(error.status).json({ message: error.message });
  }
};

const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await productsService.getReviews(productId);
    res.status(200).json({
      message: "querySuccess",
      data: reviews,
    });
  } catch (error) {
    console.log(error);
    res.status(error.status).json({message: error.message});
  }
};

module.exports = {
  createLike,
  deleteLike,
  getReviews,
};
