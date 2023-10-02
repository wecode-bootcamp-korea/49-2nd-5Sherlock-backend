const {productsService} = require("../services")

const getProductDetail = async (req, res) => {
    const productId = req.params.product_id;
    const data = await productsService.getProductDetail(productId);
    return res.status(200).json({ data });
}

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

module.exports = {
  getProductDetail,
  createLike,
  deleteLike,
};
