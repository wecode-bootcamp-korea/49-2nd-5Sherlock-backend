const { productsModel } = require("../../models");

async function checkExistingProductById(productId) {
  const product = await productsModel.getProductById(productId);
  return product;
}

module.exports = {
  checkExistingProductById,
};
