const { AppDataSource } = require("./data-source");

const getCartByUserId = async (userId) => {
  const cart = await AppDataSource.query(`
    SELECT
      carts.product_id AS productId,
      carts.quantity,
      products.name,
      products.price AS originalPrice,
      products.discount_rate AS discountRate
    FROM
      carts
    LEFT JOIN products ON products.id = carts.product_id
    WHERE carts.user_id = ${userId}
    ;
  `);
  return cart;
};

const createCartItem = async (userId, productId) => {
  await AppDataSource.query(`
    INSERT INTO carts
      (user_id, product_id, quantity)
    VALUES
      (${userId}, ${productId}, 1)
    ;
  `)
};

module.exports = {
  getCartByUserId,
  createCartItem,
};
