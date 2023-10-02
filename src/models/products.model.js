const { AppDataSource } = require("./data-source");

const getProductDetail = async (productId) => {
  const data = await AppDataSource.query(`SELECT * FROM products WHERE id=${productId};`);
  return data;
};

async function getProductById(productId) {
  const products = await AppDataSource.query(`
    SELECT
      id
    FROM
      products
    WHERE
      id = "${productId}"
    ;
  `);
  return products[0];
}

module.exports = {
  getProductById,
  getProductDetail,
};