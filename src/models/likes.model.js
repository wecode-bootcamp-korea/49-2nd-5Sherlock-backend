const { AppDataSource } = require("./data-source");

const createLike = async (userId, productId) => {
  await AppDataSource.query(`
  INSERT INTO likes
    (user_id, product_id)
  VALUES
    ('${userId}', '${productId}')
  ;
  `);
};

const getLikeByIds = async (userId, productId) => {
  const likes = await AppDataSource.query(`
    SELECT
      id
    FROM
      likes
    WHERE
      user_id = "${userId}" AND product_id = ${productId}
    ;
  `);
  return likes[0];
};

module.exports = {
  createLike,
  getLikeByIds,
};
