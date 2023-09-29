const { productsService } = require("../services");

const getProduct = async (req, res) => {
  try {
    let {
      category,
      sort = "rating",
      product_type,
      offset = 0,
      limit = 12,
    } = req.query;
    const userId = req.userId;
    console.log(userId, category, sort, offset, limit, product_type);
    const productList = await productsService.getProductList(
      userId,
      category,
      sort,
      product_type,
      offset,
      limit
    );

    const totalProduct = await productsService.getTotalProduct(
      category,
      product_type
    );

    res.status(200).json({
      message: "querySuccess",
      data: productList,
      productCount: totalProduct,
    });
  } catch (error) {
    console.log("error", error);
    res.status(error.status).json({ message: error.message });
  }
};

const getBestProduct = async (req, res) => {
  try {
    const { category, sort } = req.query;
    const bestProduct = await productsService.getBestProduct(category, sort);
    res.status(200).json({
      message: "Success",
      data: bestProduct,
    });
  } catch (error) {
    console.log("error", error);
    res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  getProduct,
  getBestProduct,
};
