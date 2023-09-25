const { AppDataSource } = require("./data-source");

const getReviewsByProductId = async (productId) => {
  const reviews = await AppDataSource.query(`
    SELECT
      reviews.id,
      reviews.content,
      reviews.rating,
      reviews.created_at AS createdAt,
      reviews.updated_at AS updatedAt,
      reviews.author_id AS authorId,
      users.name AS authorName
    FROM 
      reviews
    LEFT JOIN users ON reviews.author_id = users.id
    WHERE reviews.product_id = ${productId}
    ORDER BY reviews.created_at DESC
  ;`);
  return reviews;
};

module.exports = {
  getReviewsByProductId,
};
