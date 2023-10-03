
const { productModel } = require("../models");

const getProductList = async (userId) => {
  // if(page==내림차순){ , page, sort, category

  // }

  // if(category){

  // }

  // if(sort){

  // }

  const product = await productModel.productList(userId);

  return product;
}

const getProductDetail = async (productId) => {
    if (!productId) {
        throwError(400, "KEY_ERROR");
    }

    const data = await productsModel.getProductDetail(productId);
    return data;
}

const getTotalProduct = async (req, res) => {
  const product = await productModel.totalProduct(req, res);

  return product;
};

module.exports = {
  getProductList,
  getTotalProduct,
  getProductDetail,
};
