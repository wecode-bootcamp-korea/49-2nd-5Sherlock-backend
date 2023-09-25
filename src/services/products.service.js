const { productModel, builder } = require("../models");

const getProductList = async (
  userId,
  category,
  sort,
  product_type,
  offset,
  limit
) => {
  const orderingQuery = await builder.ordering(sort);

  const categorizingQuery = await builder.categorizing(category);
  const product = await productModel.productList(
    userId,
    product_type,
    offset,
    limit,
    categorizingQuery,
    orderingQuery
  );

  return product;
};

const getTotalProduct = async (category, product_type) => {
  const categorizingQuery = await builder.categorizing(category);
  const product = await productModel.totalProduct(
    categorizingQuery,
    product_type
  );

  return product;
};

module.exports = {
  getProductList,
  getTotalProduct,
};
