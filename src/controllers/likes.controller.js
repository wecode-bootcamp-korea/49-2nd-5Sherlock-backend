const { likesService } = require("../services");

const createLike = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.userId;
    await likesService.createLike(userId, productId);
    res.status(201).json({ message: "likeCreated" });
  } catch (error) {
    console.log(error);
    res.status(error.status).json({ message: error.message });
  }
};

const deleteLike = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.userId;
    await likesService.deleteLike(userId, productId);
    res.status(204).json({ message: "likeDeleted" });
  } catch (error) {
    console.log(error);
    res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  createLike,
  deleteLike,
};
