const { AppDataSource } = require("./data-source");

const getReviewsByProductId = async (productId, queryParams) => {
  const reviews = await AppDataSource.query(`
    SELECT
      reviews.id,
      reviews.content,
      reviews.rating,
      review_images.url,
      reviews.created_at AS createdAt,
      reviews.updated_at AS updatedAt,
      reviews.author_id AS authorId,
      users.name AS authorName
    FROM 
      reviews
    LEFT JOIN users ON reviews.author_id = users.id
    LEFT JOIN review_images ON reviews.id = review_images.review_id
    WHERE reviews.product_id = ${productId}
    ORDER BY reviews.created_at DESC
    ${queryParams.limit && queryParams.offset ? `LIMIT ${limit} OFFSET ${offset}` : ""}
  ;`);
  return reviews;
};

const getReviewsCount = async (productId) => {
  const [{count}] = await AppDataSource.query(`
    SELECT
      COUNT(*) AS count
    FROM reviews
    WHERE reviews.product_id = ${productId};
  ;`);
  return count;
}

module.exports = {
  getReviewsByProductId,
  getReviewsCount,
};
