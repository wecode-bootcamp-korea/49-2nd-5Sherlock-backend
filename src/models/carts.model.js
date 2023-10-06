const { AppDataSource } = require("./data-source");

const getCartByUserId = async (userId) => {
  const cart = await AppDataSource.query(`
    SELECT
      carts.product_id AS productId,
      carts.quantity,
      products.name,
      products.price AS originalPrice,
      products.discount_rate AS discountRate,
      images.url AS url
    FROM
      carts
    LEFT JOIN products ON products.id = carts.product_id
    LEFT JOIN (
      SELECT 
        product_images.product_id,
        product_images.url 
      FROM product_images
      WHERE product_images.order = 1
    ) images ON images.product_id = products.id
    WHERE carts.user_id = ${userId}
    ;
  `);
  return cart;
};

const createCartItem = async (userId, productId, quantity) => {
  await AppDataSource.query(`
    INSERT INTO carts
      (user_id, product_id, quantity)
    VALUES
      (${userId}, ${productId}, ${quantity})
    ;
  `)
};

const getCartItemCountByUserId = async (userId) => {
  const [{count}] = await AppDataSource.query(`
    SELECT
      COUNT(*) AS count
    FROM carts
    WHERE carts.user_id = ${userId}
    ;
  `);
  return count;
};

const checkDuplicateCartItem = async (userId, productId) => {
  const [cartItem] = await AppDataSource.query(`
  SELECT
    id,
    user_id,
    product_id,
    quantity
  FROM carts
  WHERE user_id=${userId} AND product_id=${productId}
  ;
  `)
  return cartItem;
};

const updateCartItem = async (id, updatedQuantity) => {
  await AppDataSource.query(`
    UPDATE carts
    SET quantity=${updatedQuantity}
    WHERE id=${id}
  ;
  `)
};

module.exports = {
  getCartByUserId,
  createCartItem,
  getCartItemCountByUserId,
  checkDuplicateCartItem,
  updateCartItem,
};
