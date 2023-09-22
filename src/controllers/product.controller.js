const { productService } = require("../services");

const getProduct = async (req, res) => {
  try {
    // const { page, sort, category } = req.query;
    // console.log(queryParams);
    // console.log(Object.entries(queryParams));
    const userId = req.user_id;
    const productList = await productService.getProductList(
      userId
      // page,
      // sort,
      // category
    );
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
