const { AppDataSource } = require("./data-source");

const getCartByUserId = async (userId) => {
  const cart = await AppDataSource.query(`
    SELECT
      carts.product_id,
      carts.quantity,
      products.name,
      products.price,
      products.discount_rate
    FROM
      carts
    LEFT JOIN products.id ON carts.product_id
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
