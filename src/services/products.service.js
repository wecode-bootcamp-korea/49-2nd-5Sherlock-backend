const { productModel, builder } = require("../models");

const getProductList = async (
  userId,
  category,
  sort,
  teasort,
  offset,
  limit
) => {
  const orderingQuery = await builder.ordering(sort);

  const categorizingQuery = await builder.categorizing(category);
  const product = await productModel.productList(
    userId,
    teasort,
    offset,
    limit,
    categorizingQuery,
    orderingQuery
  );

  return product;
};

const getTotalProduct = async (category, teasort) => {
  const categorizingQuery = await builder.categorizing(category);
  const product = await productModel.totalProduct(categorizingQuery, teasort);

  return product;
};

module.exports = {
  getProductList,
  getTotalProduct,
};
