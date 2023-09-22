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
};

const getTotalProduct = async (req, res) => {
  const product = await productModel.totalProduct(req, res);

  return product;
};

const getProductDetail = async (productId) => {
  const data = await productModel.getProductDetail(productId)
  return data
}

module.exports = {
  getProductList,
  getTotalProduct,
  getProductDetail
};
