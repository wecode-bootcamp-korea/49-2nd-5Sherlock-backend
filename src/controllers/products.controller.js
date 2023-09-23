const { productService } = require("../services");

const getProduct = async (req, res) => {
  try {
    let {
      category,
      sort = "rating",
      teasort,
      offset = 0,
      limit = 12,
    } = req.query;
    const userId = req.user_id;
    console.log(userId, category, sort, offset, limit, teasort);
    const productList = await productService.getProductList(
      userId,
      category,
      sort,
      teasort,
      offset,
      limit
    );

    const totalProduct = await productService.getTotalProduct(
      category,
      teasort
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

module.exports = {
  getProduct,
};
