const { productDao } = require("../models");

const getProductList = async (userId) => {
  const product = await productDao.productList(userId);

  return product;
};

const getTotalProduct = async (req, res) => {
  const product = await productDao.totalProduct(req, res);

  return product;
};

module.exports = {
  getProductList,
  getTotalProduct,
};
