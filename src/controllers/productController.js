const { productService } = require("../services");

const getProduct = async (req, res) => {
  try {
    const userId = req.user_id;
    const productList = await productService.getProductList(userId);
    const totalProduct = await productService.getTotalProduct();
    res.status(200).json({
      message: "querySuccess",
      data: productList,
      productCount: totalProduct[0].product_count,
    });
  } catch (error) {
    console.log("error", error);
    res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  getProduct,
};
