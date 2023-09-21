const { AppDataSource } = require("./data-source");

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
};
