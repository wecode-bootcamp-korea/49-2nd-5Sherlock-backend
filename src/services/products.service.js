const { productsModel, builder } = require("../models");

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
  const product = await productsModel.productList(
    userId,
    product_type,
    offset,
    limit,
    categorizingQuery,
    orderingQuery
  );

  product.forEach((item) => {
    item.likeNumber = parseInt(item.likeNumber);
    item.reviewNumber = parseInt(item.reviewNumber);
    item.isNew = item.isNew === "true";
    item.isLike = item.isLike === "true";
    item.rating = parseInt(item.rating);
  });

  return product;
};

const getTotalProduct = async (category, product_type) => {
  const categorizingQuery = await builder.categorizing(category);
  const product = await productsModel.totalProduct(
    categorizingQuery,
    product_type
  );

  return product;
};

const getBestProduct = async (category, sort) => {
  const orderingQuery = await builder.ordering(sort);
  const product = await productsModel.getBestProduct(category, orderingQuery);

  product.forEach((item) => {
    item.reviewNumber = parseInt(item.reviewNumber);
    item.rating = parseInt(item.rating);
  });
};

const getProductDetail = async (productId) => {
  if (!productId) {
    throwError(400, "KEY_ERROR");
  }

  const data = await productsModel.getProductDetail(productId);
  return data;
};

const getSpecialPriceProduct = async () => {
  const [product] = await productsModel.getSpecialPriceProduct();
  product.price = Math.ceil(product.originalPrice * (1 - product.discountRate / 100));
  return product;
};

module.exports = {
  getProductList,
  getTotalProduct,
  getBestProduct,
  getProductDetail,
  getSpecialPriceProduct,
};

