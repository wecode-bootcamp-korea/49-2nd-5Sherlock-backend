const { AppDataSource } = require("./data-source");

const productList = async (
  userId,
  product_type,
  offset,
  limit,
  categorizingQuery,
  orderingQuery
) => {
  console.log(categorizingQuery);
  console.log(orderingQuery);
  console.log(product_type);
  let input = 0;
  if (userId) {
    input = userId;
  }
  let query = `SELECT 
    products.id AS id,
    products.name AS name,
    categories.name AS category,
    (
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                "id", product_images.order,
                "url", product_images.url
            )
        )
        FROM product_images
        WHERE product_images.product_id = products.id
    ) AS productImg,
    products.price - (products.price * (products.discount_rate / 100)) AS price,
    products.price AS originalPrice,
    products.discount_rate AS discountRate,
    (
      SELECT COUNT(likes.user_id)
      FROM likes
      WHERE likes.product_id = products.id
  ) AS likeNumber,
    (
        SELECT COUNT(reviews.product_id)
        FROM reviews
        WHERE reviews.product_id = products.id
    ) AS reviewNumber,
    IF(DATEDIFF(NOW(), products.created_at) < 30, "true", "false") AS isNew,
    IF(likes.user_id = ${input}, "true", "false") AS isLike,
    products.quantity AS quantity,
    IFNULL((
      SELECT IFNULL(SUM(reviews.rating), 0) / IFNULL(COUNT(reviews.product_id), 1)
      FROM reviews
      WHERE reviews.product_id = products.id
  ), 0) AS rating
    FROM products
    LEFT JOIN categories ON products.category_id = categories.id
    LEFT JOIN product_images ON product_images.product_id = products.id
    LEFT JOIN likes ON products.id = likes.product_id AND likes.user_id = ${input}
    LEFT JOIN product_types ON products.product_type_id = product_types.id`;

  query += categorizingQuery;
  if (product_type) {
    const teasorting = product_type.split(",").map((cat) => parseInt(cat)); // 쉼표로 구분된 카테고리를 배열로 분할
    query += ` AND products.product_type_id IN (${teasorting.join(",")})`;
  }

  if (!product_type) {
    query += ` AND (products.product_type_id IN (1, 2, 3, 4) OR products.product_type_id IS NULL OR products.product_type_id = '')`;
  }

  query += `
    GROUP BY products.id
    ${orderingQuery}
    LIMIT ${limit} OFFSET ${offset}`;

  const product = await AppDataSource.query(query);

  return product;
};

const totalProduct = async (categorizingQuery, product_type) => {
  let query = `SELECT products.id FROM products
    LEFT JOIN categories ON products.category_id = categories.id
    LEFT JOIN product_types ON products.product_type_id = product_types.id`;

  query += categorizingQuery;
  if (product_type) {
    const teasorting = product_type.split(",").map((cat) => parseInt(cat));
    query += ` AND products.product_type_id IN (${teasorting.join(",")})`;
  }

  if (!product_type) {
    query += ` AND (products.product_type_id IN (1, 2, 3, 4) OR products.product_type_id IS NULL OR products.product_type_id = '')`;
  }
  const product = await AppDataSource.query(query);
  return product.length;
};

const getBestProduct = async (category, orderingQuery) => {
  let query = `SELECT
    products.id AS id,
    products.name AS name,
    (
      SELECT JSON_ARRAYAGG(
          JSON_OBJECT(
              "id", product_images.order,
              "url", product_images.url
          )
      )
      FROM product_images
      WHERE product_images.product_id = products.id
    ) AS productImg,
    (
      SELECT COUNT(reviews.product_id)
      FROM reviews
      WHERE reviews.product_id = products.id
  ) AS reviewNumber,
    products.price - (products.price * (products.discount_rate / 100)) AS price,
    products.price AS originalPrice,
    products.discount_rate AS discountRate,
    IFNULL(
      IFNULL(SUM(reviews.rating), 0) / IFNULL(COUNT(reviews.product_id), 1),
      0
    ) AS rating,
    products.quantity AS quantity
    FROM products
    LEFT JOIN product_images ON product_images.product_id = products.id
    LEFT JOIN reviews ON reviews.product_id=products.id`;

  if (!isNaN(parseInt(category))) {
    query += `
    WHERE quantity > 0
    GROUP BY products.id
    ORDER BY reviewNumber DESC, products.id ASC
    limit 12 offset 0;`;
  } else {
    query += `
    WHERE WEEK(reviews.created_at) = WEEK(CURDATE()) AND quantity > 0
    GROUP BY products.id
    ${orderingQuery}
    limit 12 offset 0;`;
  }
  const product = await AppDataSource.query(query);
  return product;
};

const getProductDetail = async (productId) => {
  const data = await AppDataSource.query(
    `SELECT * FROM products WHERE id=${productId};`
  );
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

const getSpecialPriceProduct = async () => {
  const product = await AppDataSource.query(`
    SELECT 
      products.name,
      products.price AS originalPrice,
      products.discount_rate AS discountRate,
      images.url
    FROM
      products
    LEFT JOIN (
      SELECT
        *
      FROM
        product_images
      WHERE
        product_images.order = 1
    ) images ON images.product_id = products.id
    WHERE products.quantity > 0
    ORDER BY products.discount_rate DESC, quantity DESC
    LIMIT 1
    ;
  `);
  return product;
}

module.exports = {
  productList,
  totalProduct,
  getBestProduct,
  getProductById,
  getProductDetail,
  getSpecialPriceProduct,
};

